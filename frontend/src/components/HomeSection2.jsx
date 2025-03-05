import React, { useState } from 'react';
import { Sun, CloudRain, Thermometer, MapPin } from 'lucide-react';
import WeatherCard from './WeatherCard';

function HomeSection2() {
  const [activeTab, setActiveTab] = useState('map');

  const items = [
    { name: 'Item 1', location: 'Location 1' },
    { name: 'Item 2', location: 'Location 2' },
    { name: 'Item 3', location: 'Location 3' },
    { name: 'Item 4', location: 'Location 4' },
    { name: 'Item 5', location: 'Location 5' },
  ];

  const handleViewOnMap = (location) => {
    alert(`Viewing ${location} on the map.`);
    // Implement map navigation logic here
  };

  return (
    <div className="flex w-full bg-[#112221] pt-4 max-h-[950px]">
      <div className="flex flex-col space-x-4 w-full xl:flex-row" style={{ height: '900px' }}>
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
            <iframe
              id="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.384199692296!2d77.2167203750056!3d28.63280777351663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce43c2bafb6b9%3A0x632e26f5d0f52b98!2sIndia%20Gate!5e0!3m2!1sen!2sin!4v1698759235406!5m2!1sen!2sin"
              width="100%"
              height="740px"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          ) : (
            <div className="max-h-185 overflow-y-auto space-y-4">
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

        {/* Weather Report Card */}
        <div className="w-full xl:w-1/4 text-white shadow-md rounded-lg">
          <WeatherCard />
        </div>
      </div>
    </div>
  );
}

export default HomeSection2;