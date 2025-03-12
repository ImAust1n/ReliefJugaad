import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useGOVStore } from "../store/useGOVStore";

const DonorSignUpPage = () => {
  const { signup } = useAuthStore();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    district: "",
    state: "",
    phoneNumber: "",
    isVolunteer: false,
    type: "",
  });
  const { userEmails, setUsers, users } = useGOVStore();

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsers();
    console.log("Form submitted:", formData);
    if (formData.isVolunteer === false) formData.type = "none"; 
    else if (users % 3 === 0) formData.type = "Rescue";
    else if (users % 3 === 1) formData.type = "Medical";
    else formData.type = "Transportation";
    signup(formData);
    setUsers();
    console.log(userEmails);
    console.log(users);
  };

  return (
    <div className="flex flex-grow justify-center items-center w-full bg-[#000F0B]">
      <div className="bg-[#112221] p-10 mb-15 mt-20 rounded-lg shadow-lg w-[600px] text-left">
        <h2 className="text-center text-[#00E8CF] text-2xl font-bold mb-4">Sign Up as Donor / Volunteer</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="text-gray-200 text-sm font-bold mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border border-[#094534] bg-[#054938] text-white rounded focus:outline-none placeholder-gray-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-200 text-sm font-bold mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-[#094534] bg-[#054938] text-white rounded focus:outline-none placeholder-gray-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-200 text-sm font-bold mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              minLength="6"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-[#094534] bg-[#054938] text-white rounded focus:outline-none placeholder-gray-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-200 text-sm font-bold mb-1">District</label>
            <input
              type="text"
              name="district"
              placeholder="Enter your district"
              required
              value={formData.district}
              onChange={handleChange}
              className="w-full p-2 border border-[#094534] bg-[#054938] text-white rounded focus:outline-none placeholder-gray-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-200 text-sm font-bold mb-1">State</label>
            <input
              type="text"
              name="state"
              placeholder="Enter your state"
              required
              value={formData.state}
              onChange={handleChange}
              className="w-full p-2 border border-[#094534] bg-[#054938] text-white rounded focus:outline-none placeholder-gray-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-200 text-sm font-bold mb-1">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Enter your phone number"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border border-[#094534] bg-[#054938] text-white rounded focus:outline-none placeholder-gray-300"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isVolunteer"
              name="isVolunteer"
              checked={formData.isVolunteer}
              onChange={handleChange}
              className="mr-2 h-4 w-4"
            />
            <label htmlFor="isVolunteer" className="text-gray-200 text-sm">
              Register as Volunteer
            </label>
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

export default DonorSignUpPage;
