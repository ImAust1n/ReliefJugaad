import React, { useState } from 'react';
import { FaExclamationTriangle, FaMapMarkedAlt, FaList } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useDisasterStore } from '../store/useDisasterStore';
import { statesMap } from '../lib/utils';
import { useGOVStore } from '../store/useGOVStore';
import Map from './Map.jsx';

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
  { value: 'low', label: 'Low', color: 'bg-yellow-500', index: 2 },
  { value: 'medium', label: 'Medium', color: 'bg-orange-500' , index: 3 },
  { value: 'high', label: 'High', color: 'bg-red-500' , index: 4},
  { value: 'critical', label: 'Critical', color: 'bg-red-700' , index: 5 }
];

export default function DisasterReporting() {
  const { authGOV } = useGOVStore();
  const [activeTab, setActiveTab] = useState('map'); // Add activeTab state
  const [formData, setFormData] = useState({
    type: '',
    state: '',
    severity: '',
    description: '',
  });

  const { addDisaster, disasters, closeDisaster } = useDisasterStore();

    //Dummy data and function for the list
    const items = disasters;

  const handleViewOnMap = (location) => {
    // Implement map navigation logic here
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReport = {
      ...formData, // Example coordinates
    };
    addDisaster(newReport);
    setFormData({
      type: '',
      state: '',
      severity: '',
      description: '',
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
                    className="w-full rounded-lg h-12 border-gray-300 text-gray-300 shadow-sm border-2 border-light-green ring-primary bg-gray-900"
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
                    State
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      placeholder="Enter state"
                      className="flex-1 rounded-lg h-12 border-gray-300 text-gray-300 shadow-sm border-2 focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Urgency Level
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {URGENCY_LEVELS.map(level => (
                      <button
                        key={level.index}
                        type="button"
                        onClick={() => setFormData({ ...formData, severity: level.index })}
                        className={`p-2 rounded-lg border text-white ${
                          formData.severity === level.index
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

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
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
              <Map height="400px" />
          ) : (
            <div className="h-104 overflow-y-auto space-y-4">
              {console.log(items)}
              {items.map((item, index) => (
                <div key={index} className="flex justify-between p-4 bg-[#054938] shadow-md rounded-lg border border-gray-200">
                  <div><h3 className="text-lg text-white font-semibold">{item.type}</h3>
                  <p className="text-gray-200">State : {item.state}</p>
                  <p className="text-gray-200">Severity : {item.severity}</p></div>
                  <div className='flex flex-col gap-2'>
                    <a
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    href={`https://www.google.com/maps?q=${
                      statesMap.states.find(state => state.name === item.state)?.latitude
                    },${
                      statesMap.states.find(state => state.name === item.state)?.longitude
                    }&ll=20.5937,78.9629&z=5`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleViewOnMap(item.state)}
                  >
                    View on Map
                  </a>
                  {authGOV && (
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => {
                        closeDisaster(item._id);
                      }}
                    >
                      Close Disaster
                    </button>
                  )}
                  </div>
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