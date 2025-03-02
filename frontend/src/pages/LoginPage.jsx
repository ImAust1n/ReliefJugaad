import React from 'react'
import { Link } from "react-router-dom"

const LoginPage = (props) => { 
  return (
    <div>
      <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Login as {props.title}</h1>
          <p>Please enter your credentials to login</p>
        </div>
        
        <form onSubmit={props.handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={props.formData.email}
              onChange={(e) => props.setFormData({ ...props.formData, email: e.target.value })}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={props.formData.password}
              onChange={(e) => props.setFormData({ ...props.formData, password: e.target.value })}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button type="submit" className="login-button">Login</button>
        </form>
        
        <div className="signup-link">
          <p>Don't have an account? <Link to={props.link}>Sign up</Link></p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default LoginPage;
