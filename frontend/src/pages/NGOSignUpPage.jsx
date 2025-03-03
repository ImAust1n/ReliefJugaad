import React, {useState} from "react";
import "../NGOSignUp.css";
import { useNGOStore } from "../store/useNGOStore";

const NGOSignUpPage = () => {
  const { signup } = useNGOStore();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    district: "",
    state: "",
    phoneNumber: "",
    registrationNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    signup(formData);
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up as NGO</h2>

        <label>Full Name</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" required />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />

        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />

        <label>District</label>
        <input type="text" name="district" value={formData.district} onChange={handleChange} placeholder="Enter your district" required />

        <label>State</label>
        <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="Enter your state" required />

        <label>Phone Number</label>
        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Enter your phone number" required />

        <label>Registration Number</label>
        <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} placeholder="Enter your registration Number" required />
<br /> 
        <button type="submit">Sign Up</button>

        <div>
          <p className="login-link">Already have an account?   
            <a href="/login">Login</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default NGOSignUpPage;