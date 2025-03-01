import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div>
      <header className="w-full backdrop-blur-md bg-black shadow-lg fixed">
        <nav className="header-nav w-full flex items-center justify-between py-2 px-4">
        <div className="flex items-center space-x-1 cursor-pointer">
          <img src={"/helicopterhelicopter.png"} alt="logo" className="h-8 w-auto" /> 
          <h1 className="text-xl font-bold text-white">resQnow</h1>
        </div>
          <ul className="hidden lg:flex text-white items-center lg:gap-10">
            <Link to="/" className="navigator"><li className="hover:text-gray-300">HOME</li></Link>
            
            {/* <li className="hover:text-gray-300"><a href="#">NGOs</a></li>
            <li className="hover:text-gray-300"><a href="#">GOVERNMENT / NDMA</a></li> */}
            
            <Link to="/emergency-contacts" className="navigator"><li className="hover:text-gray-300">EMERGENCY CONTACTS</li></Link>
            <Link to="/" className="navigator"><li className="hover:text-gray-300">LIVE ALERTS</li></Link>
            <Link to="/donor-login" className="navigator"><li className="hover:text-gray-300">DONATE & HELP</li></Link>
            <Link to="/about-us" className="navigator"><li className="hover:text-gray-300">ABOUT US</li></Link>
          </ul>
          <div className="flex items-center space-x-4">
          <Link to="/login"><button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer">Signup / Login</button></Link>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer">Report SOS</button>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Header
  
