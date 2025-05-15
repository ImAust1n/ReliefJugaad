import { useState, useEffect } from 'react';
import Header from '../components/Header';
import DisasterForm, { DisasterFormData } from '../components/planner/DisasterForm';
import ActionPlan from '../components/planner/ActionPlan';
import React from 'react';
import axios from 'axios';

const Planner = () => {
  const [alertVisible, setAlertVisible] = useState<boolean>(true);
  const [formData, setFormData] = useState<DisasterFormData | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  
  const handleFormSubmit = (data: DisasterFormData) => {
    axios.post('http://localhost:5001/evacuation', data)
      .then(response => {
        setResponse(response.data);
      })
      .catch(error => {
        setResponse(error.response.data);
      });
    setFormData(data);
  };

  return (
    <div className="min-h-screen mt-8 bg-gradient-to-b from-emergency-black to-emergency-surface text-emergency-white flex flex-col">      
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-emergency-forest bg-opacity-90 rounded-lg shadow-xl p-6 border border-emergency-basil transition-all duration-300 hover:shadow-emergency-mint/20">
            <h2 className="text-2xl font-bold mb-6 text-emergency-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-emergency-caribbean" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Disaster Information
            </h2>
            <DisasterForm onSubmit={handleFormSubmit} />
          </section>
          
          <section className="h-full flex">
            {formData ? (
              <ActionPlan formData={formData} />
            ) : (
              <div className="bg-emergency-surface bg-opacity-90 h-full w-full rounded-lg shadow-xl p-6 border border-emergency-basil flex items-center justify-center text-center transition-all duration-300">
                <div>
                  {response ? (
                    <div className="mx-auto w-16 h-16 border-4 border-emergency-mint border-t-transparent rounded-full animate-spin mb-4"></div>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-emergency-mint opacity-80 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <h2 className="text-2xl font-bold text-emergency-white mb-2">Awaiting Information</h2>
                      <p className="text-emergency-white opacity-80 max-w-md mx-auto">
                        Fill out the disaster information form to generate an emergency action plan.
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
      
      <footer className="bg-emergency-forest bg-opacity-90 text-emergency-white py-4 border-t border-emergency-basil mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="flex items-center justify-center text-sm">
            <span className="inline-block h-2 w-2 bg-emergency-caribbean rounded-full mr-2 animate-pulse"></span>
            Disaster Emergency Action Plan Generator | System Status: Active
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Planner;
