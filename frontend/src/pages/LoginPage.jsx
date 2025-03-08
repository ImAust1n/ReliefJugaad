import React from 'react'
import { Link } from "react-router-dom"

const LoginPage = (props) => { 
  return (
    <div>
      <div className="pt-[100px] w-full h-screen flex justify-center items-center bg-[#000F0B] font-['Montserrat']">
      <div className="bg-[#112221] rounded-xl shadow-lg p-[70px] w-[60%] max-w-[600px] min-w-[400px]">
        <div className="text-center mb-8">
          <h1 className="text-[#3FEBD0] font-semibold text-[26px] mb-3 tracking-wide">Login as {props.title}</h1>
          <p className="text-[#F0F2F0] opacity-80 text-[16px]">Please enter your credentials to login</p>
        </div>
        
        <form onSubmit={props.handleSubmit} className="flex flex-col gap-7">
          <div className="flex flex-col gap-2.5">
            <label htmlFor="email" className="text-[#F0F2F0] text-[16px] font-medium">Email</label>
            <input
              type="email"
              id="email"
              value={props.formData.email}
              onChange={(e) => props.setFormData({ ...props.formData, email: e.target.value })}
              className="bg-[#054938] border border-[#094534] rounded-lg p-4 text-[#F0F2F0] text-[16px] transition duration-300 focus:outline-none focus:border-[#00BC4C] placeholder:text-[#F0F2F0] placeholder-opacity-50"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="flex flex-col gap-2.5">
            <label htmlFor="password" className="text-[#F0F2F0] text-[16px] font-medium">Password</label>
            <input
              type="password"
              id="password"
              value={props.formData.password}
              onChange={(e) => props.setFormData({ ...props.formData, password: e.target.value })}
              className="bg-[#054938] border border-[#094534] rounded-lg p-4 text-[#F0F2F0] text-[16px] transition duration-300 focus:outline-none focus:border-[#00BC4C] placeholder:text-[#F0F2F0] placeholder-opacity-50"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button
            type="submit"
            className="bg-[#22C55E] text-[#000F0B] border-none rounded-lg p-4 font-semibold text-[18px] cursor-pointer transition duration-300 hover:bg-[#00BC4C] mt-3"
          >
            Login
          </button>
        </form>
        
        <div className="mt-7 text-center text-[#F0F2F0] opacity-80 text-[16px]">
          <p>Don't have an account? <Link to={props.link} className="text-[#3FEBD0] font-medium transition duration-300 hover:opacity-80">Sign up</Link></p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default LoginPage;

