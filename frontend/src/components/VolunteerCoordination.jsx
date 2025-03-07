import React, { useState } from 'react';
import { FaUsers, FaCampground, FaClipboardList, FaPlus } from 'react-icons/fa';

export default function VolunteerCoordination() {
  return (
    <section className="py-16 bg-[#054938]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="animate-fade-in">
          <h2 className="text-3xl font-bold text-primary-dark mb-12 text-center">
            Volunteer & Relief Camp Coordination
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#000F0B] p-8 rounded-xl shadow-lg animate-fade-in 
                hover:shadow-xl transition-shadow duration-600 cursor-pointer transform hover:scale-105">
              <div className="flex items-center mb-6">
                <FaUsers className="h-8 w-8 text-primary mr-4" />
                <h3 className="text-2xl font-semibold">Volunteer Management</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <FaClipboardList className="h-5 w-5 text-primary mr-3" />
                  <span>Post volunteer requirements</span>
                </li>
                <li className="flex items-center">
                  <FaClipboardList className="h-5 w-5 text-primary mr-3" />
                  <span>Assign specific roles and tasks</span>
                </li>
                <li className="flex items-center">
                  <FaClipboardList className="h-5 w-5 text-primary mr-3" />
                  <span>Track volunteer availability</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#000F0B] p-8 rounded-xl shadow-lg animate-fade-in
                hover:shadow-xl transition-shadow duration-600 cursor-pointer transform hover:scale-105">
              <div className="flex items-center mb-6">
                <FaCampground className="h-8 w-8 text-primary mr-4" />
                <h3 className="text-2xl font-semibold">Relief Camp Management</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <FaClipboardList className="h-5 w-5 text-primary mr-3" />
                  <span>Monitor shelter capacity</span>
                </li>
                <li className="flex items-center">
                  <FaClipboardList className="h-5 w-5 text-primary mr-3" />
                  <span>Track relief camp needs</span>
                </li>
                <li className="flex items-center">
                  <FaClipboardList className="h-5 w-5 text-primary mr-3" />
                  <span>Manage camp locations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}