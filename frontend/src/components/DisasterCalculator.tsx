import React, { useState } from 'react';
import { Calculator, AlertTriangle, Building2, Clock, IndianRupee, Users, Home, Building, MapPin } from 'lucide-react';
import { DisasterParams, DisasterType, Location, ImpactAssessment } from '../types/types2';
import { calculateImpact } from '../utils/calculations';

const defaultLocation: Location = {
  name: "Sample City",
  population: 500000,
  infrastructureDensity: 0.8,
  averagePropertyValue: 300000
};

export default function DisasterCalculator() {
  const [params, setParams] = useState<DisasterParams>({
    type: 'hurricane',
    intensity: 3,
    location: defaultLocation
  });

  const [assessment, setAssessment] = useState<ImpactAssessment | null>(null);
  const [isEditingLocation, setIsEditingLocation] = useState(false);

  const handleCalculate = () => {
    const result = calculateImpact(params);
    setAssessment(result);
  };

  const handleLocationUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newLocation: Location = {
      name: formData.get('name') as string,
      population: Number(formData.get('population')),
      infrastructureDensity: Number(formData.get('infrastructureDensity')),
      averagePropertyValue: Number(formData.get('averagePropertyValue'))
    };
    setParams({ ...params, location: newLocation });
    setIsEditingLocation(false);
  };

  const getCasualtyRiskLevel = (risk: number): { label: string; color: string } => {
    if (risk < 20) return { label: 'Low', color: 'text-green-400' };
    if (risk < 40) return { label: 'Moderate', color: 'text-yellow-400' };
    if (risk < 60) return { label: 'High', color: 'text-orange-400' };
    if (risk < 80) return { label: 'Very High', color: 'text-red-400' };
    return { label: 'Severe', color: 'text-red-600' };
  };

  const formatRebuildingTime = (months: number): string => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) return `${months} months`;
    if (remainingMonths === 0) return `${years} ${years === 1 ? 'year' : 'years'}`;
    return `${years} ${years === 1 ? 'year' : 'years'}, ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
  };

  return (
    <div className="min-h-screen bg-[#000F0B] text-[#F0F2F0] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Calculator className="w-8 h-8 text-[#00E8CF]" />
          <h1 className="text-3xl font-bold text-[#00E8CF]">
            Disaster Impact Calculator
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="bg-[#112221] p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-6">Disaster Parameters</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block mb-2">Disaster Type</label>
                  <select 
                    className="w-full bg-[#054938] border border-[#094534] rounded p-2 text-[#F0F2F0]"
                    value={params.type}
                    onChange={(e) => setParams({...params, type: e.target.value as DisasterType})}
                  >
                    <option value="hurricane">Hurricane</option>
                    <option value="earthquake">Earthquake</option>
                    <option value="flood">Flood</option>
                    <option value="wildfire">Wildfire</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2">Intensity Level (1-10)</label>
                  <input 
                    type="range"
                    min="1"
                    max="10"
                    value={params.intensity}
                    onChange={(e) => setParams({...params, intensity: Number(e.target.value)})}
                    className="w-full accent-[#00E8CF]"
                  />
                  <div className="text-center mt-2">{params.intensity}</div>
                </div>
              </div>
            </div>

            <div className="bg-[#112221] p-6 rounded-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Location Details</h2>
                <button
                  onClick={() => setIsEditingLocation(!isEditingLocation)}
                  className="text-[#00E8CF] hover:text-[#3FEBD0] transition-colors"
                >
                  {isEditingLocation ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {isEditingLocation ? (
                <form onSubmit={handleLocationUpdate} className="space-y-4">
                  <div>
                    <label className="block mb-2">Location Name</label>
                    <input
                      name="name"
                      type="text"
                      defaultValue={params.location.name}
                      className="w-full bg-[#054938] border border-[#094534] rounded p-2 text-[#F0F2F0]"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Population</label>
                    <input
                      name="population"
                      type="number"
                      defaultValue={params.location.population}
                      className="w-full bg-[#054938] border border-[#094534] rounded p-2 text-[#F0F2F0]"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Infrastructure Density (0-1)</label>
                    <input
                      name="infrastructureDensity"
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      defaultValue={params.location.infrastructureDensity}
                      className="w-full bg-[#054938] border border-[#094534] rounded p-2 text-[#F0F2F0]"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Average Property Value (₹)</label>
                    <input
                      name="averagePropertyValue"
                      type="number"
                      step="1000"
                      defaultValue={params.location.averagePropertyValue}
                      className="w-full bg-[#054938] border border-[#094534] rounded p-2 text-[#F0F2F0]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#00E8CF] hover:bg-[#3FEBD0] text-[#000F0B] font-semibold py-2 px-4 rounded transition-colors mt-4"
                  >
                    Update Location
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#00E8CF]" />
                    <span>{params.location.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-[#00E8CF]" />
                    <span>{params.location.population.toLocaleString()} residents</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-[#00E8CF]" />
                    <span>{params.location.infrastructureDensity * 100}% infrastructure density</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Home className="w-5 h-5 text-[#00E8CF]" />
                    <span>₹{params.location.averagePropertyValue.toLocaleString()} avg. property value</span>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-[#22C55E] hover:bg-[#00BC4C] text-white font-semibold py-3 px-4 rounded transition-colors"
            >
              Calculate Impact
            </button>
          </div>

          <div className="bg-[#112221] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-6">Impact Assessment</h2>
            
            {assessment ? (
              <div className="space-y-6">
                <div className="p-4 bg-[#054938] rounded-lg">
                  <div className="flex items-center gap-4">
                    <IndianRupee className="w-8 h-8 text-[#00E8CF]" />
                    <div>
                      <div className="text-sm opacity-80">Economic Loss</div>
                      <div className="text-2xl font-semibold">
                        ₹{assessment.economicLoss.toLocaleString()}k
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#054938] rounded-lg">
                  <div className="flex items-center gap-4">
                    <Clock className="w-8 h-8 text-[#00E8CF]" />
                    <div>
                      <div className="text-sm opacity-80">Estimated Recovery Time</div>
                      <div className="text-2xl font-semibold">
                        {formatRebuildingTime(assessment.rebuildingTime)}
                      </div>
                      <div className="text-sm opacity-80 mt-1">
                        Based on infrastructure complexity and available resources
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#054938] rounded-lg">
                  <div className="flex items-center gap-4">
                    <Building2 className="w-8 h-8 text-[#00E8CF]" />
                    <div>
                      <div className="text-sm opacity-80">Infrastructure Impact</div>
                      <div className="text-2xl font-semibold">
                        {assessment.infrastructureImpact}%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#054938] rounded-lg">
                  <div className="flex items-center gap-4">
                    <AlertTriangle className="w-8 h-8 text-[#00E8CF]" />
                    <div>
                      <div className="text-sm opacity-80">Population at Risk</div>
                      <div>
                        <div className="text-2xl font-semibold flex items-center gap-2">
                          <span>{assessment.casualtyRisk}%</span>
                          <span className={`text-lg ${getCasualtyRiskLevel(assessment.casualtyRisk).color}`}>
                            ({getCasualtyRiskLevel(assessment.casualtyRisk).label})
                          </span>
                        </div>
                        <div className="text-sm opacity-80 mt-1">
                          {Math.round(params.location.population * (assessment.casualtyRisk / 100)).toLocaleString()} people potentially affected
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                Configure the disaster parameters and location details, then calculate to see the impact assessment
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}