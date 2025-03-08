import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, LineChart, ArrowRight, Clock, Globe, Home, Shield, Droplet, Wind, Sun, Mountain, Wallet, CreditCard, Gift, Building2 } from 'lucide-react';
import DonationModal from '../components/DonationModal';
import DisasterCard from '../components/DisasterCard';

function App() {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('map'); // Initialize activeTab state

  const disasters = [
    {
      name: 'Cyclone Relief',
      location: 'Coastal Tamil Nadu',
      urgency: 'High' as const,
      resources: ['Food', 'Water', 'Medical Supplies', 'Shelter'],
    },
    {
      name: 'Flood Response',
      location: 'Kerala',
      urgency: 'Medium' as const,
      resources: ['Food', 'Clothing', 'Medical Aid'],
    },
    {
      name: 'Drought Assistance',
      location: 'Maharashtra',
      urgency: 'High' as const,
      resources: ['Water', 'Food', 'Agricultural Aid'],
    },
  ];

  const impactCards = [
    {
      title: 'Immediate Impact',
      description: 'Your donation provides instant relief through emergency supplies, food, and medical aid within hours of a disaster.',
      icon: Clock,
      color: 'text-emerald-400',
      bgColor: 'bg-[#054938]',
    },
    {
      title: 'Save Lives',
      description: 'Support rescue operations and emergency medical services that directly save lives in critical situations.',
      icon: Shield,
      color: 'text-emerald-400',
      bgColor: 'bg-[#054938]',
    },
    {
      title: 'Community Rebuilding',
      description: 'Help communities recover and rebuild with long-term rehabilitation projects and infrastructure support.',
      icon: Home,
      color: 'text-emerald-400',
      bgColor: 'bg-[#054938]',
    },
    {
      title: 'Global Solidarity',
      description: 'Join a worldwide network of donors making a difference across borders and communities.',
      icon: Globe,
      color: 'text-emerald-400',
      bgColor: 'bg-[#054938]',
    },
  ];

  const disasterTypes = [
    {
      type: 'Flood Relief',
      description: 'Providing boats for evacuation, clean drinking water, and temporary shelters for displaced families.',
      icon: Droplet,
      color: 'text-emerald-400',
      image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&q=80',
    },
    {
      type: 'Cyclone Response',
      description: 'Emergency supplies, medical aid, and reconstruction support for cyclone-affected regions.',
      icon: Wind,
      color: 'text-emerald-400',
      image: 'https://images.unsplash.com/photo-1454789476662-53eb23ba5907?auto=format&fit=crop&q=80',
    },
    {
      type: 'Drought Assistance',
      description: 'Water supply initiatives, agricultural support, and sustainable farming solutions.',
      icon: Sun,
      color: 'text-emerald-400',
      image: 'https://images.unsplash.com/photo-1549885606-bbc17accf949?auto=format&fit=crop&q=80',
    },
    {
      type: 'Earthquake Relief',
      description: 'Search and rescue operations, medical assistance, and rebuilding destroyed infrastructure.',
      icon: Mountain,
      color: 'text-emerald-400',
      image: 'https://images.unsplash.com/photo-1587653263995-422546a7a569?auto=format&fit=crop&q=80',
    },
  ];

  const donationMethods = [
    {
      title: 'One-Time Donation',
      description: 'Make an immediate impact with a single contribution. Choose your amount and payment method.',
      icon: CreditCard,
      steps: ['Select amount', 'Fill personal details', 'Choose payment method', 'Receive tax receipt'],
    },
    {
      title: 'Monthly Giving',
      description: 'Support our mission consistently with automated monthly donations.',
      icon: Wallet,
      steps: ['Choose monthly amount', 'Set up auto-payment', 'Manage anytime', 'Regular impact reports'],
    },
    {
      title: 'In-Kind Donations',
      description: 'Donate essential items like food, clothing, or medical supplies directly.',
      icon: Gift,
      steps: ['List available items', 'Schedule pickup', 'Items assessed', 'Receive acknowledgment'],
    },
    {
      title: 'Corporate Giving',
      description: 'Partner with us through CSR initiatives and make a lasting impact.',
      icon: Building2,
      steps: ['Contact our team', 'Discuss partnership', 'Customize program', 'Impact assessment'],
    },
  ];

    //Dummy data for the list view, replace with actual data fetching
    const items = [
        { name: 'Disaster 1', location: 'Location 1' },
        { name: 'Disaster 2', location: 'Location 2' },
        { name: 'Disaster 3', location: 'Location 3' },
    ];

    const handleViewOnMap = (location: string) => {
        // Replace with actual logic to switch to map view and show the location
        setActiveTab('map');
        // Example: using a simple alert, replace with your map integration logic
        alert(`Viewing location on map: ${location}`);

    };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#112221] to-[#000F0B] text-white">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#000F0B]/80" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Your Contribution Can Save Lives – Donate Now!
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Join us in making a difference. Every donation helps those affected by disasters
              rebuild their lives.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setIsDonationModalOpen(true)}
                className="bg-[#054938] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#054938]/80 transition-colors"
              >
                Donate Now
              </button>
              <button className="bg-white/10 text-white px-8 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors backdrop-blur-sm">
                Volunteer Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Cards */}
      <section className="py-20 bg-[#112221]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            How Your Donations Make a Difference
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#054938] rounded-xl overflow-hidden hover:bg-[#054938]/80 transition-colors"
              >
                <div className="p-6">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-[#112221]">
                    <card.icon className={card.color} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
                  <p className="text-gray-300">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Donate Section */}
      <section className="py-20 bg-[#000F0B]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            How to Make a Difference
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {donationMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#054938] rounded-xl p-6 hover:bg-[#054938]/80 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-[#112221] flex items-center justify-center mb-4">
                  <method.icon className="text-emerald-400 w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{method.title}</h3>
                <p className="text-gray-300 mb-4">{method.description}</p>
                <div className="space-y-2">
                  {method.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#112221] text-emerald-400 flex items-center justify-center text-sm">
                        {stepIndex + 1}
                      </span>
                      <span className="text-gray-300">{step}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setIsDonationModalOpen(true)}
                  className="mt-6 w-full bg-[#112221] text-white py-2 rounded-lg hover:bg-[#112221]/80 transition-colors flex items-center justify-center gap-2"
                >
                  Start Donating
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Disaster Types */}
      <section className="py-20 bg-[#112221]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Supporting Communities Through Various Disasters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {disasterTypes.map((disaster, index) => (
              <motion.div
                key={disaster.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#054938] rounded-xl overflow-hidden hover:bg-[#054938]/80 transition-colors"
              >
                <div className="h-48 relative">
                  <img
                    src={disaster.image}
                    alt={disaster.type}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-[#054938] p-2 rounded-full">
                    <disaster.icon className={disaster.color} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{disaster.type}</h3>
                  <p className="text-gray-300 mb-4">{disaster.description}</p>
                  <button
                    onClick={() => setIsDonationModalOpen(true)}
                    className="text-emerald-400 font-medium hover:text-emerald-300 transition-colors flex items-center gap-2"
                  >
                    Donate Now
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Disaster Aid Requests */}
      <section className="py-20 bg-[#000F0B]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Active Disaster Aid Requests
          </h2>
          <div className="mt-8">
          <div className="flex justify-center border-b border-gray-300 mb-4 space-x-4">
            <button
              className={`px-4 py-2 ${activeTab === 'map' ? 'border-b-2 border-blue-500 text-[#22C55E]' : 'text-white'}`}
              onClick={() => setActiveTab('map')}
            >
              Map
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'list' ? 'border-b-2 border-blue-500 text-[#22C55E]' : 'text-white'}`}
              onClick={() => setActiveTab('list')}
            >
              List
            </button>
          </div>

          {/* Map or List Content */}
          {activeTab === 'map' ? (
            <iframe
              id="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.384199692296!2d77.2167203750056!3d28.63280777351663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce43c2bafb6b9%3A0x632e26f5d0f52b98!2sIndia%20Gate!5e0!3m2!1sen!2sin!4v1698759235406!5m2!1sen!2sin"
              width="100%"
              height="450px"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          ) : (
            <div className="max-h-[450px] overflow-y-auto space-y-4">
              {items.map((item, index) => (
                <div key={index} className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">{item.location}</p>
                  <button
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleViewOnMap(item.location)}
                  >
                    View on Map
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-10">
            {disasters.map((disaster) => (
              <DisasterCard
                key={disaster.name}
                {...disaster}
                onHelp={() => setIsDonationModalOpen(true)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-[#112221]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-[#054938] p-8 rounded-xl text-center"
            >
              <Heart className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-white mb-2">₹10M+</h3>
              <p className="text-gray-300">Donations Received</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-[#054938] p-8 rounded-xl text-center"
            >
              <Users className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-white mb-2">50K+</h3>
              <p className="text-gray-300">Lives Impacted</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-[#054938] p-8 rounded-xl text-center"
            >
              <LineChart className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-white mb-2">100%</h3>
              <p className="text-gray-300">Transparency</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recent Donations */}
      <section className="py-20 bg-[#000F0B]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Recent Donations
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { name: 'Anonymous', amount: '₹10,000', cause: 'Cyclone Relief' },
              { name: 'Priya S.', amount: '₹5,000', cause: 'Flood Response' },
              { name: 'Corporate Inc.', amount: '₹50,000', cause: 'Drought Assistance' },
            ].map((donation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-6 bg-[#054938] rounded-lg"
              >
                <div>
                  <h3 className="font-medium text-white">{donation.name}</h3>
                  <p className="text-sm text-gray-300">donated to {donation.cause}</p>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-emerald-400">{donation.amount}</span>
                  <ArrowRight size={16} className="ml-2 text-emerald-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
      />
    </div>
  );
}

export default App;
