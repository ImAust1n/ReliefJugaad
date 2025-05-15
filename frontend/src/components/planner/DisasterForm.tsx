import React from 'react';
import { useState, useEffect } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface DisasterFormProps {
  onSubmit: (formData: DisasterFormData) => void;
}

export interface DisasterFormData {
  disasterType: string;
  location: string;
  severity: string;
  additionalNotes: string;
}

const DisasterForm = ({ onSubmit }: DisasterFormProps) => {
  const [formData, setFormData] = useState<DisasterFormData>({
    disasterType: '',
    location: '',
    severity: 'medium',
    additionalNotes: '',
  });
  const [formValid, setFormValid] = useState<boolean>(false);

  useEffect(() => {
    // Check if required fields are filled
    const isValid = formData.disasterType !== '' && formData.location !== '';
    setFormValid(isValid);
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formValid) {
      onSubmit(formData);
    }
  };

  // Get severity color for visual feedback
  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'low': return 'bg-emergency-mint/20 border-emergency-mint';
      case 'medium': return 'bg-yellow-400/20 border-yellow-400';
      case 'high': return 'bg-orange-500/20 border-orange-500';
      case 'critical': return 'bg-red-500/20 border-red-500';
      default: return 'bg-emergency-surface border-emergency-basil';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="disaster-type" className="text-emergency-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-emergency-caribbean" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Disaster Type *
          </Label>
          <Select 
            value={formData.disasterType} 
            onValueChange={(value) => setFormData({...formData, disasterType: value})}
          >
            <SelectTrigger 
              id="disaster-type"
              className={`bg-emergency-surface border-emergency-basil text-emergency-white focus:ring-emergency-mint focus:border-emergency-mint transition-all ${formData.disasterType ? 'border-emergency-mint' : ''}`}
            >
              <SelectValue placeholder="Select disaster type" />
            </SelectTrigger>
            <SelectContent className="bg-emergency-surface border-emergency-basil text-emergency-white">
              <SelectItem value="earthquake">Earthquake</SelectItem>
              <SelectItem value="flood">Flood</SelectItem>
              <SelectItem value="hurricane">Hurricane/Typhoon</SelectItem>
              <SelectItem value="wildfire">Wildfire</SelectItem>
              <SelectItem value="tsunami">Tsunami</SelectItem>
              <SelectItem value="tornado">Tornado</SelectItem>
              <SelectItem value="landslide">Landslide</SelectItem>
              <SelectItem value="volcano">Volcanic Eruption</SelectItem>
              <SelectItem value="pandemic">Pandemic</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location" className="text-emergency-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-emergency-caribbean" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Location *
          </Label>
          <Input 
            id="location" 
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            placeholder="City, Region, Country"
            className={`bg-emergency-surface border-emergency-basil text-emergency-white focus:ring-emergency-mint focus:border-emergency-mint transition-all ${formData.location ? 'border-emergency-mint' : ''}`}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="severity" className="text-emergency-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-emergency-caribbean" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Severity Level
        </Label>
        <Select 
          value={formData.severity} 
          onValueChange={(value) => setFormData({...formData, severity: value})}
        >
          <SelectTrigger 
            id="severity"
            className={`${getSeverityColor(formData.severity)} text-emergency-white focus:ring-emergency-mint transition-all`}
          >
            <SelectValue placeholder="Select severity level" />
          </SelectTrigger>
          <SelectContent className="bg-emergency-surface border-emergency-basil text-emergency-white">
            <SelectItem value="low" className="text-emergency-mint flex items-center">
              <span className="h-3 w-3 rounded-full bg-emergency-mint mr-2"></span>
              Low (Caution)
            </SelectItem>
            <SelectItem value="medium" className="text-yellow-400 flex items-center">
              <span className="h-3 w-3 rounded-full bg-yellow-400 mr-2"></span>
              Medium (Warning)
            </SelectItem>
            <SelectItem value="high" className="text-orange-500 flex items-center">
              <span className="h-3 w-3 rounded-full bg-orange-500 mr-2"></span>
              High (Danger)
            </SelectItem>
            <SelectItem value="critical" className="text-red-500 flex items-center">
              <span className="h-3 w-3 rounded-full bg-red-500 mr-2"></span>
              Critical (Emergency)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="additional-notes" className="text-emergency-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-emergency-caribbean" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Additional Notes
        </Label>
        <Textarea 
          id="additional-notes" 
          value={formData.additionalNotes}
          onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
          placeholder="Enter any relevant details about the emergency situation..."
          className="bg-emergency-surface border-emergency-basil text-emergency-white focus:ring-emergency-mint focus:border-emergency-mint min-h-[120px] transition-all"
        />
      </div>

      <div className="pt-6">
        <button 
          type="submit"
          disabled={!formValid}
          className={`w-full py-3 rounded-lg font-medium transition-all duration-300 shadow-lg flex items-center justify-center ${formValid ? 'bg-emergency-green hover:bg-emergency-meadow text-emergency-white' : 'bg-emergency-surface text-emergency-white/50 cursor-not-allowed'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Generate Action Plan
        </button>
        {!formValid && (
          <p className="text-xs text-emergency-caribbean mt-2 text-center">* Please fill in all required fields</p>
        )}
      </div>
    </form>
  );
};

export default DisasterForm;
