import React from 'react'

const Hero = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOm0OPGaetP3MV_j_dNCrS6w2tRPNTwkcZUw&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMaQ_pZeXLKNpJWuIDSKUyzeVB7G5-wuHrng&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQSdQkTT6_la127CurC9iW8EALQGFF3GzWKIl5-RhMQcnWqfjq2NsapsnMa6uWRwG0nLE&usqp=CAU',
  ];
  const slogan = "Make a difference today!";
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleDonateClick = () => {
    alert("Thank you for your interest in donating!");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <img src={images[currentIndex]} alt="Hero" className="w-full h-auto object-cover rounded-lg shadow-lg" />
      <div className="mt-4 text-2xl font-bold text-center text-gray-800">{slogan}</div>
      <button 
        onClick={handleDonateClick} 
        className="mt-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        Donate Now
      </button>
    </div>
  );
}

export default Hero
