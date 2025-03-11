import React from 'react';
import { AlertTriangle } from 'lucide-react';

const Alerts = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-caribbean-green">Disaster Alerts</h1>
      <div className="bg-dark-green rounded-lg p-6">
        <div className="flex items-center space-x-4 mb-6">
          <AlertTriangle className="text-bangladesh-green" size={24} />
          <h2 className="text-xl font-semibold">Active Alerts</h2>
        </div>
        <div className="space-y-4">
          {/* Alert content will go here */}
          <p className="text-anti-flash-white">Alert system ready for implementation</p>
        </div>
      </div>
    </div>
  );
};

export default Alerts;