import { motion } from 'framer-motion';
import { FaHandHoldingHeart, FaBell, FaHandsHelping, FaChartLine } from 'react-icons/fa';
import React from 'react';
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const services = [
  {
    icon: <FaBell className="text-4xl mb-4" />,
    title: "Live Alerts",
    description: "Real-time notifications about emerging disasters and critical updates."
  },
  {
    icon: <FaHandHoldingHeart className="text-4xl mb-4" />,
    title: "Donor Support",
    description: "Direct channels for financial contributions and resource allocation."
  },
  {
    icon: <FaHandsHelping className="text-4xl mb-4" />,
    title: "NGO Coordination",
    description: "Streamlined collaboration between relief organizations and volunteers."
  },
  {
    icon: <FaChartLine className="text-4xl mb-4" />,
    title: "Aid Tracking",
    description: "Transparent monitoring of relief efforts and resource distribution."
  }
];

const partners = [
  "Red Cross International",
  "UNICEF",
  "World Health Organization",
  "Doctors Without Borders",
  "Local Government Agencies"
];

export default function AboutUs() {
  return (
    <div style={{ backgroundColor: 'var(--color-primary-dark)', color: 'var(--color-white)' }}>
      {/* Header */}
      <motion.header 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6 }}
        className="section-container text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Together, We Rebuild</h1>
        <p style={{ color: 'var(--color-gray-300)' }} className="text-xl">
          Empowering Communities Through Rapid Disaster Relief
        </p>
      </motion.header>

      {/* Our Mission */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.6 }}
        className="section-container"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="section-overlay" style={{ opacity: 0.8 }}></div>
        <div className="section-content">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            We are dedicated to revolutionizing disaster response through technology. 
            Our platform connects communities, relief organizations, and resources in 
            real-time, ensuring swift and effective aid delivery when every moment counts.
          </p>
        </div>
      </motion.section>

      {/* Who We Are */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.6 }}
        className="section-container"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="section-overlay" style={{ opacity: 0.9 }}></div>
        <div className="section-content">
          <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
          <p className="text-lg leading-relaxed">
            Founded by a team of disaster response experts and technology innovators, 
            we bridge the gap between those in need and those who can help. Our values 
            of transparency, efficiency, and compassion drive every aspect of our platform.
          </p>
        </div>
      </motion.section>

      {/* What We Do */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.6 }}
        className="section-container"
        style={{ backgroundColor: 'var(--color-primary)', opacity: 0.3 }}
      >
        <div className="section-content">
          <h2 className="text-3xl font-bold mb-12 text-center">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card"
              >
                {service.icon}
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p style={{ color: 'var(--color-gray-300)' }}>{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Impact Stories */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.6 }}
        className="section-container"
      >
        <div className="section-content">
          <h2 className="text-3xl font-bold mb-8">Impact Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-xl font-bold mb-2">Kerala Flood Response</h3>
              <p>Coordinated relief efforts helped 10,000+ affected residents access immediate aid and shelter within 48 hours.</p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-2">Hurricane Recovery</h3>
              <p>Successfully connected 50+ local NGOs with international aid organizations, streamlining resource distribution.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Our Partners */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.6 }}
        className="section-container"
        style={{ backgroundColor: 'var(--color-primary)', opacity: 0.3 }}
      >
        <div className="section-content">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Partners</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="partner-tag"
              >
                {partner}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Join Us */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.6 }}
        className="section-container text-center"
      >
        <div className="section-content">
          <h2 className="text-3xl font-bold mb-8">Join Our Mission</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="button-primary">
              Donate Now
            </button>
            <button className="button-secondary">
              Volunteer
            </button>
            <button className="button-secondary">
              Sign Up for Alerts
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}