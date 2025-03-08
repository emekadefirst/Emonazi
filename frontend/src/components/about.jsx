import React from "react";
import { CheckCircle } from "lucide-react";

const About = () => {
  const features = [
    "AI-powered cover letter generation",
    "Professional resume builder",
    "Custom business proposals",
    "Industry-specific templates",
    "SEO-optimized content",
    "24/7 availability",
  ];

  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About Emonazi AI
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform leverages advanced AI technology to help businesses,
            contractors, and freelancers create compelling professional
            documents.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-4">How It Works</h3>
              <ol className="space-y-4">
                <li className="flex">
                  <span className="bg-indigo-100 text-indigo-800 w-8 h-8 rounded-full flex items-center justify-center mr-4 shrink-0">
                    1
                  </span>
                  <div>
                    <p className="font-medium">Input your information</p>
                    <p className="text-gray-600">
                      Provide details about your background, skills, and the
                      position you're applying for.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className="bg-indigo-100 text-indigo-800 w-8 h-8 rounded-full flex items-center justify-center mr-4 shrink-0">
                    2
                  </span>
                  <div>
                    <p className="font-medium">AI generates content</p>
                    <p className="text-gray-600">
                      Our advanced AI creates tailored documents optimized for
                      your specific needs.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className="bg-indigo-100 text-indigo-800 w-8 h-8 rounded-full flex items-center justify-center mr-4 shrink-0">
                    3
                  </span>
                  <div>
                    <p className="font-medium">Edit and finalize</p>
                    <p className="text-gray-600">
                      Review, make adjustments, and export your document in
                      multiple formats.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          <div className="md:w-1/2">
            <h3 className="text-xl font-semibold mb-6">Key Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-indigo-50 border border-indigo-100 rounded-lg">
              <p className="text-indigo-700 font-medium">
                "Emonazi AI helped me create a stunning resume and cover letter
                that landed me three interviews in a week!"
              </p>
              <p className="mt-2 text-gray-600">
                — Sarah K., Freelance Designer
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
