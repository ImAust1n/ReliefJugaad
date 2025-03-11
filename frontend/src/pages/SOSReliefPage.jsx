import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { AlertTriangle, Users, MapPin, Shield } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useNeedyStore } from '../store/useNeedyStore';


function SOSReliefPage() {
  const { needy, getAllNeedy, closeRequest } = useNeedyStore();
  const [error, setError] = useState(null);

  function handleCloseRequest(id) {
    console.log("Closing request for location:", id);
    closeRequest(id);
  }

  useEffect(() => {
    getAllNeedy()
      .catch(err => {
        console.error("Failed to fetch needy data:", err);
        setError(err.message || "Failed to fetch data");
      });
  }, []);

  const [rescueLocations, setRescueLocations] = useState([]);

  useEffect(() => {
    // Transform needy data to RescueLocation format
    if (Array.isArray(needy)) {
      const data = needy.map((item) => ({
        id: item._id,
        lat: item.latitude,
        lng: item.longitude,
      }));
      setRescueLocations(data);
    }
  }, [needy]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#000F0B] text-[#F0F2F0]">
      <header className="bg-[#112221] border-b-2 border-red-600 p-6">
        <div className="container mx-auto">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-red-500 animate-pulse" size={32} />
            <h1 className="text-[#00E8CF] text-3xl font-bold">
              India Emergency Response Map
            </h1>
          </div>
          <p className="mt-2 text-[#F0F2F0] opacity-80 flex items-center gap-2">
            <Shield className="text-red-500" size={16} />
            Active disaster zones requiring immediate assistance
          </p>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-[#112221] rounded-lg p-4 h-[600px] border border-red-900/30">
              <MapContainer
                center={[20.5937, 78.9629]}
                zoom={4.3}
                style={{ height: "100%", width: "100%" }}
                className="rounded-lg"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {rescueLocations.map((location) => (
                  <Marker
                    key={location.id}
                    position={[location.lat, location.lng]}
                  >
                    <Popup>
                      <div className="p-2">
                        <div className="flex items-center gap-2 mt-2 text-[#054938]">
                          <MapPin size={16} />
                          <span>{location.lat}, {location.lng}</span>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-[#112221] rounded-lg p-6 border border-red-900/30">
              <h2 className="text-xl font-semibold text-[#00E8CF] flex items-center gap-2">
                <AlertTriangle className="text-red-500" />
                Active Disasters
              </h2>
              <p className="mt-2 text-[#F0F2F0] opacity-80">
                {rescueLocations.length} critical situations reported
              </p>
            </div>

            {rescueLocations.map((location, index) => (
              <div key={location.id} className="bg-[#112221] rounded-lg p-6 hover:bg-[#054938] transition-colors border border-red-900/30">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold text-[#00E8CF]">User {index + 1}</h2>
                  </div>
                  <div className="mt-4 text-sm text-[#3FEBD0] flex items-center gap-2">
                    <MapPin size={14} />
                    <span>{location.lat}, {location.lng}</span>
                  </div>
                  </div>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    onClick={() => {
                      handleCloseRequest(location.id);
                      console.log("Close request for location:", location);
                    }}
                  >
                    Close Request
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default SOSReliefPage;
