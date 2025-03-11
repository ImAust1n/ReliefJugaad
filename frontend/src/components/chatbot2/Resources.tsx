import React from 'react';
import { Package } from 'lucide-react';

const Resources = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-caribbean-green">Resource Management</h1>
      <div className="bg-dark-green rounded-lg p-6">
        <div className="flex items-center space-x-4 mb-6">
          <Package className="text-bangladesh-green" size={24} />
          <h2 className="text-xl font-semibold">Available Resources</h2>
        </div>
        <div className="space-y-4">
          {/* Resource management content will go here */}
          <p className="text-anti-flash-white">Resource tracking system ready for implementation</p>
        </div>
      </div>
    </div>
  );
};

export default Resources;