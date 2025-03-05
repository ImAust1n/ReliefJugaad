import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 h-68">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              resQnow
            </h3>
            <p className="text-sm mt-2">
              &copy; {new Date().getFullYear()} resQnow All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-purple-400 transition" style={{color: 'white', textDecoration: 'none'}}>Privacy Policy</a>
            <a href="#" className="hover:text-purple-400 transition" style={{color: 'white', textDecoration: 'none'}}>Terms of Service</a>
            <a href="#" className="hover:text-purple-400 transition" style={{color: 'white', textDecoration: 'none'}}>Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;