import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCardIcon, GiftIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const donationOptions = [
  {
    title: 'Online Donation',
    description: 'Make a secure online donation using your credit card or PayPal.',
    icon: <CreditCardIcon className="h-10 w-10 text-green-500 mx-auto mb-3" />,
    button: 'Donate Now',
    link: '/donor-login',
    bg: 'bg-white',
    text: 'text-gray-900',
  },
  {
    title: 'Help in Kind',
    description: 'Donate items like clothes, books, and toys.',
    icon: <GiftIcon className="h-10 w-10 text-yellow-500 mx-auto mb-3" />,
    button: 'Nearby DropPoint',
    link: '/drop-points',
    bg: 'bg-white',
    text: 'text-gray-900',
  },
  {
    title: 'Volunteer',
    description: 'Volunteer for providing relief to the needy.',
    icon: <UserGroupIcon className="h-10 w-10 text-blue-500 mx-auto mb-3" />,
    button: 'Volunteer',
    link: '/donor-login',
    bg: 'bg-white',
    text: 'text-gray-900',
  },
];

const HomeSection4 = () => {
  return (
    <section className="donation-section py-2 bg-gradient-to-br from-[#112221] via-[#16352c] to-[#1f4236]">
      <div className="container mt-4 mx-auto bg-gradient-to-br from-[#112221] via-[#16352c] to-[#1f4236] text-center px-4">
        <div className="mb-2">
          <h2 className="text-4xl font-extrabold mb-2 text-gray-200 drop-shadow-lg">How You Can Donate</h2>
          <p className="text-lg text-gray-200 font-medium mb-4">Every act of kindness counts. Choose your way to make an impact today!</p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
          {donationOptions.map((option, idx) => (
            <div
              key={option.title}
              className={`relative flex-1 ${option.bg} ${option.text} rounded-xl shadow-xl p-8 transition-transform transform hover:scale-105 hover:shadow-2xl border-t-4 border-green-400`}
              style={{ minWidth: '260px', maxWidth: '350px' }}
            >
              {option.icon}
              <h3 className="text-2xl font-bold mb-2">{option.title}</h3>
              <p className="mb-6 text-base text-gray-600 min-h-[48px]">{option.description}</p>
              <Link to={option.link}>
                <button className="bg-gradient-to-r from-green-500 to-blue-400 text-white py-2 px-6 rounded-full font-semibold shadow hover:from-green-600 hover:to-blue-500 transition-colors duration-200">
                  {option.button}
                </button>
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-10 text-gray-700 text-sm italic">
          Thank you for supporting relief efforts and spreading hope!
        </div>
      </div>
    </section>
  );
};

export default HomeSection4;