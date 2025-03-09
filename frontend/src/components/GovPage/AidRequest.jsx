import { motion } from "framer-motion";
import { Package, Truck, ChevronFirst as FirstAid } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const AidRequest = () => {
  return (
    <div className="container mx-auto px-6 py-12 bg-[#000F0B]">
      <h2 className="text-3xl font-bold mb-8 text-center text-white">Aid Request & Management</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: <Package className="text-[#00BC4C]" size={24} />, 
            title: "Emergency Supplies",
            description: "Request critical supplies including food, water, and medical equipment",
            buttonText: "Request Supplies",
            link: "/gov-requirement",
          },
          {
            icon: <Truck className="text-[#00BC4C]" size={24} />, 
            title: "Supply Chain Tracking",
            description: "Monitor the movement of supplies from donors to affected areas",
            buttonText: "Track Supplies",
            link: "/gov-inventory",
          },
          {
            icon: <FirstAid className="text-[#00BC4C]" size={24} />, 
            title: "Medical Resources",
            description: "Manage hospital beds, medicine, and medical personnel allocation",
            buttonText: "Medical Dashboard",
            link: "/gov-inventory",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className="bg-[#054938] p-6 rounded-2xl shadow-md transition-all"
          >
            <div className="p-3 bg-[#00BC4C]/20 rounded-lg w-fit">{item.icon}</div>
            <h3 className="text-xl font-semibold mt-4 mb-2 text-white">{item.title}</h3>
            <p className="text-white/80 mb-4">{item.description}</p>
            <Link to={item.link}><button className="w-full py-2 bg-[#00BC4C] text-white rounded-lg cursor-pointer hover:bg-[#00BC4C]/80 transition-colors">
              {item.buttonText}
            </button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AidRequest;