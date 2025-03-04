import React, { useEffect } from 'react'
import Header from '../components/Header'
import Carousel from '../components/Carousel'
import HomeSection2 from '../components/HomeSection2'
import WeatherCard from '../components/WeatherCard'
const HomePage = () => {

  useEffect(() => {
    // Request location permission when the app loads
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          console.log("Location permission granted");
        },
        (error) => {
          console.log("Location permission denied or error:", error.message);
        }
      );
    }
    document.title = "weather";
  }, []);

  return (
    <div>
      <Header />
      <Carousel />
      <HomeSection2 />
    </div>
  )
}

export default HomePage
