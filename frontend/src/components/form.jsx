import React, { useState } from "react";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    whatsapp: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const showToast = (message, type) => {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById("toast-container");
    if (!toastContainer) {
      toastContainer = document.createElement("div");
      toastContainer.id = "toast-container";
      toastContainer.className = "fixed top-4 right-4 z-50 flex flex-col gap-2";
      document.body.appendChild(toastContainer);
    }

    // Create toast element
    const toast = document.createElement("div");
    toast.className = `px-4 py-2 rounded-md shadow-md text-white flex items-center ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    } transform transition-all duration-500 opacity-0 translate-x-full`;

    toast.innerHTML = `
      <div class="mr-2">${type === "success" ? "✓" : "✕"}</div>
      <div>${message}</div>
    `;

    toastContainer.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.classList.remove("opacity-0", "translate-x-full");
    }, 10);

    // Remove after 5 seconds
    setTimeout(() => {
      toast.classList.add("opacity-0", "translate-x-full");
      setTimeout(() => {
        toastContainer.removeChild(toast);
      }, 500);
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const requestData = {
      username: formData.username,
      email: formData.email,
      whatsappNumber: formData.whatsapp,
    };

    try {
      const response = await fetch(
        "https://disgusted-kettie-outside-e3ffd217.koyeb.app/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Signup Successful:", data);
      showToast("Signup successful! Welcome aboard.", "success");

      // Optional: Reset form after successful submission
      setFormData({
        username: "",
        email: "",
        whatsapp: "",
      });
    } catch (error) {
      console.error("Signup Error:", error);
      showToast("Signup failed. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="signup" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-indigo-600 px-6 py-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-2">Create Your Account</h2>
            <p>Get started with Emonazi AI today</p>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="whatsapp"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  disabled={isLoading}
                />
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
