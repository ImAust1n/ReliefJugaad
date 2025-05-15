
import { useState, useEffect } from 'react';
import AlertSound from './AlertSound';

import React from 'react';

interface EmergencyAlertProps {
  onClose: () => void;
}

const EmergencyAlert = ({ onClose }: EmergencyAlertProps) => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    // Auto-dismiss after 5 seconds
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 500); // Allow time for animation
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  if (!visible) return null;
  
  return (
    <div className="fixed inset-0 bg-emergency-forest flex flex-col items-center justify-center z-50 animate-pulse-alert transition-opacity duration-500">
      <AlertSound />
      <div className="text-emergency-white text-center p-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-blink">EMERGENCY ALERT</h1>
        <p className="text-xl md:text-3xl mb-8">Disaster Response System Activated</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <div className="h-4 w-32 bg-emergency-caribbean rounded-full animate-pulse"></div>
          <div className="h-4 w-32 bg-emergency-mint rounded-full animate-pulse delay-150"></div>
          <div className="h-4 w-32 bg-emergency-green rounded-full animate-pulse delay-300"></div>
        </div>
        <button 
          onClick={onClose}
          className="mt-10 px-6 py-2 bg-emergency-surface hover:bg-emergency-basil text-emergency-white rounded-lg transition-colors border border-emergency-caribbean"
        >
          Enter System
        </button>
      </div>
    </div>
  );
};

export default EmergencyAlert;
