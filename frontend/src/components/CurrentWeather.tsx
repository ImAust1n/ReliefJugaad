import React from 'react';
import { format } from 'date-fns';
import { Droplets, Wind, Thermometer, MapPin } from 'lucide-react';
import { CurrentWeather as CurrentWeatherType } from '../types/weather';
import WeatherIcon from './WeatherIcon';

interface CurrentWeatherProps {
  data: CurrentWeatherType;
  cityName: string;
  country?: string;
  compact?: boolean;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ 
  data, 
  cityName, 
  country,
  compact = false 
}) => {
  const { temp, feels_like, humidity, wind_speed, weather } = data;
  const weatherDescription = weather[0]?.description || 'Unknown';
  const iconCode = weather[0]?.icon || '01d';
  
  if (compact) {
    return (
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg p-3 text-white">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center">
              <h2 className="text-base font-bold">{cityName}{country ? `, ${country}` : ''}</h2>
            </div>
            <p className="text-xs opacity-90">{format(new Date(), 'EEE, MMM do')}</p>
            
            <div className="mt-1">
              <p className="text-2xl font-bold">{Math.round(temp)}°C</p>
              <p className="text-xs capitalize">{weatherDescription}</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <WeatherIcon iconCode={iconCode} size={40} className="mb-1" />
          </div>
        </div>
        
        <div className="mt-2 grid grid-cols-3 gap-1 text-xs">
          <div className="flex items-center">
            <Thermometer size={12} className="mr-1" />
            <div>
              <p className="opacity-80">Feels</p>
              <p className="font-semibold">{Math.round(feels_like)}°</p>
            </div>
          </div>
          <div className="flex items-center">
            <Droplets size={12} className="mr-1" />
            <div>
              <p className="opacity-80">Humidity</p>
              <p className="font-semibold">{humidity}%</p>
            </div>
          </div>
          <div className="flex items-center">
            <Wind size={12} className="mr-1" />
            <div>
              <p className="opacity-80">Wind</p>
              <p className="font-semibold">{Math.round(wind_speed)} km/h</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-white shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center">
            <MapPin size={16} className="mr-1" />
            <h2 className="text-3xl font-bold">{cityName}{country ? `, ${country}` : ''}</h2>
          </div>
          <p className="text-sm opacity-90">{format(new Date(), 'EEEE, MMMM do, yyyy')}</p>
          <p className="text-sm opacity-90">{format(new Date(), 'h:mm a')}</p>
          <div className="mt-4">
            <p className="text-5xl font-bold">{Math.round(temp)}°C</p>
            <p className="text-lg capitalize">{weatherDescription}</p>
            <p className="text-sm">Feels like {Math.round(feels_like)}°C</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <WeatherIcon iconCode={iconCode} size={80} className="mb-2" />
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-3 gap-2">
        <div className="flex items-center">
          <Thermometer size={18} className="mr-2" />
          <div>
            <p className="text-xs opacity-80">Feels Like</p>
            <p className="font-semibold">{Math.round(feels_like)}°C</p>
          </div>
        </div>
        <div className="flex items-center">
          <Droplets size={18} className="mr-2" />
          <div>
            <p className="text-xs opacity-80">Humidity</p>
            <p className="font-semibold">{humidity}%</p>
          </div>
        </div>
        <div className="flex items-center">
          <Wind size={18} className="mr-2" />
          <div>
            <p className="text-xs opacity-80">Wind</p>
            <p className="font-semibold">{Math.round(wind_speed)} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;