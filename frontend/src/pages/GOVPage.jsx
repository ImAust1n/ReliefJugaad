import React from 'react';
import { motion } from 'framer-motion';
import HeroBanner from '../components/GovPage/HeroBanner';
import Dashboard from '../components/GovPage/Dashboard';
import AidRequest from '../components/GovPage/AidRequest';
import StatisticsDashboard from '../components/GovPage/StatisticsDashboard';
import DisasterReporting from '../components/DisasterReporting';
import VolunteerCoordination from '../components/VolunteerCoordination';

function GOVPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroBanner />
      <Dashboard />
      <VolunteerCoordination />
      <AidRequest />
      <DisasterReporting />
      <StatisticsDashboard />
    </motion.div>
  );
}

export default GOVPage;
