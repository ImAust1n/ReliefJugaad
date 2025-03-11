import React from 'react';
import { AlertTriangle, AlertCircle, Loader } from 'lucide-react';

const Dashboard = () => {
  const recentAlerts = [
    {
      id: 1,
      type: 'Earthquake',
      location: 'Gujarat, India',
      severity: 'High',
      timestamp: '2024-03-15T10:30:00Z',
    },
    {
      id: 2,
      type: 'Flood',
      location: 'Kerala, India',
      severity: 'Medium',
      timestamp: '2024-03-14T15:45:00Z',
    },
    {
      id: 3,
      type: 'Cyclone',
      location: 'Odisha, India',
      severity: 'High',
      timestamp: '2024-03-13T08:20:00Z',
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-caribbean-green">Disaster Response Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-dark-green rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Active Alerts</h2>
            <AlertTriangle className="text-bangladesh-green" />
          </div>
          <p className="text-4xl font-bold text-mountain-meadow">3</p>
        </div>

        <div className="bg-dark-green rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Response Teams</h2>
            <AlertCircle className="text-bangladesh-green" />
          </div>
          <p className="text-4xl font-bold text-mountain-meadow">12</p>
        </div>

        <div className="bg-dark-green rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Resources Deployed</h2>
            <Loader className="text-bangladesh-green" />
          </div>
          <p className="text-4xl font-bold text-mountain-meadow">85%</p>
        </div>
      </div>

      <div className="bg-dark-green rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Alerts</h2>
        <div className="space-y-4">
          {recentAlerts.map((alert) => (
            <div key={alert.id} className="bg-forest p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-caribbean-green">{alert.type}</h3>
                  <p className="text-sm text-anti-flash-white">{alert.location}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded text-sm ${
                    alert.severity === 'High' ? 'bg-red-600' : 'bg-yellow-600'
                  }`}>
                    {alert.severity}
                  </span>
                  <p className="text-sm text-anti-flash-white mt-1">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;