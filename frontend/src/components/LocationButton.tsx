import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

interface LocationButtonProps {
  onLocationFound: (lat: number, lon: number) => void;
}

const LocationButton: React.FC<LocationButtonProps> = ({ onLocationFound }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onLocationFound(latitude, longitude);
        setLoading(false);
      },
      (err) => {
        console.error('Error getting location:', err);
        setError(
          err.code === 1
            ? 'Location access denied. Please allow location access and try again.'
            : 'Unable to get your location. Please try again.'
        );
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div className="mb-4">
      <button
        onClick={handleGetLocation}
        disabled={loading}
        className="flex items-center justify-center w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Getting location...
          </span>
        ) : (
          <>
            <MapPin size={18} className="mr-2" />
            Use My Location
          </>
        )}
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default LocationButton;