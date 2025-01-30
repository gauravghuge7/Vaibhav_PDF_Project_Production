import {
      ServicePrincipalCredentials,
      PDFServices,
      MimeType,
      DocumentMergeParams,
      OutputFormat,
      DocumentMergeJob,
      DocumentMergeResult,
      SDKError,
      ServiceUsageError,
      ServiceApiError
    } from "@adobe/pdfservices-node-sdk";
import IncomingForm from "formidable/Formidable";

import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

      if(req.method !=  "POST") {
      return res 
            .status(400)
            .json({
            message : "method must be post "
            })
      }

      const form = new IncomingForm();

      form.parse(req, async (err, fields, files) => {

            if (err) return res.status(500).send("Error processing file in the form parsing ");

            const file = files?.pdfFile[0] ;

            console.log("File => ", file);


            let readStream;
            try {
                  // Initial setup, create credentials instance
                  const credentials = new ServicePrincipalCredentials({
                        clientId: process.env.PDF_SERVICES_CLIENT_ID,
                        clientSecret: process.env.PDF_SERVICES_CLIENT_SECRET
                  });
            
                  // Creates a PDF Services instance
                  const pdfServices = new PDFServices({credentials});
            
                  // Creates an asset(s) from source file(s) and upload
                  readStream = fs.createReadStream("./receiptTemplate.docx");
                  const inputAsset = await pdfServices.upload({
                  readStream,
                  mimeType: MimeType.DOCX
                  });
            
                  // Setup input data for the document merge process
                  const jsonDataForMerge = JSON.parse(fs.readFileSync('./receipt.json', 'utf-8'));
            
                  // Create parameters for the job
                  const params = new DocumentMergeParams({
                        jsonDataForMerge,
                        outputFormat: OutputFormat.PDF
                  });
            
                  // Creates a new job instance
                  const job = new DocumentMergeJob({inputAsset, params});
            
                  // Submit the job and get the job result
                  const pollingURL = await pdfServices.submit({job});
                  const pdfServicesResponse = await pdfServices.getJobResult({
                  pollingURL,
                        resultType: DocumentMergeResult
                  });
            
                  // Get content from the resulting asset(s)
                  const resultAsset = pdfServicesResponse.result.asset;
                  const streamAsset = await pdfServices.getContent({asset: resultAsset});
            
                  // Creates a write stream and copy stream asset's content to it
                  const outputFilePath = "./generatePDFOutput.pdf";
                  console.log(`Saving asset at ${outputFilePath}`);
            
                  const writeStream = fs.createWriteStream(outputFilePath);
                  streamAsset.readStream.pipe(writeStream);
            } 

            catch (err) {
                  if (err instanceof SDKError || err instanceof ServiceUsageError || err instanceof ServiceApiError) {
                  console.log("Exception encountered while executing operation", err);
                  } else {
                  console.log("Exception encountered while executing operation", err);
                  }
            } 

            finally {
                  readStream?.destroy();
            }
      })
}