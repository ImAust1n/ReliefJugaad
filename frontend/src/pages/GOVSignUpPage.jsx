import React, { useState } from "react";
import "../govSignUp.css";
import { Link } from "react-router-dom";

const GOVSignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    district: "",
    state: "",
    phoneNumber: "",
    type: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-heading">Sign Up as Government</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="fullName" placeholder="Full Name" required value={formData.fullName} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" placeholder="Set Password" required minLength="6" value={formData.password} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="text" name="phoneNumber" placeholder="Phone Number" required value={formData.phoneNumber} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>District</label>
              <input type="text" name="district" placeholder="District" value={formData.district} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>State</label>
              <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label>Type of Government</label>
              <select name="type" required value={formData.type} onChange={handleChange}>
                <option value="" disabled>Select</option>
                <option value="NDRF">NDRF</option>
                <option value="NDMA">NDMA</option>
                <option value="Local Government">Local Government</option>
              </select>
            </div>
          </div>

          <div className="button-container">
            <button type="submit">Sign Up</button>
          </div>
        </form>
        <p className="signup-link">
          Already have an account? <Link to="/gov-login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default GOVSignUpPage;
