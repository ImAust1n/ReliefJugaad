import React, { useState } from 'react';
import { FaExclamationTriangle, FaMapMarkedAlt, FaList } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const DISASTER_TYPES = [
  'Flood',
  'Earthquake',
  'Fire',
  'Hurricane',
  'Landslide',
  'Drought',
  'Other'
];

const URGENCY_LEVELS = [
  { value: 'low', label: 'Low', color: 'bg-yellow-500' },
  { value: 'medium', label: 'Medium', color: 'bg-orange-500' },
  { value: 'high', label: 'High', color: 'bg-red-500' },
  { value: 'critical', label: 'Critical', color: 'bg-red-700' }
];

export default function DisasterReporting() {
  const [reports, setReports] = useState([]);
  const [activeTab, setActiveTab] = useState('map'); // Add activeTab state
  const [formData, setFormData] = useState({
    type: '',
    location: '',
    urgencyLevel: '',
    description: '',
    resourcesNeeded: ''
  });

    //Dummy data and function for the list
    const items = [
    { name: 'Report 1', location: 'Location 1' },
    { name: 'Report 2', location: 'Location 2' },
    { name: 'Report 3', location: 'Location 3' }
  ];

  const handleViewOnMap = (location) => {
    alert(`Viewing ${location} on the map.`);
    // Implement map navigation logic here
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReport = {
      id: Date.now(),
      ...formData,
      timestamp: new Date().toISOString(),
      coordinates: [51.505 + Math.random() * 0.1, -0.09 + Math.random() * 0.1] // Example coordinates
    };
    setReports([...reports, newReport]);
    setFormData({
      type: '',
      location: '',
      urgencyLevel: '',
      description: '',
      resourcesNeeded: ''
    });
  };

  return (
    <section className="py-16 bg-[#054938]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="animate-fade-in">
          <h2 className="text-3xl font-bold text-center mb-12">
            Disaster Reporting & Emergency Response
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-[#000F0B] p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
                <FaExclamationTriangle className="text-red-500" />
                Report a Disaster
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Disaster Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full rounded-lg h-12 border-gray-300 text-gray-300 shadow-sm border-2 border-light-green ring-primary"
                    required
                  >
                    <option value="">Select type</option>
                    {DISASTER_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Location
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Enter location"
                      className="flex-1 rounded-lg h-12 border-gray-300 text-gray-300 shadow-sm border-2 focus:border-primary focus:ring-primary"
                      required
                    />
                    <button
                      type="button"
                      className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
                      onClick={() => {/* Auto-detect location */}}
                    >
                      <FaMapMarkedAlt />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Urgency Level
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {URGENCY_LEVELS.map(level => (
                      <button
                        key={level.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, urgencyLevel: level.value })}
                        className={`p-2 rounded-lg border text-white ${
                          formData.urgencyLevel === level.value
                            ? `${level.color}`
                            : 'border-gray-300 hover:border-primary'
                        }`}
                      >
                        {level.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full rounded-lg border-gray-300 text-gray-300 shadow-sm border-2 focus:border-primary focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Resources Needed
                  </label>
                  <textarea
                    value={formData.resourcesNeeded}
                    onChange={(e) => setFormData({ ...formData, resourcesNeeded: e.target.value })}
                    rows={2}
                    className="w-full rounded-lg border-gray-300 text-gray-300 shadow-sm border-2 focus:border-primary focus:ring-primary"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Submit Report
                </button>
              </form>
            </div>

            
            <div className="w-full bg-[#112221] py-5 px-4 shadow-md rounded-lg border-2 ml-0 xl:ml-4 pb-4 border-white">
          {/* Tabs */}
          <div className="flex justify-center border-b border-gray-300 mb-4 space-x-4">
            <button
              className={`px-4 py-2 ${activeTab === 'map' ? 'border-b-2 border-blue-500 text-[#22C55E]' : 'text-white'}`}
              onClick={() => setActiveTab('map')}
            >
              Map
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'list' ? 'border-b-2 border-blue-500 text-[#22C55E]' : 'text-white'}`}
              onClick={() => setActiveTab('list')}
            >
              List
            </button>
          </div>

          {/* Map or List Content */}
          {activeTab === 'map' ? (
            <iframe
              id="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.384199692296!2d77.2167203750056!3d28.63280777351663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce43c2bafb6b9%3A0x632e26f5d0f52b98!2sIndia%20Gate!5e0!3m2!1sen!2sin!4v1698759235406!5m2!1sen!2sin"
              width="100%"
              height="510px"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          ) : (
            <div className="max-h-127.5 overflow-y-auto space-y-4">
              {items.map((item, index) => (
                <div key={index} className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">{item.location}</p>
                  <button
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleViewOnMap(item.location)}
                  >
                    View on Map
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
            

          </div>
        </div>
      </div>
    </section>
  );
}