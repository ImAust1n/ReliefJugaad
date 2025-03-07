import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore"
import { useNGOStore } from "../store/useNGOStore"
import { useGOVStore } from "../store/useGOVStore"
import { AlignJustify } from "lucide-react"
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { authUser, logout } = useAuthStore();
  const { authNGO, logout: logoutNGO } = useNGOStore();
  const { authGOV, logout: logoutGOV } = useGOVStore();
  return (
    <header className="w-full bg-black shadow-lg fixed top-0 z-40 backdrop-blur-lg">
      <nav className="w-full flex items-center justify-between py-3 px-6">
        {/* Logo Section */}
        <Link to="/" className="navigator" onClick={() => setIsOpen(false)}>
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
          <AlignJustify />
        </button>

        {/* Navigation Links (Hidden on smaller screens when collapsed) */}
        <ul className={`absolute xl:static bg-black xl:bg-transparent top-16 left-0 w-full xl:w-auto xl:flex text-white items-center xl:gap-10 px-6 xl:px-0 transition-all duration-300 ${isOpen ? "block" : "hidden"}`} onClick={() => setIsOpen(false)}>
          <Link to="/" className="navigator"><li className="py-2 xl:py-0 hover:text-gray-300">HOME</li></Link>
          <Link to="/emergency-contacts" className="navigator"><li className="py-2 xl:py-0 hover:text-gray-300" style={{color: 'white', textDecoration: 'none'}}>EMERGENCY CONTACTS</li></Link>
          <Link to="/donor-login" className="navigator"><li className="py-2 xl:py-0 hover:text-gray-300">DONATE & HELP</li></Link>
          <Link to="/about-us" className="navigator"><li className="py-2 xl:py-0 hover:text-gray-300">ABOUT US</li></Link>
          {authNGO && <Link to="/ngo" className="navigator"><li className="py-2 xl:py-0 hover:text-gray-300">NGO HOMEPAGE</li></Link>}
          {authGOV && <Link to="/gov" className="navigator"><li className="py-2 xl:py-0 hover:text-gray-300">GOV HOMEPAGE</li></Link>}

          {/* Buttons (Only inside dropdown on small screens) */}
          <div className="block xl:hidden mt-4 space-y-2">
            {!(authUser || authNGO || authGOV) && <Link to="/login">
              <button className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
                Signup / Login
              </button>
            </Link>}
            {(authUser || authNGO || authGOV) &&
              <button onClick={logout} className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
                Logout
              </button>}
            <button className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
              Report SOS
            </button>
          </div>
        </ul>

        {/* Buttons Section (Visible on larger screens) */}
        <div className="hidden xl:flex items-center space-x-4">
            {!(authUser || authNGO || authGOV) && <Link to="/login">
              <button className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
                Login / Signup
              </button>
            </Link>}
            {(authUser || authNGO || authGOV) &&
              <Link>
              <button onClick={() => {
                logout(); logoutNGO(); logoutGOV();
              }} className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
                Logout
              </button>
              </Link>}
          <Link>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer">
            Report SOS
          </button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
