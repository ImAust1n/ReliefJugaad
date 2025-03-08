import React, {useState} from "react";
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
    <div className="flex flex-grow justify-center items-center w-full bg-[#000F0B]">
      <form className="signup-form bg-[#112221] p-10 mb-15 mt-20 rounded-lg shadow-lg w-[600px] text-left" onSubmit={handleSubmit}>
        <h2 className="text-center text-[#00E8CF] text-2xl font-bold mb-4">Sign Up as NGO</h2>

        <label className="block text-white text-sm font-bold mt-2 mb-1">Full Name</label>
        <input type="text"  className="w-full p-2 mb-4 border border-[#094534] bg-[#054938] text-white rounded outline-none placeholder-opacity-60"  name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" required />

        <label className="block text-white text-sm font-bold mt-2 mb-1">Email</label>
        <input type="email"  className="w-full p-2 mb-4 border border-[#094534] bg-[#054938] text-white rounded outline-none placeholder-opacity-60"  name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />

        <label className="block text-white text-sm font-bold mt-2 mb-1">Password</label>
        <input type="password"  className="w-full p-2 mb-4 border border-[#094534] bg-[#054938] text-white rounded outline-none placeholder-opacity-60"  name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />

        <label className="block text-white text-sm font-bold mt-2 mb-1">District</label>
        <input type="text" className="w-full p-2 mb-4 border border-[#094534] bg-[#054938] text-white rounded outline-none placeholder-opacity-60"  name="district" value={formData.district} onChange={handleChange} placeholder="Enter your district" required />

        <label  className="block text-white text-sm font-bold mt-2 mb-1">State</label>
        <input type="text" className="w-full p-2 mb-4 border border-[#094534] bg-[#054938] text-white rounded outline-none placeholder-opacity-60"  name="state" value={formData.state} onChange={handleChange} placeholder="Enter your state" required />

        <label  className="block text-white text-sm font-bold mt-2 mb-1">Phone Number</label>
        <input type="text" className="w-full p-2 mb-4 border border-[#094534] bg-[#054938] text-white rounded outline-none placeholder-opacity-60"  name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Enter your phone number" required />

        <label  className="block text-white text-sm font-bold mt-2 mb-1">Registration Number</label>
        <input type="text" className="w-full p-2 mb-4 border border-[#094534] bg-[#054938] text-white rounded outline-none placeholder-opacity-60"  name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} placeholder="Enter your registration Number" required />
<br /> 
        <button className="w-full p-3 mt-2 bg-green-500 text-white font-bold rounded cursor-pointer hover:bg-green-600" type="submit">Sign Up</button>

        <div>
        <p className="text-center text-gray-200 mt-4">
          Already have an account?{" "}
          <a href="/donor-login" className="text-teal-400 hover:underline">
            Log in
          </a>
        </p>
        </div>
      </form>
    </div>
  );
};

export default NGOSignUpPage;