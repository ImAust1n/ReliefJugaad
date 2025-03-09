import React, { useEffect, useState } from 'react';
import { Sun, CloudRain, Thermometer, MapPin } from 'lucide-react';
import WeatherCard from './WeatherCard';
import { statesMap } from '../lib/utils.js';
import { useDisasterStore } from '../store/useDisasterStore';
import { useGOVStore } from '../store/useGOVStore';
import Map from './Map.jsx';

function HomeSection2() {
  const [activeTab, setActiveTab] = useState('map');
  const { disasters, closeDisaster, getAllDisasters } = useDisasterStore();
  const { authGOV } = useGOVStore();

  const items = disasters;

  const handleViewOnMap = (location) => {
    alert(`Viewing ${location} on the map.`);
    // Implement map navigation logic here
  };

  useEffect(() => {
    getAllDisasters();
  }, [getAllDisasters, disasters]);

  return (
    <div className="w-full bg-[#112221] pt-10">
      <div className="flex flex-col space-x-4 w-full xl:flex-row" style={{ height: '550px' }}>
        {/* Map or List Container with Tabs */}
        <div className="w-full xl:w-3/4 bg-[#112221] py-5 px-4 shadow-md rounded-lg border-2 ml-0 xl:ml-4 pb-4 border-white">
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
            <Map height="450px" />
          ) : (
            <div className="max-h-112.5 overflow-y-auto space-y-4">
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

        {/* Weather Report Card */}
        <div className="w-full h-[550px] xl:w-1/4 text-white shadow-md rounded-l-2xl">
          <WeatherCard />
        </div>
      </div>
    </div>
  );
}

export default HomeSection2;