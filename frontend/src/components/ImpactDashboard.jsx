import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import React from 'react';

const data = [
  { month: 'Jan', aid: 4000 },
  { month: 'Feb', aid: 3000 },
  { month: 'Mar', aid: 5000 },
  { month: 'Apr', aid: 2780 },
  { month: 'May', aid: 6890 },
  { month: 'Jun', aid: 2390 },
];

export default function ImpactDashboard() {
  return (
    <section className="py-16 bg-primary-dark">
      <div className="max-w-7xl mx-auto px-4">
        <div className="animate-fade-in">
          <h2 className="text-3xl font-bold text-primary-dark mb-12 text-center">
            Transparency & Impact Tracking
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-lg animate-fade-in">
              <h3 className="text-xl font-semibold mb-4">Aid Distribution Overview</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="aid" stroke="#054938" fill="#054938" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-[#054938] p-6 rounded-xl shadow-lg animate-fade-in">
              <h3 className="text-xl font-semibold mb-4">Success Stories</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2 text-green-900">Impact Story #{item}</h4>
                    <p className="text-gray-600">
                      Real success story showcasing the impact of NGO coordination and relief efforts.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}