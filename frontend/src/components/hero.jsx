import React from "react";

const Hero = () => {
  return (
    <section
      id="home"
      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 md:py-24"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Generate Perfect Content with AI
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Create unique cover letters, resumes, proposals and more for your
              business with our advanced AI platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#signup"
                className="bg-white text-indigo-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 text-center"
              >
                Get Started Free
              </a>
              <a
                href="#features"
                className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:bg-opacity-10 text-center"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-white rounded-lg shadow-xl p-4 w-full max-w-md">
              <div className="bg-gray-100 rounded-md p-4 mb-4">
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
              <div className="bg-indigo-50 rounded-md p-4">
                <div className="h-4 bg-indigo-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-indigo-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-indigo-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
