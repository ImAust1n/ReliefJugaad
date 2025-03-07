import React from "react";

export default function HeroBanner() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3')]
        bg-cover bg-center"
        style={{ filter: 'brightness(0.7)' }}
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative flex flex-col items-center justify-center h-full text-white px-4 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
          Join the Relief Effort – Register Your NGO Today!
        </h1>
        <p className="text-xl md:text-2xl text-center mb-8 max-w-2xl">
          Together we can make a difference. Coordinate resources, manage volunteers, and track impact in real-time.
        </p>
        <button className="bg-[#054938] hover:bg-[#075040] text-white font-semibold py-3 px-8 rounded-lg
          transition-all duration-300 transform hover:scale-105 cursor-pointer">
          Manage Resources
        </button>
      </div>
    </div>
  );
}