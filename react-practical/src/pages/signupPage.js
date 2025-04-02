import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signUpUser } from "../services/api";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);

    try {
      const data = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password
      };
      const response = await signUpUser(data);
      console.log('testRes', response);

      if (response.status === 201) {
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userOtp', response?.data?.otp);

        toast.success(response.data.message);

        setTimeout(() => {
          alert(`Your OTP is ${response?.data?.otp}`);
          navigate('/otp-verification');
        }, 2000);
      }
      
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message || "");
      } else {
        toast.error("An error occurred while signing up.");
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            value={formData?.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            required
            value={formData?.lastName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData?.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData?.password}
            onChange={handleChange}
          />
          <button type="submit" className="btn-signup">Signup</button>
        </form>
        <button className="btn-secondary" onClick={() => navigate("/")}>Home</button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Signup;
