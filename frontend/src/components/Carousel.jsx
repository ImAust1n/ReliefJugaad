import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const Carousel = () => {
  const images = [
    'https://t3.ftcdn.net/jpg/06/20/13/30/360_F_620133022_CMLtda7ZzWk6bTAMfRr3rxVFkeUzNu3O.jpg',
    'https://images.pexels.com/photos/70573/fireman-firefighter-rubble-9-11-70573.jpeg?cs=srgb&dl=pexels-pixabay-70573.jpg&fm=jpg',
    'https://media.istockphoto.com/id/486476129/photo/search-and-rescue.jpg?s=612x612&w=0&k=20&c=cXw7T-UgJAPiYACFrU1U44y9iwK0qXWGEt7GUUC69xo='
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full h-200 overflow-hidden rounded-lg shadow-lg">
      <div className="w-full h-full flex transition-transform duration-700 ease-in-out">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#000F0B]/90 to-[#054938]/190" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#000F0B]/20 to-[#054938]/190" />
      </div>

      {/* Caption and CTA */}
      <div className="absolute inset-0 flex flex-col items-center justify-end rounded-lg pb-8" styles={{ backgroundColor: "rgba(129,254,188,0.5)" }}>
        <h1 className="text-white text-4xl md:text-7xl font-bold px-4 text-center">
          Disaster Strikes <span className='text-[#ed4949]'>Fast</span>, <br />
          We Strike <span className='text-[#03da59]'>Faster</span>
        </h1>
        <div className="flex flex-row gap-4">
        <Link to="/gov-camp">
        <button className="mt-4 bg-red-600 text-white cursor-pointer px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition duration-300">
          Find Safe Shelter
        </button>
        </Link>
        <a href="#chatbot">
          <button className="mt-4 bg-green-600 text-white cursor-pointer px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition duration-300">
          Chatney
        </button>
        </a>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition"
      >
        ❮
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition"
      >
        ❯
      </button>
    </div>
  );
};

export default Carousel;
