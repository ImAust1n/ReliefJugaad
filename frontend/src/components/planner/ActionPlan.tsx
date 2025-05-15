
import { useState, useEffect } from 'react';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import StakeholderSelection from './StakeholderSelection';
import EmailModal from './EmailModal';
import { DisasterFormData } from './DisasterForm';

import React from 'react';

interface ActionPlanProps {
  formData: DisasterFormData;
}

const ActionPlan = ({ formData }: ActionPlanProps) => {
  const [planText, setPlanText] = useState<string>(generateInitialPlan(formData));
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showEmailModal, setShowEmailModal] = useState<boolean>(false);
  const [selectedStakeholders, setSelectedStakeholders] = useState<string[]>([]);
  const [saveAnimation, setSaveAnimation] = useState<boolean>(false);
  
  const handleSendEmail = () => {
    if (selectedStakeholders.length === 0) {
      alert("Please select at least one stakeholder to send the email to.");
      return;
    }
    setShowEmailModal(true);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Saving the plan
      setSaveAnimation(true);
      setTimeout(() => setSaveAnimation(false), 1000);
    }
    setIsEditing(!isEditing);
  };

  // Get severity styling based on formData.severity
  const getSeverityBadgeStyle = () => {
    switch(formData.severity) {
      case 'low': return 'bg-emergency-mint/20 text-emergency-mint border-emergency-mint';
      case 'medium': return 'bg-yellow-400/20 text-yellow-400 border-yellow-400';
      case 'high': return 'bg-orange-500/20 text-orange-500 border-orange-500';
      case 'critical': return 'bg-red-500/20 text-red-500 border-red-500';
      default: return 'bg-emergency-mint/20 text-emergency-mint border-emergency-mint';
    }
  };

  return (
    <div className="bg-emergency-surface bg-opacity-90 rounded-lg shadow-xl p-6 border border-emergency-basil h-full flex flex-col transition-all duration-300 hover:shadow-emergency-mint/20">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-emergency-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-emergency-caribbean" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Emergency Action Plan
          </h2>
          <div className="flex items-center mt-2 space-x-2">
            <span className={`text-xs px-3 py-1 rounded-full border ${getSeverityBadgeStyle()}`}>
              {formData.severity.charAt(0).toUpperCase() + formData.severity.slice(1)} Severity
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-emergency-forest text-emergency-white border border-emergency-basil">
              {formData.disasterType.charAt(0).toUpperCase() + formData.disasterType.slice(1)}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={handleEditToggle}
            variant="outline"
            className={`bg-emergency-basil border-emergency-mint text-emergency-white hover:bg-emergency-forest transition-all flex items-center ${saveAnimation ? 'animate-pulse' : ''}`}
          >
            {isEditing ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Plan
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Plan
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="mb-6 flex-grow">
        {isEditing ? (
          <Textarea
            value={planText}
            onChange={(e) => setPlanText(e.target.value)}
            className="bg-emergency-black border-emergency-basil text-emergency-white h-full min-h-[300px] focus:ring-emergency-mint focus:border-emergency-mint transition-all"
          />
        ) : (
          <div className="bg-emergency-black text-emergency-white p-4 rounded-lg border border-emergency-basil h-full min-h-[300px] overflow-y-auto whitespace-pre-line shadow-inner">
            {planText}
          </div>
        )}
      </div>
      
      <div className="border-t border-emergency-basil pt-4">
        <h3 className="text-lg font-semibold text-emergency-white mb-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-emergency-caribbean" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Stakeholder Selection
        </h3>
        <StakeholderSelection 
          selectedStakeholders={selectedStakeholders}
          onChange={setSelectedStakeholders}
        />
      </div>
      
      <div className="mt-6">
        <Button
          onClick={handleSendEmail}
          className={`w-full py-3 rounded-lg font-medium transition-all duration-300 shadow-lg flex items-center justify-center ${selectedStakeholders.length > 0 ? 'bg-emergency-caribbean hover:bg-emergency-mint text-emergency-black' : 'bg-emergency-surface text-emergency-white/50 cursor-not-allowed'}`}
          disabled={selectedStakeholders.length === 0}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Send Email to Responders
        </Button>
      </div>
      
      {showEmailModal && (
        <EmailModal 
          onClose={() => setShowEmailModal(false)} 
          actionPlan={planText}
          stakeholders={selectedStakeholders}
          disasterInfo={formData}
        />
      )}
    </div>
  );
};

// Helper function to generate a basic plan based on form data
function generateInitialPlan(formData: DisasterFormData): string {
  const disasterTypeCapitalized = formData.disasterType.charAt(0).toUpperCase() + formData.disasterType.slice(1);
  const severityMap: Record<string, string> = {
    'low': 'minimal',
    'medium': 'moderate',
    'high': 'severe',
    'critical': 'catastrophic'
  };
  
  return `EMERGENCY ACTION PLAN: ${disasterTypeCapitalized} Response
  
LOCATION: ${formData.location}
SEVERITY: ${severityMap[formData.severity] || formData.severity}
TIMESTAMP: ${new Date().toLocaleString()}

SITUATION OVERVIEW:
${formData.additionalNotes || 'No additional details provided.'}

IMMEDIATE ACTIONS:
1. Establish incident command center near the affected area
2. Deploy emergency response teams to ${formData.location}
3. Coordinate with local authorities for evacuation procedures
4. Secure critical infrastructure and resources
5. Set up medical triage facilities as needed

RESOURCE ALLOCATION:
- Emergency Medical Services: Priority Level 1
- Search and Rescue Teams: Priority Level 1
- Police/Security Forces: Priority Level 2
- Utility Restoration Teams: Priority Level 2
- Shelter Management Staff: Priority Level 2

COMMUNICATION PROTOCOL:
- Hourly situation reports from field teams
- Regular public updates through emergency broadcast system
- Dedicated emergency hotline: 1-800-DISASTER

This plan is subject to updates as the situation develops.`;
}

export default ActionPlan;
