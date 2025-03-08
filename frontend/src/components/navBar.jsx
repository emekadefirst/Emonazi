import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-indigo-600">
              Emonazi AI
            </span>
            <span className="ml-2 px-2 py-1 bg-gray-100 rounded-md text-xs">
              v1.0.0
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <a
              href="#home"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              About
            </a>
            <a
              href="#features"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Pricing
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/register"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Register
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 py-3 border-t">
            <nav className="flex flex-col space-y-3">
              <a
                href="#home"
                className="text-gray-700 hover:text-indigo-600 font-medium"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-indigo-600 font-medium"
              >
                About
              </a>

              <div className="pt-3 mt-3 border-t flex flex-col space-y-3">
                <a
                  href="register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-center"
                >
                  Register
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
