import React, { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Smile, ChevronDown, Loader } from "lucide-react";

const ChatComponent = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Welcome to Emonazi AI! Describe what you need help with, and I'll generate a proposal for you.",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Call the API with the user's description
      const response = await fetch(
        "https://new-raine-outside-e60ca31b.koyeb.app/upwork/proposal",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ description: inputValue }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get proposal");
      }

      const data = await response.json();

      // Add bot response with the generated proposal
      const botMessage = {
        id: Date.now() + 1,
        text: data.message,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      // Handle error
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, there was an error generating your proposal. Please try again.",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto border rounded-lg shadow-md bg-white">
      {/* Chat header */}
      <div className="px-4 py-3 bg-indigo-600 text-white font-medium rounded-t-lg flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-lg font-bold">Emonazi AI Chat</span>
          <span className="ml-2 px-2 py-1 bg-indigo-700 rounded-md text-xs">
            v1.0.0
          </span>
        </div>
        <button
          onClick={() => setIsInfoOpen(!isInfoOpen)}
          className="flex items-center space-x-1 bg-indigo-700 hover:bg-indigo-800 px-3 py-1 rounded-md text-sm"
        >
          <span>Info</span>
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Info panel */}
      {isInfoOpen && (
        <div className="px-4 py-3 bg-gray-50 border-b text-sm text-gray-700">
          <p>
            Welcome to Emonazi AI Proposal Generator! Enter a description of
            what you need, and we'll create a professional proposal for you.
          </p>
        </div>
      )}

      {/* Messages container */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-lg mx-2 my-3 ${
              message.sender === "user" ? "ml-auto" : "mr-auto"
            }`}
          >
            <div
              className={`p-3 rounded-lg shadow-sm ${
                message.sender === "user"
                  ? "bg-indigo-600 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none"
              }`}
            >
              <div className="whitespace-pre-line">{message.text}</div>
            </div>
            <div
              className={`text-xs mt-1 ${
                message.sender === "user"
                  ? "text-right text-gray-500"
                  : "text-left text-gray-500"
              }`}
            >
              {message.timestamp}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-center items-center p-4">
            <Loader size={24} className="animate-spin text-indigo-600" />
            <span className="ml-2 text-gray-500">Generating proposal...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <form
        onSubmit={handleSendMessage}
        className="bg-white border-t p-3 flex items-center"
      >
        <button
          type="button"
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
          title="Attach files"
        >
          <Paperclip size={20} />
        </button>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-full mx-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Describe what you need help with..."
          disabled={isLoading}
        />
        <button
          type="button"
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 mr-2"
          title="Add emoji"
        >
          <Smile size={20} />
        </button>
        <button
          type="submit"
          className={`text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            isLoading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
          disabled={isLoading}
          title="Send message"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatComponent;
