import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useWarehouseStore } from '../store/useWarehouseStore';


export function WarehouseForm({onClose, onSuccess}: {onClose: () => void, onSuccess: () => void}) {
  const [formData, setFormData] = useState({
    name: '',
    district: '',
    state: '',
    location: '',
    latitude: '',
    longitude: '',
  });

  const {warehouses, addWarehouse, deleteWarehouse} = useWarehouseStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    addWarehouse(formData);
    onSuccess();
    setFormData({
      name: '',
      district: '',
      state: '',
      location: '',
      latitude: '', 
      longitude: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-[#112221] rounded-lg p-6 w-full max-w-md">
        <h2 className="text-[#00E8CF] text-2xl font-semibold mb-6">Add New Warehouse</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((field) => (
            <div key={field}>
              <label className="block text-[#3FEBD0] mb-1 capitalize">
                {field}
              </label>
              <input
                type="text"
                required
                value={formData[field as keyof typeof formData]}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  [field]: e.target.value
                }))}
                className="w-full px-3 py-2 rounded bg-[#054938] border border-[#094534] text-[#F0F2F0] focus:outline-none focus:border-[#00BC4C]"
              />
            </div>
          ))}
          
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="flex-1 bg-[#22C55E] hover:bg-[#00BC4C] text-white py-2 rounded transition-colors"
            >
              Add Warehouse
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[#054938] hover:bg-[#094534] text-[#F0F2F0] py-2 rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}