import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/index"; 
import SignupForm from "./pages/formpage"; 
import DashBoard from "./pages/dashboard";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<SignupForm />} />
        <Route path="dashboard" element={<DashBoard />} />
      </Routes>
    </Router>
  </StrictMode>
);
