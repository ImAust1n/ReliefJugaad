import axios from 'axios';
import { WeatherData, GeocodingData, CurrentWeatherResponse } from '../types/weather';

// OpenWeatherMap API key
const API_KEY = '545f986e4c0c620d081fcbdb9a9012c3';
const BASE_URL = 'https://api.openweathermap.org';

export const getCoordinates = async (city: string): Promise<GeocodingData> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
    );
    
    if (response.data && response.data.length > 0) {
      return response.data[0];
    }
    throw new Error('Location not found');
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    throw error;
  }
};

export const getCurrentWeather = async (city: string): Promise<CurrentWeatherResponse> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

export const getCurrentWeatherByCoords = async (lat: number, lon: number): Promise<CurrentWeatherResponse> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather by coordinates:', error);
    throw error;
  }
};

export const getWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const getCityNameFromCoords = async (lat: number, lon: number): Promise<string> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
    );
    
    if (response.data && response.data.length > 0) {
      return response.data[0].name;
    }
    return 'Unknown Location';
  } catch (error) {
    console.error('Error fetching location name:', error);
    return 'Unknown Location';
  }
};

// For demo purposes, this function returns mock data
export const getMockWeatherData = (): WeatherData => {
  return {
    lat: 51.5074,
    lon: -0.1278,
    timezone: 'Europe/London',
    timezone_offset: 0,
    current: {
      dt: Date.now() / 1000,
      sunrise: Date.now() / 1000 - 21600,
      sunset: Date.now() / 1000 + 21600,
      temp: 15.2,
      feels_like: 14.8,
      pressure: 1012,
      humidity: 76,
      dew_point: 11.1,
      uvi: 4.5,
      clouds: 40,
      visibility: 10000,
      wind_speed: 3.6,
      wind_deg: 250,
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03d'
        }
      ]
    },
    hourly: Array(24).fill(null).map((_, i) => ({
      dt: Date.now() / 1000 + i * 3600,
      temp: 15 + Math.sin(i / 3) * 5,
      feels_like: 14 + Math.sin(i / 3) * 5,
      pressure: 1012,
      humidity: 76,
      dew_point: 11.1,
      uvi: Math.max(0, 5 - Math.abs(i - 12)),
      clouds: 40 + Math.sin(i) * 20,
      visibility: 10000,
      wind_speed: 3.6,
      wind_gust: 5.2,
      wind_deg: 250,
      pop: Math.random() * 0.3,
      weather: [
        {
          id: 802,
          main: i % 3 === 0 ? 'Rain' : i % 4 === 0 ? 'Clear' : 'Clouds',
          description: i % 3 === 0 ? 'light rain' : i % 4 === 0 ? 'clear sky' : 'scattered clouds',
          icon: i % 3 === 0 ? '10d' : i % 4 === 0 ? '01d' : '03d'
        }
      ]
    })),
    daily: Array(7).fill(null).map((_, i) => ({
      dt: Date.now() / 1000 + i * 86400,
      sunrise: Date.now() / 1000 - 21600 + i * 86400,
      sunset: Date.now() / 1000 + 21600 + i * 86400,
      moonrise: Date.now() / 1000 - 10800 + i * 86400,
      moonset: Date.now() / 1000 + 32400 + i * 86400,
      moon_phase: 0.5,
      temp: {
        day: 15 + Math.sin(i) * 5,
        min: 10 + Math.sin(i) * 3,
        max: 20 + Math.sin(i) * 3,
        night: 12 + Math.sin(i) * 2,
        eve: 17 + Math.sin(i) * 2,
        morn: 11 + Math.sin(i) * 2
      },
      feels_like: {
        day: 14 + Math.sin(i) * 5,
        night: 11 + Math.sin(i) * 2,
        eve: 16 + Math.sin(i) * 2,
        morn: 10 + Math.sin(i) * 2
      },
      pressure: 1012,
      humidity: 76,
      dew_point: 11.1,
      wind_speed: 3.6,
      wind_deg: 250,
      wind_gust: 5.2,
      clouds: 40 + Math.sin(i) * 20,
      uvi: 4.5,
      pop: Math.random() * 0.5,
      weather: [
        {
          id: 802,
          main: i % 3 === 0 ? 'Rain' : i % 4 === 0 ? 'Clear' : 'Clouds',
          description: i % 3 === 0 ? 'light rain' : i % 4 === 0 ? 'clear sky' : 'scattered clouds',
          icon: i % 3 === 0 ? '10d' : i % 4 === 0 ? '01d' : '03d'
        }
      ]
    }))
  };
};

// Convert OpenWeatherMap current weather response to our CurrentWeather format
export const convertCurrentWeatherResponse = (data: CurrentWeatherResponse): {
  current: any;
  cityName: string;
  country: string;
} => {
  return {
    current: {
      dt: data.dt,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      temp: data.main.temp,
      feels_like: data.main.feels_like,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      dew_point: 0, // Not provided in this API
      uvi: 0, // Not provided in this API
      clouds: data.clouds.all,
      visibility: data.visibility,
      wind_speed: data.wind.speed,
      wind_deg: data.wind.deg,
      weather: data.weather
    },
    cityName: data.name,
    country: data.sys.country
  };
};