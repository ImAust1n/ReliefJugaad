import React from 'react';
import { Users } from 'lucide-react';

const Teams = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-caribbean-green">Response Teams</h1>
      <div className="bg-dark-green rounded-lg p-6">
        <div className="flex items-center space-x-4 mb-6">
          <Users className="text-bangladesh-green" size={24} />
          <h2 className="text-xl font-semibold">Active Teams</h2>
        </div>
        <div className="space-y-4">
          {/* Teams content will go here */}
          <p className="text-anti-flash-white">Team management system ready for implementation</p>
        </div>
      </div>
    </div>
  );
};

export default Teams;