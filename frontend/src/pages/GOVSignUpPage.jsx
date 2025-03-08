import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGOVStore } from "../store/useGOVStore"

const GOVSignUpPage = () => {
  const { signup } = useGOVStore();
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
    signup(formData);
  };

  return (
    <div className="flex flex-grow justify-center items-center w-full bg-[#000F0B]">
      <div className="bg-[#112221] p-10 mb-15 mt-20 rounded-lg shadow-lg w-[600px] text-left">
        <h2 className="text-center text-[#00E8CF] text-2xl font-bold mb-4">Sign Up as Government</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col">
              <label className="text-gray-200 text-sm font-bold mb-1">Name</label>
              <input className="w-full p-2 border border-[#094534] bg-[#054938] text-white rounded focus:outline-none placeholder-gray-300"
             type="text" name="fullName" placeholder="Full Name" required value={formData.fullName} onChange={handleChange} />
          </div>
          <div className="flex flex-col">
              <label className="text-gray-200 text-sm font-bold mb-1">Email</label>
              <input className="w-full p-2 border border-[#094534] bg-[#054938] text-white rounded focus:outline-none placeholder-gray-300"
             type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
          </div>

          <div className="flex flex-col">
              <label className="text-gray-200 text-sm font-bold mb-1">Password</label>
              <input className="w-full p-2 border border-[#094534] bg-[#054938] text-white rounded focus:outline-none placeholder-gray-300"
             type="password" name="password" placeholder="Set Password" required minLength="6" value={formData.password} onChange={handleChange} />
          </div>
          <div className="flex flex-col">
              <label className="text-gray-200 text-sm font-bold mb-1">Phone Number</label>
              <input className="w-full p-2 border border-[#094534] bg-[#054938] text-white rounded focus:outline-none placeholder-gray-300"
             type="text" name="phoneNumber" placeholder="Phone Number" required value={formData.phoneNumber} onChange={handleChange} />
          </div>

          <div className="flex flex-col">
              <label className="text-gray-200 text-sm font-bold mb-1">District</label>
              <input className="w-full p-2 border border-[#094534] bg-[#054938] text-white rounded focus:outline-none placeholder-gray-300"
             type="text" name="district" placeholder="District" value={formData.district} onChange={handleChange} />
          </div>
          <div className="flex flex-col">
              <label className="text-gray-200 text-sm font-bold mb-1">State</label>
              <input className="w-full p-2 border border-[#094534] bg-[#054938] text-white rounded focus:outline-none placeholder-gray-300"
             type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
          </div>

          <div className="flex flex-col">
              <label className="text-gray-200 text-sm font-bold mb-1">Type of Government</label>
              <select className="w-full p-2 border border-[#094534] bg-[#054938] text-white rounded focus:outline-none placeholder-gray-300"
             name="type" required value={formData.type} onChange={handleChange}>
                <option value="" disabled>Select</option>
                <option value="NDRF">NDRF</option>
                <option value="NDMA">NDMA</option>
                <option value="Local Government">Local Government</option>
              </select>
          </div>

          <div className="flex justify-center mt-4">
          <button type="submit" className="w-full p-2 bg-green-500 text-white font-bold rounded hover:bg-green-600">
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center text-gray-200 mt-4">
          Already have an account?{" "}
          <a href="/donor-login" className="text-teal-400 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default GOVSignUpPage;
