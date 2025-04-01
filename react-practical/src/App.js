import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/signupPage";
import Login from "./pages/login";
import Home from "./pages/home";
import OtpVerification from "./pages/OtpVerification";
import Booking from "./pages/bookingPage";
import "./style.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </Router>
  );
}

export default App;
