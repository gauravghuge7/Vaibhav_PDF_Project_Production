

// Make sure to include these imports:
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import path from "path";
import fs from "fs";
import { ImageAnnotatorClient } from '@google-cloud/vision';

import OpenAI from "openai";

const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      timeout: 60000,
});

const fileManager = new GoogleAIFileManager(process.env.GOOGLE_FILE_MANAGER as string);
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI as string);

const visionClient = new ImageAnnotatorClient({
      keyFilename: 'path-to-your-google-cloud-keyfile.json', // Add your path to the Google Cloud key file
});

export const config = {
  api: {
    bodyParser: false,
  },
};



export default async function handler(req : NextApiRequest, res : NextApiResponse ) {
      
      console.log(" Route is Running");

      /*** check the post is not a get request ***/
      if(req.method !==  "POST") {
            return res 
            .status(400)
            .json({
                  message : "method must be post "
            })
            
      }

      /*** parse the form data ***/
      const form = new IncomingForm({
            keepExtensions: true, // Ensure extensions are kept
            uploadDir: path.join(process.cwd(), "temp"), // Temporary upload directory
      });
        
      // Ensure the temp directory exists
      const tempDir = path.join(process.cwd(), "temp");

      if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
      }

      console.log("Temp directory:", tempDir);


      try {
      
            form.parse(req, async (err, fields, files) => {

                  if (err) {
                    console.error("Error parsing form:", err);
                    return res.status(500).send("Error processing file during form parsing.");
                  }
            
                  const file = files.imageFile?.[0];  // Assuming the input field name is "imageFile"

                  console.log("File => ", file);

                  if (!file) {
                        return res.status(400).send("No file uploaded.");
                  }

                  const uploadsDir = path.join(process.cwd(), "uploads");

                  // Ensure the uploads directory exists
                  if (!fs.existsSync(uploadsDir)) {
                    fs.mkdirSync(uploadsDir, { recursive: true });
                  }
            
                  console.log("Uploads directory:", uploadsDir);

                  // Target path for saving the file
                  const targetPath = path.join(uploadsDir, file.originalFilename as string);
            
                  // Move the file to the target directory
                  fs.rename(file.filepath, targetPath, async (renameErr) => {

                        if (renameErr) {
                        console.error("Error moving file:", renameErr);
                        return res.status(500).send("Error saving file.");
                        }
            
                        console.log("File successfully saved to:", targetPath);
                  
                        // Upload to Google AI
                        try {

                              const uploadResult = await fileManager.uploadFile(targetPath, {
                                    mimeType: file.mimetype as string,
                                    displayName: file.originalFilename as string,
                              });
                        
                              
                              console.log("Insights result => ", uploadResult);




                                          
                              const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

                              const result = await model.generateContent([
                                    "give me insights in text format from the image to generate a piping and instrument diagram give easy to generate a diagram",
                                    {
                                          fileData: {
                                                fileUri: uploadResult.file.uri,
                                                mimeType: uploadResult.file.mimeType,
                                          },
                                    },
                              ]);

                              
                              console.log("Result => ", result);

                              
                              const text = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text as string || '';

                              const response = await openai.images.generate({
                                    model: "dall-e-3",
                                    prompt: `${text}     this is the above text generate a piping and instrument diagram like canvas and it simple image with white background black canvas`,
                                    n: 1,
                                    size: "1024x1024",
                              });

                              console.log("Open AI response:", response);



                              return res.status(200).json({
                                    success: true,
                                    message: "File uploaded and saved successfully.",
                                    response: response,
                                    insights: result,
                                    text: text
                              });
                              
                        }


                        catch (uploadError) {
                              console.error("Error uploading file to Google AI:", uploadError);
                              return res.status(500).send("Error uploading file to Google AI.");
                        }


                  });

                });
      
                  
     

            return res;
      } 
      catch (error) {
            console.error(error);
            res.status(500).send("Error generating insights");
            
      }


}