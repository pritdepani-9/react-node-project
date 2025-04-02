import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { verifyUserOtp } from "../services/api";

function OtpVerification() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = localStorage.getItem("userEmail") || "";

  useEffect(() => {
    if (!email) {
      toast.error("Access Denied! Please sign up first.");
      navigate("/signup");
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    const data = { otp: otp, email: email };

    try {
      const response = await verifyUserOtp(data);
      console.log("response", response);

      if (response.status === 200) {
        localStorage.removeItem("userEmail");
        toast.success("OTP Verified Successfully!");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message || "OTP expired or invalid");
      } else {
        toast.error("An error occurred while verifying OTP.");
      }
    }
  };

  return (
    <div className="verification-container">
      <div className="verification-box">
        <h2>OTP Verification</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="otp"
            placeholder="Enter 6-digit OTP"
            required
            value={otp}
            onChange={handleChange}
            maxLength="6"
          />
          <button type="submit" className="btn-verify">Verify OTP</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default OtpVerification;
