import React from 'react';

const HomeSection4 = () => {
  return (
    <section className="donation-section py-12 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">How You Can Donate</h2>
        <p className="mb-8">Your support makes a difference. Choose one of the following ways to contribute:</p>
        <div className="card-container flex flex-col xl:flex-row justify-around">
          <div className="card bg-white text-white border border-gray-200 rounded-lg shadow-md p-6 m-2 w-80% xl:w-1/4">
            <h3 className="text-xl font-semibold mb-2">Online Donation</h3>
            <p className="mb-4">Make a secure online donation using your credit card or PayPal.</p>
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 inline-block cursor-pointer">Donate Now</button>
          </div>
          <div className="card bg-white text-white border border-gray-200 rounded-lg shadow-md p-6 m-2 w-80% xl:w-1/4">
            <h3 className="text-xl font-semibold mb-2">Help in Kind</h3>
            <p className="mb-4">Donate items like clothes, books, and toys.</p>
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 inline-block cursor-pointer">Nearby DropPoint</button>
          </div>
          <div className="card bg-white text-white border border-gray-200 rounded-lg shadow-md p-6 m-2 w-80% xl:w-1/4">
            <h3 className="text-xl font-semibold mb-2">Volunteer</h3>
            <p className="mb-4">Volunteer for providing relief to the needy.</p>
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 inline-block cursor-pointer">Volunteer</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection4;