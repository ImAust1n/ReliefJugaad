
import React from 'react';
import { useState, useEffect } from 'react';

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <header className="bg-emergency-forest text-emergency-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="h-8 w-8 bg-emergency-green rounded-full mr-3 animate-pulse-alert"></div>
          <h1 className="text-2xl font-bold">Disaster Emergency Action Plan Generator</h1>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-emergency-mint font-medium">
            {currentTime.toLocaleTimeString()}
          </span>
          <span className="text-sm text-emergency-white opacity-70">
            System Ready | Alert Level: Active
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
