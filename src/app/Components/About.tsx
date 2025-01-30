
"use client";


import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";

const About: React.FC = () => {
  const handleGeneratePDF = () => {
    // Function to trigger the PDF generation process
    console.log("Generating PDF for Ethanol and Billary Water Tank Process Flow...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white shadow-lg rounded-2xl p-6 border-t-4 border-blue-500">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-blue-700">About the Process Flow Diagram</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700 text-lg">
                This process flow diagram illustrates the interaction between the Ethanol Tank and the Billary Water Tank. It includes:
              </p>
              <ul className="list-disc list-inside text-gray-600 text-base">
                <li>Steps for ethanol storage and management.</li>
                <li>Integration with the billary water system for waste management and efficiency.</li>
                <li>Key processes such as inflow, outflow, and monitoring systems.</li>
              </ul>
              <p className="text-gray-700 text-lg">
                By generating the PDF, you can access a detailed diagram along with step-by-step explanations, ensuring clarity and easy reference for operational purposes.
              </p>
              
            </CardContent>
          </Card>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <Image
                src="/images/ethanol-tank.png"
                alt="Ethanol Tank"
                width={300}
                height={300}
                className="rounded-xl shadow-lg"
              />
            </motion.div>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <Image
                src="/images/billary-water-tank.png"
                alt="Billary Water Tank"
                width={300}
                height={300}
                className="rounded-xl shadow-lg"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
