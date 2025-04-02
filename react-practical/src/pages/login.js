import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../services/api";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); 

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);

    try {
      const response = await login(formData);
      console.log("Full Response:", response);

      if (response.status === 200) {
        const data = response.data;
        console.log("Response Data:", data);

        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("email", data.email);

        if (data.is_verified) {
          toast.success(response?.data.message || "Login Successful!");
          setTimeout(() => {
            navigate("/booking");
          }, 1500);
        } else {
          alert("Your OTP is 123456");
          navigate("/otp-verification");
        }
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message || "OTP expired or invalid");
      } else {
        toast.error("An error occurred during login.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit" className="btn-login">Login</button>
        </form>
        <button className="btn-secondary" onClick={() => navigate("/")}>
          Go to Home
        </button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
