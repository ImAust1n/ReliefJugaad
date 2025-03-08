import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, MapPin } from 'lucide-react';
import { clsx } from 'clsx';

interface DisasterCardProps {
  name: string;
  location: string;
  urgency: 'High' | 'Medium' | 'Low';
  resources: string[];
  onHelp: () => void;
}

const DisasterCard: React.FC<DisasterCardProps> = ({
  name,
  location,
  urgency,
  resources,
  onHelp,
}) => {
  const urgencyColors = {
    High: 'bg-red-900/50 text-red-200',
    Medium: 'bg-yellow-900/50 text-yellow-200',
    Low: 'bg-green-900/50 text-green-200',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-[#054938] rounded-xl overflow-hidden"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-white">{name}</h3>
          <span
            className={clsx(
              'px-3 py-1 rounded-full text-sm font-medium',
              urgencyColors[urgency]
            )}
          >
            {urgency}
          </span>
        </div>

        <div className="flex items-center text-gray-300 mb-4">
          <MapPin size={18} className="mr-2" />
          <span>{location}</span>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Required Resources:</h4>
          <div className="flex flex-wrap gap-2">
            {resources.map((resource) => (
              <span
                key={resource}
                className="px-3 py-1 bg-[#112221] text-gray-300 rounded-full text-sm"
              >
                {resource}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={onHelp}
          className="w-full bg-[#112221] text-white py-2 rounded-lg font-medium hover:bg-[#112221]/80 transition-colors flex items-center justify-center"
        >
          <AlertTriangle size={18} className="mr-2" />
          Help Now
        </button>
      </div>
    </motion.div>
  );
};

export default DisasterCard;