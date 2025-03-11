import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import { MapPin, Navigation } from 'lucide-react';
import { ReliefCamp } from '../types/types';
import { generateNearbyCamps } from '../utils/generateCamps';
import React from 'react';

const mapContainerStyle = {
  width: '100%',
  height: '70vh',
};

const center = {
  lat: 23.8103,
  lng: 90.4125,
};

export default function Map() {
  const [selectedCamp, setSelectedCamp] = useState<ReliefCamp | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [reliefCamps, setReliefCamps] = useState<ReliefCamp[]>([]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  });

  const getCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(newLocation);
          
          // Generate new camps around the user's location
          const newCamps = generateNearbyCamps(newLocation.lat, newLocation.lng, 6, 3);
          setReliefCamps(newCamps);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Error getting your location. Please try again.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
    }
  }, []);

  const openInGoogleMaps = useCallback((camp: ReliefCamp) => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${camp.location.lat},${camp.location.lng}`;
      window.open(url, '_blank');
    } else {
      alert('Please enable location first');
    }
  }, [userLocation]);

  // Calculate distance between two points in kilometers
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <div className="relative">
      <button
        onClick={getCurrentLocation}
        className="absolute top-4 right-4 z-10 bg-[#00BC4C] hover:bg-[#22C55E] text-white px-4 py-2 rounded-lg flex items-center gap-2"
      >
        <Navigation size={20} />
        Get My Location
      </button>
      
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={userLocation || center}
        options={{
          styles: [
            {
              featureType: 'all',
              elementType: 'geometry',
              stylers: [{ color: '#112221' }]
            },
            {
              featureType: 'all',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#F0F2F0' }]
            }
          ]
        }}
      >
        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              url: 'data:image/svg+xml,' + encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00E8CF" width="24" height="24">
                  <circle cx="12" cy="12" r="8"/>
                </svg>
              `),
              scaledSize: new window.google.maps.Size(16, 16),
            }}
          />
        )}

        {reliefCamps.map((camp) => (
          <Marker
            key={camp.id}
            position={camp.location}
            onClick={() => setSelectedCamp(camp)}
            icon={{
              url: 'data:image/svg+xml,' + encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#22C55E" width="36" height="36">
                  <path d="M12 0C7.6 0 4 3.6 4 8c0 7 8 16 8 16s8-9 8-16c0-4.4-3.6-8-8-8zm0 12c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/>
                </svg>
              `),
              scaledSize: new window.google.maps.Size(32, 32),
            }}
          />
        ))}

        {selectedCamp && userLocation && (
          <InfoWindow
            position={selectedCamp.location}
            onCloseClick={() => setSelectedCamp(null)}
          >
            <div className="bg-[#000F0B] text-[#F0F2F0] p-4 rounded-lg max-w-xs">
              <h3 className="text-[#00E8CF] font-bold text-lg mb-2">{selectedCamp.name}</h3>
              <p className="mb-2">Capacity: {selectedCamp.capacity} people</p>
              <p className="mb-2">Contact: {selectedCamp.contact}</p>
              <p className="mb-4">Distance: {calculateDistance(
                userLocation.lat,
                userLocation.lng,
                selectedCamp.location.lat,
                selectedCamp.location.lng
              ).toFixed(1)} km</p>
              <button
                onClick={() => openInGoogleMaps(selectedCamp)}
                className="bg-[#00BC4C] hover:bg-[#22C55E] text-white px-4 py-2 rounded-lg w-full flex items-center justify-center gap-2"
              >
                <MapPin size={16} />
                Navigate
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}