

// Make sure to include these imports:
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import path from "path";
import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
});

const fileManager = new GoogleAIFileManager(process.env.GOOGLE_FILE_MANAGER as string);
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI as string);


export const config = {
  api: {
    bodyParser: false,
  },
};



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
      console.log("Route is Running");
    
      if (req.method !== "POST") {
        return res.status(400).json({ message: "Method must be POST" });
      }
    
      try {
        /*** Parse form data (wrapped in a promise) ***/
        const { fields, files } = await new Promise<{ fields: any; files: any }>((resolve, reject) => {
          const form = new IncomingForm({
            keepExtensions: true,
            uploadDir: "/temp", // Use /tmp for serverless storage
          });
    
          form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            else resolve({ fields, files });
          });
        });
    
        if (!files.imageFile?.[0]) {
          return res.status(400).json({ message: "No file uploaded." });
        }
    
        const file = files.imageFile[0];
        const tempPath = `/temp/${file.originalFilename}`;
    
        /*** Move file to /tmp/ ***/
        await fs.promises.rename(file.filepath, tempPath);
    
        console.log("File saved at:", tempPath);
    
        /*** Upload to Google AI (Promise-based) ***/
        const uploadResult = await fileManager.uploadFile(tempPath, {
          mimeType: file.mimetype as string,
          displayName: file.originalFilename as string,
        });
    
        console.log("File uploaded:", uploadResult);
    
        /*** Generate insights using Gemini ***/
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
        const result = await model.generateContent([
          "Give me insights in text format from the image to generate a piping and instrument diagram.",
          {
            fileData: {
              fileUri: uploadResult.file.uri,
              mimeType: uploadResult.file.mimeType,
            },
          },
        ]);
    
        console.log("Insights result:", result);
    
        const text =
          result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
        /*** Generate image using OpenAI ***/
        const response = await openai.images.generate({
          model: "dall-e-3",
          prompt: `${text} - Generate a simple piping and instrument diagram on a white background with a black canvas.`,
          n: 1,
          size: "1024x1024",
        });
    
        console.log("OpenAI Response:", response);
    
        /*** Final Response ***/
        return res.status(200).json({
          success: true,
          message: "File uploaded and processed successfully.",
          response,
          insights: result,
          text,
        });
      } catch (error) {
        console.error("Error:", error);
        return res.status(502).json({ message: "Bad Gateway. Error processing the request." });
      }
    }