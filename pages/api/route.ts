// import { IncomingForm } from "formidable";
// import { readFileSync } from "fs";
// import { NextApiRequest, NextApiResponse } from "next";
// import path from "path";
// import { OpenAI } from "openai";
// import PDFParser from "pdf2json"; // Importing pdf2json
// import fs from "fs";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { PDFDocument } from "pdf-lib";

// import  {
//   ServicePrincipalCredentials,
//   PDFServices,
//   MimeType,
//   ExportPDFParams,
//   ExportPDFTargetFormat,
//   ExportPDFJob,
//   ExportPDFResult
// } from "@adobe/pdfservices-node-sdk";

// const credentials = new ServicePrincipalCredentials({
//   clientId: process.env.PDF_SERVICES_CLIENT_ID || "",
//   clientSecret: process.env.PDF_SERVICES_CLIENT_SECRET || "",
// });



// // Disable Next.js body parser for file uploads
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };



// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_FILE_MANAGER);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const extractPdfText = async (filePath : string) => {

//   console.log("Extracting text from PDF file:", filePath);
//   const pdfBytes = fs.readFileSync(filePath);

//   const pdfDoc = await PDFDocument.load(pdfBytes);
//   const text = await pdfDoc.saveAsBase64({ dataUri: true });
//   return text;
// };

// const generatePdf = async (insights, outputPath) => {

//   const pdfDoc = await PDFDocument.create();
//   const page = pdfDoc.addPage();
//   const { width, height } = page.getSize();
//   const fontSize = 12;

//   let yPosition = height - fontSize * 2;

//   insights.split("\n").forEach((line) => {
//     page.drawText(line, { x: 50, y: yPosition, size: fontSize });
//     yPosition -= fontSize + 5;
//   });

//   const pdfBytes = await pdfDoc.save();
//   fs.writeFileSync(outputPath, pdfBytes);
// };



// export default function handler(req: NextApiRequest, res: NextApiResponse) {

//   if(req.method !=  "POST") {
//     return res 
//       .status(400)
//       .json({
//         message : "method must be post "
//       })
//   }

//   const form = new IncomingForm();

//   form.parse(req, async (err, fields, files) => {

//     if (err) return res.status(500).send("Error processing file in the form parsing ");

//     const file = files?.pdfFile[0] ;

//     console.log("File => ", file);


//     try {





//       const text = await extractPdfText(file.filepath);

//       console.log("Process 1 => ", text);


//       // Send content to AI model
//       const prompt = `Provide insights about the following content into a PDF file:\n\n${text}`;

//       // const result = await model.generateContent(prompt);
//       const result = await model.generateContent(
//         prompt,

//       );

//       console.log("Process 2 : result => ", result);

//       const insights = result.response.text();

      
//       console.log("Process 3 : insights => ", insights);

//       const outputPath = `${process.cwd()}/insights.pdf`;

//       await generatePdf(insights, outputPath);

//       res.setHeader("Content-Type", "application/pdf");
//       res.setHeader("Content-Disposition", "attachment; filename=insights.pdf");
//       fs.createReadStream(outputPath).pipe(res);
//     } 
//     catch (error) {
//       console.error(error);
//       res.status(500).send("Error generating insights");
//     }
//   });


