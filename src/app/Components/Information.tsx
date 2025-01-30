"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Information: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-50 to-teal-100 py-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="bg-white shadow-xl rounded-2xl p-6 border-t-4 border-teal-500">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-teal-700">Chemical Engineering Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700 text-lg">
                Chemical engineering is the branch of engineering that combines natural sciences, mathematics, and economics to
                design, develop, and optimize processes for large-scale production. Key areas include:
              </p>
              <ul className="list-disc list-inside text-gray-600 text-base">
                <li>Reaction engineering for designing chemical reactors.</li>
                <li>Heat and mass transfer for process efficiency.</li>
                <li>Separation processes such as distillation and filtration.</li>
                <li>Thermodynamics for energy optimization in processes.</li>
              </ul>
              <p className="text-gray-700 text-lg">
                These processes are used in industries such as petrochemicals, pharmaceuticals, and environmental engineering to
                create products and solutions efficiently and sustainably.
              </p>
              <div className="flex justify-center">
                <Button className="bg-teal-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-teal-700">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center"
          >
            <Card className="bg-gradient-to-br from-green-100 to-blue-50 shadow-lg rounded-xl p-4">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-green-700">Distillation Column</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-base">
                  Distillation is a key separation process used to purify or separate liquid mixtures into their components based
                  on boiling points.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex justify-center"
          >
            <Card className="bg-gradient-to-br from-yellow-100 to-orange-50 shadow-lg rounded-xl p-4">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-yellow-700">Heat Exchanger</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-base">
                  Heat exchangers are used to transfer heat efficiently between two fluids, essential for energy conservation in
                  chemical processes.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Information;
