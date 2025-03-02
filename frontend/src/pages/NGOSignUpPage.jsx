import React from "react";
import "../NGOSignUp.css";
import { Link } from "react-router-dom";

const NGOSignUpPage = () => {
  return (
    <div className="signup-body-ngo">
    <div className="signup-container-ngo">
      <form className="signup-form-ngo">
        <h2 style={{textAlign: "center", marginBottom: "20px", paddingTop: "30px"}}>NGO Sign Up</h2>

        <label>Full Name</label>
        <input type="text" name="fullName" placeholder="Enter your full name" required />

        <label>Email</label>
        <input type="email" name="email" placeholder="Enter your email" required />

        <label>Password</label>
        <input type="password" name="password" placeholder="Enter your password" required />

        <label>District</label>
        <input type="text" name="district" placeholder="Enter your district" required />

        <label>State</label>
        <input type="text" name="state" placeholder="Enter your state" required />

        <label>Phone Number</label>
        <input type="text" name="phoneNumber" placeholder="Enter your phone number" required />

        <label>Registration Number</label>
        <input type="text" name="registrationNumber" placeholder="Enter your reg. no" required />
<br /> 
        <button type="submit">Sign Up</button>

        <div style={{textAlign: "center", marginTop: "20px", fontSize: "20px"}}>
          <p className="login-link-ngo">Already Have an account? <Link to="/ngo-login" style={{color: "#3FEBD0"}} >Login</Link>
          </p>
        </div>
      </form>
    </div>
    </div>
  );
};

export default NGOSignUpPage;