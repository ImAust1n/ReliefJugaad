import React from 'react'

const Header = () => {
  return (
    <div>
      <header className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/10 shadow-lg z-50">
        <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        <div>
          <img src={"/helicopterhelicopter.png"} alt="logo" className="h-8 w-auto" /> {/* Adjusted size of the logo */}
          <h1 className="text-xl font-bold text-white">resQnow</h1>
        </div>
          <ul className="hidden md:flex space-x-6 text-white">
            <li className="hover:text-gray-300"><a href="#">Home</a></li>
            <li className="hover:text-gray-300"><a href="#">Disasters</a></li>
            <li className="hover:text-gray-300"><a href="#">NGOs</a></li>
            <li className="hover:text-gray-300"><a href="#">Government</a></li>
          </ul>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Report SOS</button>
        </nav>
      </header>
    </div>
  )
}

export default Header
  
