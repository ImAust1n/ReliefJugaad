import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { WeatherData, CurrentWeatherResponse } from '../types/weather';
import { 
  getCurrentWeather, 
  getCurrentWeatherByCoords, 
  convertCurrentWeatherResponse, 
  getMockWeatherData 
} from '../services/weatherService';
import CurrentWeather from './CurrentWeather';
import HourlyForecast from './HourlyForecast';
import DailyForecast from './DailyForecast';
import SearchBar from './SearchBar';

const WeatherCard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [currentWeatherData, setCurrentWeatherData] = useState<any | null>(null);
  const [cityName, setCityName] = useState('karnataka');
  const [country, setCountry] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.log("Location error:", error.message);
        }
      );
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let currentData: CurrentWeatherResponse;
        
        if (coordinates) {
          // Fetch by coordinates
          currentData = await getCurrentWeatherByCoords(coordinates.lat, coordinates.lon);
        } else {
          // Fetch by city name
          currentData = await getCurrentWeather(cityName);
        }
        
        const { current, cityName: fetchedCity, country: fetchedCountry } = convertCurrentWeatherResponse(currentData);
        
        setCityName(fetchedCity);
        setCountry(fetchedCountry);
        setCurrentWeatherData(current);
    
        const mockData = getMockWeatherData();
        setWeatherData({
          ...mockData,
          current: current,
          lat: currentData.coord.lat,
          lon: currentData.coord.lon
        });
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch weather data. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, [cityName, coordinates]);

  const handleSearch = (city: string) => {
    setCityName(city);
    setCoordinates(null); 
  };

  if (loading) {
    return (
      <div className="w-full h-[600px] rounded-xl shadow-lg overflow-hidden">
        <div className="p-4">
          <div className="flex items-center mb-4">
            <MapPin size={18} className="text-blue-500 mr-2" />
            <h1 className="text-lg font-bold text-gray-800">Weather</h1>
          </div>
          <div className="animate-pulse space-y-3">
            <div className="bg-gray-200 h-32 rounded-lg"></div>
            <div className="bg-gray-200 h-16 rounded-lg"></div>
            <div className="bg-gray-200 h-16 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !weatherData || !currentWeatherData) {
    return (
      <div className="w-[300px] h-[550px] bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4">
          <div className="flex items-center mb-4">
            <MapPin size={18} className="text-blue-500 mr-2" />
            <h1 className="text-lg font-bold text-gray-800">Weather</h1>
          </div>
          <SearchBar onSearch={handleSearch} />
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded-lg text-sm">
            <p>{error || 'Something went wrong. Please try again.'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[550px] bg-black rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <MapPin size={18} className="text-blue-500 mr-1" />
            <h1 className="text-lg font-bold text-gray-800">Weather</h1>
          </div>
          <button 
            onClick={() => setCoordinates(null)} 
            className="text-xs text-blue-500 hover:underline"
          >
            Change Location
          </button>
        </div>
        
        {!coordinates && <SearchBar onSearch={handleSearch} />}
        
        <div className="flex-grow overflow-hidden flex flex-col space-y-3 h-full text-black">
          <CurrentWeather 
            data={currentWeatherData} 
            cityName={cityName} 
            country={country} 
            compact={true}
          />
          <HourlyForecast data={weatherData.hourly} compact={true} />
          <DailyForecast data={weatherData.daily} compact={true} />
        </div>
        
      </div>
    </div>
  );
};

export default WeatherCard;