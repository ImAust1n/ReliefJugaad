
import React from 'react';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

interface StakeholderSelectionProps {
  selectedStakeholders: string[];
  onChange: (selected: string[]) => void;
}

const stakeholderOptions = [
  { id: 'government', label: 'Government Agencies' },
  { id: 'medical', label: 'Medical Response Teams' },
  { id: 'ngos', label: 'NGOs & Relief Organizations' },
  { id: 'firefighters', label: 'Firefighters' },
  { id: 'police', label: 'Police & Security' },
  { id: 'volunteers', label: 'Volunteers' },
  { id: 'military', label: 'Military Support' },
  { id: 'media', label: 'Media Outlets' },
];

const StakeholderSelection = ({ selectedStakeholders, onChange }: StakeholderSelectionProps) => {
  const handleToggle = (id: string) => {
    if (selectedStakeholders.includes(id)) {
      onChange(selectedStakeholders.filter(item => item !== id));
    } else {
      onChange([...selectedStakeholders, id]);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stakeholderOptions.map((option) => (
        <div 
          key={option.id} 
          className="flex items-center space-x-2 bg-emergency-black p-2 rounded-lg border border-emergency-basil hover:border-emergency-mint transition-colors cursor-pointer"
          onClick={() => handleToggle(option.id)}
        >
          <Checkbox 
            id={`stakeholder-${option.id}`}
            checked={selectedStakeholders.includes(option.id)}
            onCheckedChange={() => handleToggle(option.id)}
            className="border-emergency-mint data-[state=checked]:bg-emergency-green data-[state=checked]:text-emergency-black"
          />
          <Label 
            htmlFor={`stakeholder-${option.id}`}
            className="text-emergency-white cursor-pointer"
          >
            {option.label}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default StakeholderSelection;
