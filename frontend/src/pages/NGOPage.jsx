import HeroBanner from '../components/HeroBanner';
import ResourceManagement from '../components/ResourceManagement';
import DisasterReporting from '../components/DisasterReporting';
import VolunteerCoordination from '../components/VolunteerCoordination';
import ImpactDashboard from '../components/ImpactDashboard';
import React from 'react';

function NGOPage() {
  return (
    <div className="min-h-screen bg-[#121112] pt-16">
      <div className="animate-fade-in">
        <HeroBanner />
        <ResourceManagement />
        <VolunteerCoordination link="https://chat.whatsapp.com/B5T94r953Ic1YQl67Ojemk" />
        <DisasterReporting />
      </div>
    </div>
  );
};

export default NGOPage;
