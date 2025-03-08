import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/index"; 
import SignupForm from "./pages/formpage"; 
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<SignupForm />} />
      </Routes>
    </Router>
  </StrictMode>
);
