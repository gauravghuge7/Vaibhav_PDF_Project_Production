'use client';

// pages/index.tsx
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link"; // Import Link from Next.js

const Generate: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-cyan-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-teal-700 mb-10">Generate Process Insights</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upload Image Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <Card className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-blue-500">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-blue-700">Check P&ID Using Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Upload an image of a Piping and Instrumentation Diagram (P&ID) for an ethanol and distilled water plant to automatically extract and analyze process insights.
                </p>
                <Link href="/User/uploadImage">
                  <Button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Check P&ID Using Image
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upload PDF Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <Card className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-green-500">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-green-700">Check P&ID Using PDF</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Upload a PDF document containing Piping and Instrumentation Diagrams (P&ID) for an ethanol and distilled water plant to extract and analyze process insights.
                </p>
                <Link href="/upload-pdf">
                  <Button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                    Check P&ID Using PDF
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Generate;
