import React, { useRef, useState } from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DailyWeather } from '../types/weather';
import WeatherIcon from './WeatherIcon';

interface DailyForecastProps {
  data: DailyWeather[];
  compact?: boolean;
}

const DailyForecast: React.FC<DailyForecastProps> = ({ data, compact = false }) => {
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
          <h3 className="text-xs font-bold text-gray-800">7-Day Forecast</h3>
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
          className="space-y-1 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {data.map((day, index) => {
            const date = new Date(day.dt * 1000);
            const dayName = index === 0 ? 'Today' : format(date, 'EEE');
            const iconCode = day.weather[0]?.icon || '01d';
            
            return (
              <div key={day.dt} className="flex items-center justify-between text-xs">
                <p className="text-gray-700 w-10">{dayName}</p>
                <div className="flex items-center">
                  <WeatherIcon iconCode={iconCode} size={16} className="mx-1" />
                </div>
                <div className="flex space-x-2 w-14 justify-end">
                  <span className="text-gray-900 font-medium">{Math.round(day.temp.max)}°</span>
                  <span className="text-gray-500">{Math.round(day.temp.min)}°</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">7-Day Forecast</h3>
      <div className="space-y-3">
        {data.map((day, index) => {
          const date = new Date(day.dt * 1000);
          const dayName = index === 0 ? 'Today' : format(date, 'EEEE');
          const iconCode = day.weather[0]?.icon || '01d';
          
          return (
            <div key={day.dt} className="flex items-center justify-between">
              <p className="text-gray-700 w-24">{dayName}</p>
              <div className="flex items-center">
                <WeatherIcon iconCode={iconCode} size={24} className="mr-2" />
                <span className="text-gray-600 text-sm capitalize">{day.weather[0]?.description}</span>
              </div>
              <div className="flex space-x-2">
                <span className="text-gray-900 font-medium">{Math.round(day.temp.max)}°</span>
                <span className="text-gray-500">{Math.round(day.temp.min)}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyForecast;