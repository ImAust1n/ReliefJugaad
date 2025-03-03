import React, { useState } from "react";
import "../DonorSignup.css";
import { useAuthStore } from "../store/useAuthStore"

const DonorSignUpPage = () => {
  const {signup} = useAuthStore();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    district: "",
    state: "",
    phoneNumber: "",
    isVolunteer: false
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    signup(formData);
  };

  return (
    <div className="pt-15">
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-heading">Sign Up as Donor / Volunteer</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="fullName" placeholder="Enter your full name" required value={formData.fullName} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="Enter your email" required value={formData.email} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="Enter your password" required minLength="6" value={formData.password} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>District</label>
            <input type="text" name="district" placeholder="Enter your district" required value={formData.district} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>State</label>
            <input type="text" name="state" placeholder="Enter your state" required value={formData.state} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input type="text" name="phoneNumber" placeholder="Enter your phone number" required value={formData.phoneNumber} onChange={handleChange} />
          </div>

          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="isVolunteer" 
              name="isVolunteer" 
              checked={formData.isVolunteer} 
              onChange={handleChange} 
              style={{ fontSize: '14px', display: 'inline' }}
            />
            <p htmlFor="isVolunteer" className="ml-2">Register as Volunteer</p>
          </div>

          <div className="button-container">
            <button type="submit" onClick={() => handleSubmit()}>Sign Up</button>
          </div>
        </form>
        <p className="signup-link">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default DonorSignUpPage;
