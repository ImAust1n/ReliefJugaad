import { motion } from 'framer-motion';
import { AlertTriangle, Users } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://i.pinimg.com/736x/f7/b3/44/f7b344480c02b5fb64948137bb8aa9f9.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#000F0B]/90 to-[#054938]/190" />
      </div>
      
      <div className="relative h-full flex items-center justify-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Coordinating Relief Efforts for a Safer Tomorrow
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Unified platform for disaster response coordination between Government agencies, NDRF, and NGOs
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/gov-requirement">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 px-8 py-4 cursor-pointer bg-[#00BC4C] text-white rounded-lg font-semibold hover:bg-[#00BC4C]/80 transition-colors"
                >
                  <AlertTriangle size={20} />
                  Request Aid
                </motion.button>
              </Link>
              
              <Link to="/gov-sos-relief">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-8 py-4 cursor-pointer bg-[#054938] border border-[#00BC4C]/20 text-white rounded-lg font-semibold hover:bg-[#000F0B] transition-colors"
              >
                <Users size={20} />
                Track Relief Operations
              </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;