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

  const navigate = useNavigate(); // Hook for navigation

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);

    const data = new FormData(e.currentTarget);
    const loginValues = {
        email: data.get('email'),
        password: data.get('password'),
    };

    try {
        const response = await login(formData);
        console.log('Full Response:', response);
    

        if (response.status === 200) {
            const data = response.data;
            console.log("Response Data:", data);
    
          
            localStorage.setItem('user_id', data.user_id);
            localStorage.setItem('email', data.email);
    
            if (data.is_verified) {
                toast.success(response?.data.message || "Login Successful!");
                setTimeout(() => {        
                    navigate('/booking');
                }, 1500);
            } else {
                alert('your otp is 123456')
                navigate('/otp-verification');
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
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      <button 
        style={{ marginTop: "10px", padding: "10px", cursor: "pointer" }} 
        onClick={() => navigate("/")}
      >
        Home
      </button>
      <ToastContainer />
    </div>
  );
}

export default Login;
