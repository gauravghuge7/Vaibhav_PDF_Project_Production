// import { v2 as cloudinary } from 'cloudinary' 
// import { NextApiRequest, NextApiResponse } from "next";
// import { IncomingForm } from "formidable";
// import path from "path";
// import fs from "fs";
// import OpenAI from "openai";
// const openai = new OpenAI({
//       apiKey: process.env.OPENAI_API_KEY,
//       timeout: 60000,
// });



// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };



// export default async function handler(req : NextApiRequest, res : NextApiResponse ) {
      
//       console.log(" Route is Running");

      
//       console.log("Open AI Key => ", process.env.OPENAI_API_KEY)

//       console.log(" Open AI => ", openai)


//       /*** check the post is not a get request ***/
//       if(req.method !==  "POST") {
//             return res 
//             .status(400)
//             .json({
//                   message : "method must be post "
//             })
            
//       }

//       /*** parse the form data ***/
//       const form = new IncomingForm({
//             keepExtensions: true, // Ensure extensions are kept
//             uploadDir: path.join(process.cwd(), "temp"), // Temporary upload directory
//       });
        
//       // Ensure the temp directory exists
//       const tempDir = path.join(process.cwd(), "temp");

//       if (!fs.existsSync(tempDir)) {
//             fs.mkdirSync(tempDir, { recursive: true });
//       }

//       console.log("Temp directory:", tempDir);


//       try {
      
//             form.parse(req, async (err, fields, files) => {

//                   if (err) {
//                     console.error("Error parsing form:", err);
//                     return res.status(500).send("Error processing file during form parsing.");
//                   }
            
//                   const file = files.imageFile?.[0];  // Assuming the input field name is "imageFile"

//                   console.log("File => ", file);

//                   if (!file) {
//                         return res.status(400).send("No file uploaded.");
//                   }

//                   const uploadsDir = path.join(process.cwd(), "uploads");

//                   // Ensure the uploads directory exists
//                   if (!fs.existsSync(uploadsDir)) {
//                     fs.mkdirSync(uploadsDir, { recursive: true });
//                   }
            
//                   console.log("Uploads directory:", uploadsDir);

//                   // Target path for saving the file
//                   const targetPath = path.join(uploadsDir, file.originalFilename);
            
//                   // Move the file to the target directory
//                   fs.rename(file.filepath, targetPath, async (renameErr) => {

//                         if (renameErr) {
//                               console.error("Error moving file:", renameErr);
//                               return res.status(500).send("Error saving file.");
//                         }
            
//                         console.log("File successfully saved to:", targetPath);


//                         const cloudinary_result = await uploadOnCloudinary(targetPath);

//                         console.log("Cloudinary result:", cloudinary_result);

//                         const image_url = cloudinary_result?.secure_url;
                  
//                         // Upload to Open AI
//                         try {
//                               const response = await openai.chat.completions.create({
//                                     model: "gpt-4o-mini",
//                                     messages: [
//                                       {
//                                         role: "user",
//                                         content: [
//                                           { type: "text", text: "check the image and tell me what's in it" },
//                                           {
//                                             type: "image_url",
//                                             image_url: {
//                                               "url": `${image_url}`,
//                                             },
//                                           },
//                                         ],
//                                       },
//                                     ],
//                                     store: true,
//                               });

//                               console.log("Open AI response:", response);




//                               return res.status(200).json({
//                                     message: "File uploaded and saved successfully.",
//                                     response
//                               });
                              
//                         }


//                         catch (uploadError) {
//                               console.error("Error uploading file to Open AI:", uploadError);
//                               return res.status(500).send("Error uploading file to Google AI.");
//                         }


//                   });

//                 });
      
                  
     

//             return res;
//       } 
//       catch (error) {
//             console.error(error);
//             res.status(500).send("Error generating insights");
            
//       }


// }













// // cloudinary.config({ 
// //     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
// //     api_key: process.env.CLOUDINARY_API_KEY, 
// //     api_secret: process.env.CLOUDINARY_API_SECRET
// // });




// cloudinary.config({ 
//     cloud_name: "dsh5742fk", 
//     api_key: "899594559273632", 
//     api_secret: "9E2v2LfZFqO2qiFf1-yuZmO3JX8"
// });





// const uploadOnCloudinary = async (file : any) => {

//     try {

//         const result = await cloudinary.uploader.upload(file, {
            
//             resource_type: "auto"

//         })

//         console.log("result => ", result)


//         return result;
        
//     } 
//     catch (error) {
//         console.log(" Error => ", error.message)
//         return null;
//     }

// }


