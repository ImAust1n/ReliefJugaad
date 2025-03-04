import React, { useState, useEffect } from 'react';

const Carousel = () => {
  const images = [
    'https://t3.ftcdn.net/jpg/06/20/13/30/360_F_620133022_CMLtda7ZzWk6bTAMfRr3rxVFkeUzNu3O.jpg',
    'https://images.pexels.com/photos/70573/fireman-firefighter-rubble-9-11-70573.jpeg?cs=srgb&dl=pexels-pixabay-70573.jpg&fm=jpg',
    'https://media.istockphoto.com/id/486476129/photo/search-and-rescue.jpg?s=612x612&w=0&k=20&c=cXw7T-UgJAPiYACFrU1U44y9iwK0qXWGEt7GUUC69xo=',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full pt-20 xl:pt-0">
      <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="absolute inset-0 w-full h-full object-cover rounded-lg" />
        <div className="absolute inset-0 flex flex-col items-center justify-end bg-black bg-opacity-50 rounded-lg pb-8">
          <h1 className="text-white text-xl md:text-2xl font-bold px-4 text-center">Disaster strikes fast, We strike Faster</h1>
          <button className="mt-4 bg-red-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600 transition">
            Donate Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;