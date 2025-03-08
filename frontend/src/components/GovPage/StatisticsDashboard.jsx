import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import React from 'react';

const supplyData = [
  { month: 'Jan', food: 4000, water: 2400, medicine: 2400 },
  { month: 'Feb', food: 3000, water: 1398, medicine: 2210 },
  { month: 'Mar', food: 2000, water: 9800, medicine: 2290 },
  { month: 'Apr', food: 2780, water: 3908, medicine: 2000 },
  { month: 'May', food: 1890, water: 4800, medicine: 2181 },
  { month: 'Jun', food: 2390, water: 3800, medicine: 2500 },
];

const resourceAllocation = [
  { name: 'Food Supplies', value: 400 },
  { name: 'Medical Aid', value: 300 },
  { name: 'Shelter', value: 300 },
  { name: 'Water', value: 200 },
];

const COLORS = ['#1a535c', '#4ECDC4', '#054938', '#047857']; // Darker colors

const StatisticsDashboard = () => {
  return (
    <div className="py-12 bg-[#000F0B]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl text-center font-bold mb-8 text-white">Overall Relief Statistics</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Supply Distribution Trends</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={supplyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                    <XAxis dataKey="month" stroke="rgba(0,0,0,0.7)" />
                    <YAxis stroke="rgba(0,0,0,0.7)" />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc' }} />
                    <Legend />
                    <Area type="monotone" dataKey="food" stackId="1" stroke="#1a535c" fill="#1a535c" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="water" stackId="1" stroke="#4ECDC4" fill="#4ECDC4" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="medicine" stackId="1" stroke="#054938" fill="#054938" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Current Resource Allocation</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={resourceAllocation}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#1a535c"
                      dataKey="value"
                    >
                      {resourceAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc' }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Monthly Relief Progress</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={supplyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                    <XAxis dataKey="month" stroke="rgba(0,0,0,0.7)" />
                    <YAxis stroke="rgba(0,0,0,0.7)" />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc' }} />
                    <Legend />
                    <Bar dataKey="food" fill="#1a535c" />
                    <Bar dataKey="water" fill="#4ECDC4" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Supply Chain Efficiency</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={supplyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                    <XAxis dataKey="month" stroke="rgba(0,0,0,0.7)" />
                    <YAxis stroke="rgba(0,0,0,0.7)" />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc' }} />
                    <Legend />
                    <Line type="monotone" dataKey="food" stroke="#1a535c" />
                    <Line type="monotone" dataKey="medicine" stroke="#054938" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StatisticsDashboard;