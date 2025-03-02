import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full backdrop-blur-md bg-black shadow-lg fixed top-0 z-50">
      <nav className="w-full flex items-center justify-between py-3 px-6">
        {/* Logo Section */}
        <Link to="/" className="navigator">
            <div className="flex items-center space-x-2 cursor-pointer">
            <img src={"/helicopterhelicopter.png"} alt="logo" className="h-8 w-auto" />
            <h1 className="text-xl font-bold text-white">resQnow</h1>
            </div>
        </Link>

        {/* Toggle Button (Visible on xl and below) */}
        <button 
          className="xl:hidden text-white border p-2 rounded-md"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        {/* Navigation Links (Hidden on smaller screens when collapsed) */}
        <ul className={`absolute xl:static bg-black xl:bg-transparent top-16 left-0 w-full xl:w-auto xl:flex text-white items-center xl:gap-10 px-6 xl:px-0 transition-all duration-300 ${isOpen ? "block" : "hidden"}`}>
          <Link to="/" className="navigator"><li className="py-2 xl:py-0 hover:text-gray-300">HOME</li></Link>
          <Link to="/emergency-contacts" className="navigator"><li className="py-2 xl:py-0 hover:text-gray-300">EMERGENCY CONTACTS</li></Link>
          <Link to="/" className="navigator"><li className="py-2 xl:py-0 hover:text-gray-300">LIVE ALERTS</li></Link>
          <Link to="/donor-login" className="navigator"><li className="py-2 xl:py-0 hover:text-gray-300">DONATE & HELP</li></Link>
          <Link to="/about-us" className="navigator"><li className="py-2 xl:py-0 hover:text-gray-300">ABOUT US</li></Link>

          {/* Buttons (Only inside dropdown on small screens) */}
          <div className="block xl:hidden mt-4 space-y-2">
            <Link to="/login">
              <button className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
                Signup / Login
              </button>
            </Link>
            <button className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
              Report SOS
            </button>
          </div>
        </ul>

        {/* Buttons Section (Visible on larger screens) */}
        <div className="hidden xl:flex items-center space-x-4">
          <Link to="/login">
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer">
              Signup / Login
            </button>
          </Link>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer">
            Report SOS
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
