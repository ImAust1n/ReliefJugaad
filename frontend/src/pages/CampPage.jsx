import React, { useState } from 'react';
import { MapPin, Navigation, Phone, Users, Plus } from 'lucide-react';
import Map from '../components/Map2';
import { generateNearbyCamps } from '../utils/generateCamps';
import { useNGOStore } from '../store/useNGOStore';
import { useGOVStore } from '../store/useGOVStore';

function CampPage() {
  const [userLocation, setUserLocation] = useState({ lat: 17.8103, lng: 80.4125 });
  const [camps, setCamps] = useState(generateNearbyCamps(userLocation.lat, userLocation.lng, 6, 3));
  const { authNGO } = useNGOStore();
  const { authGOV } = useGOVStore();

  const addNewCamp = () => {
    // Generate a random offset between -0.1 and 0.1 degrees for both lat and lng
    const latOffset = (Math.random() - 0.5) * 0.2;
    const lngOffset = (Math.random() - 0.5) * 0.2;
    
    // Ensure this new location is different from all existing camps
    let newLat = userLocation.lat + latOffset;
    let newLng = userLocation.lng + lngOffset;
    
    // Check if this location already exists and adjust if needed
    while (camps.some(camp => 
      Math.abs(camp.location.lat - newLat) < 0.01 && 
      Math.abs(camp.location.lng - newLng) < 0.01)) {
      newLat = userLocation.lat + (Math.random() - 0.5) * 0.2;
      newLng = userLocation.lng + (Math.random() - 0.5) * 0.2;
    }
    
    const newCamp = {
      id: camps.length + 1,
      name: `New Relief Camp ${camps.length + 1}`,
      location: { lat: newLat, lng: newLng },
      capacity: Math.floor(Math.random() * 500) + 200,
      contact: `+880 ${Math.floor(1000000000 + Math.random() * 9000000000)}`
    };
    setCamps([...camps, newCamp]);
  };

  return (
    <div className="min-h-screen bg-[#000F0B] pt-20">
      <header className="bg-[#112221] py-6 px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MapPin className="text-[#00E8CF]" size={32} />
            <h1 className="text-[#00E8CF] text-2xl font-bold">Relief Camp Locator</h1>
          </div>
          <button
            onClick={() => {
              toast.success("Offline map downloaded successfully");
              // In a real app, this would trigger the actual map download
              console.log("Downloading offline map...");
            }}
            className="bg-[#054938] hover:bg-[#076050] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors mr-4"
          >
            <MapPin size={20} />
            Download Offline Map
          </button>
          {(authNGO || authGOV) && <button
            onClick={addNewCamp}
            className="bg-[#00BC4C] hover:bg-[#22C55E] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Add Relief Camp
          </button>}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {camps.map((camp) => (
                <div key={camp.id} className="bg-[#112221] rounded-xl shadow-xl overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-[#00E8CF] text-xl font-bold mb-4">{camp.name}</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[#F0F2F0]">
                        <Users size={20} className="text-[#00BC4C]" />
                        <span>Capacity: {camp.capacity} people</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#F0F2F0]">
                        <Phone size={20} className="text-[#00BC4C]" />
                        <span>{camp.contact}</span>
                      </div>
                    </div>
                    <a
                      href={`https://www.google.com/maps?q=${
                        camp.location.lat
                      },${
                        camp.location.lng
                      }&ll=20.5937,78.9629&z=5`}
                      className="mt-6 w-full bg-[#00BC4C] hover:bg-[#22C55E] text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <Navigation size={20} />
                      Track Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
            
      </main>
    </div>
  );
}

export default CampPage
