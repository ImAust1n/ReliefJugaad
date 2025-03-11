import React, { useState } from 'react';
import { FaWarehouse, FaBoxes, FaMapMarkerAlt, FaPlus, FaTrash } from 'react-icons/fa';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';

export default function ResourceManagement() {
  return (
    <section className="py-16 bg-primary-dark">
      <div className="max-w-7xl mx-auto px-4">
        <div className="animate-fade-in">
          <h2 className="text-3xl font-bold text-primary-dark mb-12 text-center">
            Resource & Aid Management
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaWarehouse className="h-8 w-8 text-primary" />,
                title: "Warehouse Management",
                description: "Add and manage warehouse locations with real-time inventory tracking",
                link: "/ngo-warehouse"
              },
              {
                icon: <FaBoxes className="h-8 w-8 text-primary" />,
                title: "Supply Management",
                description: "Track and update stock levels for food, water, medicine, and other essentials",
                link: "/ngo-inventory"
              },
              {
                icon: <FaMapMarkerAlt className="h-8 w-8 text-primary" />,
                title: "Rescue Management",
                description: "Map-based interface to manage disaster-affected areas and relief distribution",
                link: "/gov-sos-relief"
              }
            ].map((item, index) => (
              <Link to={item.link}>
                <div
                  key={index}
                  className="bg-[#054938] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 
                  animate-fade-in cursor-pointer transform hover:scale-105"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="text-primary mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-200">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}