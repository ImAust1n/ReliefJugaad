import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AlertTriangle, Bell, Users, Package } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: AlertTriangle },
    { path: '/alerts', label: 'Alerts', icon: Bell },
    { path: '/resources', label: 'Resources', icon: Package },
    { path: '/teams', label: 'Teams', icon: Users },
  ];

  return (
    <nav className="bg-dark-green p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-caribbean-green text-2xl font-bold">
          Resilient Futures
        </Link>
        <div className="flex space-x-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors
                  ${location.pathname === item.path 
                    ? 'bg-bangladesh-green text-anti-flash-white' 
                    : 'text-mint hover:bg-forest'}`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;