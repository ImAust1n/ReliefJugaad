import React, { useState } from 'react';
import { Package, AlertTriangle, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface InventoryItem {
  name: string;
  quantity: number;
  unit: string;
  threshold: number;
  lastUpdated: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  inputValue: string;
}

function RequirementPage() {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState<Record<string, InventoryItem>>({
    food: {
      name: 'Food',
      quantity: 100,
      unit: 'kg',
      threshold: 50,
      lastUpdated: '2023-11-15',
      description: 'Emergency food supplies',
      category: 'Supplies',
      icon: <Package />,
      inputValue: '',
    },
    water: {
      name: 'Water',
      quantity: 200,
      unit: 'liters',
      threshold: 100,
      lastUpdated: '2023-11-15',
      description: 'Emergency water supplies',
      category: 'Supplies',
      icon: <Package />,
      inputValue: '',
    },
    medicine: {
      name: 'Medicine',
      quantity: 50,
      unit: 'packs',
      threshold: 25,
      lastUpdated: '2023-11-15',
      description: 'Emergency medicine supplies',
      category: 'Supplies',
      icon: <Package />,
      inputValue: '',
    },
    miscellaneous: {
      name: 'Miscellaneous',
      quantity: 10,
      unit: 'items',
      threshold: 5,
      lastUpdated: '2023-11-15',
      description: 'Emergency miscellaneous supplies',
      category: 'Supplies',
      icon: <Package />,
      inputValue: '',
    }
  });

    const handleQuantityChange = (category: string, value: string) => {
    setInventory(prev => ({
      ...prev,
      [category]: { ...prev[category], inputValue: value },
    }));
  };

  const handleAdd = (category: string) => {
    const value = inventory[category].inputValue;
    if (!value || isNaN(Number(value))) {
      alert('Please enter a valid number.');
      return;
    }

    setInventory(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        quantity: prev[category].quantity + Number(value),
        inputValue: '',
        lastUpdated: new Date().toLocaleDateString(),
      },
    }));
  };

    const handleClear = (category: string) => {
        setInventory(prev => ({
            ...prev,
            [category]: { ...prev[category], quantity: 0, inputValue: '' }
        }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', inventory);
    alert('Request submitted successfully!');
    navigate('/gov-inventory');
  };

  return (
    <div className="min-h-screen bg-primary-black p-8 pt-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-primary-heading mb-2">Disaster Relief Inventory</h1>
        <p className="text-primary-text mb-8">Track and manage emergency supplies in real-time</p>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {Object.entries(inventory).map(([category, item]) => (
            <div
              key={category}
              className="bg-[#122212] rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-secondary-mint/20"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-secondary-forest rounded-lg text-secondary-mint">
                    {item.icon}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-primary-text">{item.name}</h2>
                    <span className="text-xs text-primary-text/70">{item.category}</span>
                  </div>
                </div>
                {item.quantity < item.threshold && (
                  <div className="flex items-center text-primary-heading">
                    <AlertTriangle className="w-5 h-5 mr-1" />
                    <span className="text-sm font-medium">LOW STOCK</span>
                  </div>
                )}
              </div>

              <p className="text-sm text-primary-text/80 mb-4">{item.description}</p>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={item.inputValue}
                    onChange={(e) => handleQuantityChange(category, e.target.value)}
                    className="flex-1 px-3 py-2 bg-secondary-forest border border-secondary-basil rounded-lg 
                             text-primary-text placeholder-primary-text/50 focus:outline-none focus:ring-2 focus:ring-primary-hover focus:border-transparent"
                    min="0"
                    placeholder={`Enter ${item.unit} to add`}
                  />
                  <button
                    onClick={() => handleAdd(category)}
                    className="p-2 bg-primary-button text-primary-white rounded-lg hover:bg-primary-hover transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleClear(category)}
                    className="p-2 bg-secondary-forest text-primary-white rounded-lg hover:bg-secondary-basil transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="bg-secondary-forest p-3 rounded-lg border border-secondary-basil">
                  <div className="flex justify-between items-center">
                    <span className="text-primary-text/80">Current Stock:</span>
                    <span className="font-semibold text-primary-text">
                      {item.quantity} {item.unit}
                    </span>
                  </div>
                  <div className="mt-2 h-2 bg-white rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300`}
                      style={{ width: `${Math.min((Number(item.quantity) / Number(item.threshold)) * 100, 100)}%`, backgroundColor: 'green' }}
                    />
                  </div>
                  <div className="mt-2 text-xs text-primary-text/60 text-right">
                    Last updated: {item.lastUpdated}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RequirementPage
