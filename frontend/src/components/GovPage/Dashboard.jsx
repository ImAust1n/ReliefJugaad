import { motion } from 'framer-motion';
import { MapPin, Users, Package, Guitar as Hospital } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import React from 'react';

const data = [
  { name: 'Day 1', rescued: 120, supplies: 200 },
  { name: 'Day 2', rescued: 300, supplies: 400 },
  { name: 'Day 3', rescued: 500, supplies: 600 },
  { name: 'Day 4', rescued: 780, supplies: 800 },
  { name: 'Day 5', rescued: 890, supplies: 1000 },
];

const StatCard = ({ icon: Icon, title, value }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-[#054938] p-6 rounded-2xl shadow-md transition-all"
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-[#00BC4C]/80 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-2 text-white">{value}</p>
      </div>
      <div className="p-3 rounded-lg bg-[#00BC4C]/20">
        <Icon size={24} className="text-[#00BC4C]" />
      </div>
    </div>
  </motion.div>
);

const Dashboard = () => {
  return (
    <div className="container mx-auto px-6 py-12 bg-[#000F0B]">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">Real-time Disaster Response Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={MapPin} title="Active Disasters" value="4" />
        <StatCard icon={Users} title="People Rescued" value="890" />
        <StatCard icon={Package} title="Supply Units Deployed" value="1,000" />
        <StatCard icon={Hospital} title="Medical Camps" value="12" />
      </div>

      <div className="bg-[#054938] p-6 rounded-2xl shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-white">Relief Operations Progress</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
              <YAxis stroke="rgba(255,255,255,0.7)" />
              <Tooltip contentStyle={{ backgroundColor: '#054938', border: 'none' }} />
              <Area 
                type="monotone" 
                dataKey="rescued" 
                stackId="1"
                stroke="#00BC4C" 
                fill="#00BC4C" 
                fillOpacity={0.6}
              />
              <Area 
                type="monotone" 
                dataKey="supplies" 
                stackId="1"
                stroke="#000F0B" 
                fill="#000F0B" 
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
