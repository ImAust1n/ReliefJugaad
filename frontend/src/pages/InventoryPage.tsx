import React, { useState } from 'react';
import { Package, Droplet, ChevronFirst as FirstAid, Pizza, Plus, Trash2, AlertTriangle } from 'lucide-react';

interface InventoryItem {
  name: string;
  quantity: number;
  icon: React.ReactNode;
  threshold: number;
  inputValue: number;
  description: string;
  lastUpdated: string;
  category: string;
  unit: string;
}

const initialInventory: Record<string, InventoryItem> = {
  food: {
    name: 'Food Supplies',
    quantity: 45,
    inputValue: 0,
    icon: <Pizza className="w-6 h-6" />,
    threshold: 50,
    description: 'Non-perishable food items including canned goods, rice, and dry rations',
    lastUpdated: '2024-03-15',
    category: 'Essential',
    unit: 'boxes'
  },
  water: {
    name: 'Water Supply',
    quantity: 120,
    inputValue: 0,
    icon: <Droplet className="w-6 h-6" />,
    threshold: 100,
    description: 'Drinking water bottles and purification tablets',
    lastUpdated: '2024-03-14',
    category: 'Critical',
    unit: 'liters'
  },
  medical: {
    name: 'Medical Kits',
    quantity: 25,
    inputValue: 0,
    icon: <FirstAid className="w-6 h-6" />,
    threshold: 30,
    description: 'First aid supplies, emergency medications, and bandages',
    lastUpdated: '2024-03-13',
    category: 'Emergency',
    unit: 'kits'
  },
  misc: {
    name: 'Miscellaneous',
    quantity: 55,
    inputValue: 0,
    icon: <Package className="w-6 h-6" />,
    threshold: 40,
    description: 'Emergency supplies including blankets, flashlights, and batteries',
    lastUpdated: '2024-03-12',
    category: 'Support',
    unit: 'items'
  },
};

function InventoryPage() {
  const [inventory, setInventory] = useState<Record<string, InventoryItem>>(initialInventory);

  const handleQuantityChange = (category: string, value: string) => {
    const newValue = parseInt(value) || 0;
    setInventory(prev => ({
      ...prev,
      [category]: { ...prev[category], inputValue: newValue }
    }));
  };

  const handleAdd = (category: string) => {
    const now = new Date().toISOString().split('T')[0];
    setInventory(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        quantity: prev[category].quantity + prev[category].inputValue,
        inputValue: 0,
        lastUpdated: now
      }
    }));
  };

  const handleClear = (category: string) => {
    const now = new Date().toISOString().split('T')[0];
    setInventory(prev => ({
      ...prev,
      [category]: { ...prev[category], quantity: 0, inputValue: 0, lastUpdated: now }
    }));
  };

  return (
    <div className="min-h-screen p-8 pt-20">
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
                  <div className="mt-2 h-2 bg-primary-green rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        item.quantity < item.threshold ? 'bg-primary-heading' : 'bg-primary-button'
                      }`}
                      style={{ width: `${Math.min((item.quantity / item.threshold) * 100, 100)}%` }}
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

export default InventoryPage
