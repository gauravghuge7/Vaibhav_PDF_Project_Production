"use client";

import Navbar from "@/app/Components/Navbar";
import axios from "axios";
import { useState } from "react";

export default function UploadForm() {

  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [imageData, setImageData] = useState("");

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file!");
      return;
    }

    setProcessing(true); // Show spinner
    setDownloadUrl(""); // Clear download URL

    const formData = new FormData();
    formData.append("imageFile", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };

      // Call the API
      // const res = await axios.post("/api/openAiRoute", formData, config);
      const res = await axios.post("/api/googleImage", formData, config);

      console.log(" Google Data", res);

      if(res.statusText === "OK") {
        setImageData(res?.data?.text);
        const url = res?.data?.response?.data[0]?.url;
        console.log("URL => ", url);  
        setDownloadUrl(url);
        
      }

    } 
    
    catch (err) {
      console.error("Error submitting file:", err?.response || null);
    } 

    finally {
      setProcessing(false); // Hide spinner
    }

  };


  


  return (
    <div className="max-h-screen bg-gray-100">
      
      <Navbar />

      <div className="flex flex-col items-center justify-center py-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-lg font-semibold mb-4">Upload and Process Your Image</h2>
          <input
            type="file"
            accept="image/*" // Accept any image format
            onChange={handleFileChange}
            required
            className="mb-4 border border-gray-300 rounded px-4 py-2 w-full"
          />
          <button
            type="submit"
            className={`w-full py-2 px-4 text-white font-bold rounded ${
              processing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={processing}
          >
            {processing ? "Processing..." : "Upload and Process Image"}
          </button>
        </form>

        {processing && (
          <div className="flex items-center justify-center space-x-2 mt-4">
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-ping"></div>
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-ping delay-150"></div>
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-ping delay-300"></div>
          </div>
        )}

        {downloadUrl && (
          <div className="mt-4">
            <a
              href={downloadUrl}
              download="processed-image.jpg" // Change file name and extension accordingly
              className="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
              target="_blank"
            >
              Download Processed Image
            </a>
          </div>
        )}
      </div>

      {/*   for the after processing the image data will be shown here  */}
      {imageData && (
  <div className="mt-10 bg-white p-6 shadow-lg rounded-xl">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Process Insights</h2>

    <div className="text-gray-700 space-y-4">
      {imageData.split("\n").map((line, index) => {
        if (!line.trim()) return null; // Ignore empty lines

        // Dynamically detect sections marked with **
        if (line.includes("**")) {
          const sectionTitle = line.replace(/\*\*/g, "").trim(); // Remove '**' and trim spaces

          // Render section title with a blue color
          return (
            <div key={index}>
              <h3 className="text-lg font-semibold text-blue-700">{sectionTitle}</h3>
              <hr className="my-2 border-gray-300" />
            </div>
          );
        }

        // Dynamically handle lists (lines starting with *)
        if (line.trim().startsWith("*")) {
          return (
            <ul key={index} className="list-disc list-inside">
              <li>{line.replace("*", "").trim()}</li>
            </ul>
          );
        }

        // Render normal text (for content without special formatting)
        return <p key={index}>{line}</p>;
      })}
    </div>
  </div>
)}



    </div>
  );
}
