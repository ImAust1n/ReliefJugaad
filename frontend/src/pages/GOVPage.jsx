import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroBanner from '../components/GovPage/HeroBanner';
import Dashboard from '../components/GovPage/Dashboard';
import AidRequest from '../components/GovPage/AidRequest';
import StatisticsDashboard from '../components/GovPage/StatisticsDashboard';
import DisasterReporting from '../components/DisasterReporting';
import VolunteerCoordination from '../components/VolunteerCoordination';
import { useDisasterStore } from '../store/useDisasterStore';

function GOVPage() {
  const { disasters, getAllDisasters } = useDisasterStore();
  useEffect(() => {
    getAllDisasters();
  }, [getAllDisasters, disasters]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroBanner />
      <Dashboard />
      <VolunteerCoordination link="https://chat.whatsapp.com/EoxkIcLNEbZ9Bk1p47KMzQ" />
      <AidRequest />
      <DisasterReporting />
      <StatisticsDashboard />
    </motion.div>
  );
}

export default GOVPage;
