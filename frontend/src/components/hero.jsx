import React from "react";

const Hero = () => {
  return (
    <section
      id="home"
      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 sm:py-16 md:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Section: Text */}
          <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 sm:mb-6">
              Generate Perfect Content with AI
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8">
              Create unique cover letters, resumes, proposals and more for your
              business with our advanced AI platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="register"
                className="bg-white text-indigo-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 w-full sm:w-auto text-center"
              >
                Get Started Free
              </a>
            </div>
          </div>

          {/* Right Section: Mockup */}
          <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0 px-2 sm:px-4">
            <div className="bg-white rounded-lg shadow-xl p-2 sm:p-3 md:p-4 w-full max-w-xs sm:max-w-sm md:max-w-md">
              {/* Top Window Mockup */}
              <div className="bg-gray-100 rounded-md p-2 sm:p-3 md:p-4 mb-2 sm:mb-3 md:mb-4">
                <div className="flex items-center mb-1 sm:mb-2 md:mb-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full bg-red-500 mr-1 sm:mr-2"></div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full bg-yellow-500 mr-1 sm:mr-2"></div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                  <div className="h-2 sm:h-3 md:h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-2 sm:h-3 md:h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-2 sm:h-3 md:h-4 bg-gray-300 rounded w-5/6"></div>
                  <div className="h-2 sm:h-3 md:h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
              {/* Bottom Output Mockup */}
              <div className="bg-indigo-50 rounded-md p-2 sm:p-3 md:p-4">
                <div className="h-2 sm:h-3 md:h-4 bg-indigo-200 rounded w-full mb-1 sm:mb-1.5 md:mb-2"></div>
                <div className="h-2 sm:h-3 md:h-4 bg-indigo-200 rounded w-3/4 mb-1 sm:mb-1.5 md:mb-2"></div>
                <div className="h-2 sm:h-3 md:h-4 bg-indigo-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
