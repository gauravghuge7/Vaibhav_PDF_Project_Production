"use client";

import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Chemical Engineering Hub</h1>
        <ul className="flex space-x-6">
          <li>
            <Link href="#home" className="hover:text-indigo-300 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="#about" className="hover:text-indigo-300 transition-colors">
              About
            </Link>
          </li>
          <li>
            <Link href="#processes" className="hover:text-indigo-300 transition-colors">
              Processes
            </Link>
          </li>
          <li>
            <Link href="#contact" className="hover:text-indigo-300 transition-colors">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
