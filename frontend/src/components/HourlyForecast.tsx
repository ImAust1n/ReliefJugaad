import React, { useRef, useState } from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HourlyWeather } from '../types/weather';
import WeatherIcon from './WeatherIcon';

interface HourlyForecastProps {
  data: HourlyWeather[];
  compact?: boolean;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ data, compact = false }) => {
  // Only show the next 24 hours
  const next24Hours = data.slice(0, 24);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -100 : 100;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setScrollPosition(scrollRef.current.scrollLeft + scrollAmount);
    }
  };
  
  if (compact) {
    return (
      <div className="bg-white rounded-lg p-3 shadow border border-gray-100">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xs font-bold text-gray-800">Hourly Forecast</h3>
          <div className="flex space-x-1">
            <button 
              onClick={() => scroll('left')}
              className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
            >
              <ChevronLeft size={12} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
            >
              <ChevronRight size={12} />
            </button>
          </div>
        </div>
        <div 
          ref={scrollRef}
          className="flex space-x-3 overflow-x-auto pb-1 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {next24Hours.map((hour, index) => {
            const date = new Date(hour.dt * 1000);
            const time = format(date, 'h a');
            const iconCode = hour.weather[0]?.icon || '01d';
            
            return (
              <div key={hour.dt} className="flex flex-col items-center min-w-[40px]">
                <p className="text-gray-700 text-[10px]">{index === 0 ? 'Now' : time}</p>
                <WeatherIcon iconCode={iconCode} size={16} className="my-1" />
                <p className="text-gray-900 text-xs font-medium">{Math.round(hour.temp)}°</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg overflow-x-auto">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Hourly Forecast</h3>
      <div className="flex space-x-6 pb-2">
        {next24Hours.map((hour, index) => {
          const date = new Date(hour.dt * 1000);
          const time = format(date, 'h a');
          const iconCode = hour.weather[0]?.icon || '01d';
          
          return (
            <div key={hour.dt} className="flex flex-col items-center min-w-[60px]">
              <p className="text-gray-700 text-sm">{index === 0 ? 'Now' : time}</p>
              <WeatherIcon iconCode={iconCode} size={28} className="my-2" />
              <p className="text-gray-900 font-medium">{Math.round(hour.temp)}°</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;