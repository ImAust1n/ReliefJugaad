import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { WarehouseCard } from '../components/WarehouseCard';
import { WarehouseForm } from '../components/WarehouseForm';
import useWarehouseStore from '../store/useWarehouseStore';

function WarehousePage(props) {
  const { warehouses, fetchWarehouses, deleteWarehouse } = useWarehouseStore();
  const [showForm, setShowForm] = useState(false);

  const handleFormSuccess = () => {
      setShowForm(false);
      fetchWarehouses();
  }

  return (
    <div className="min-h-screen bg-[#000F0B] text-[#F0F2F0] pt-20 p-8">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-[#00E8CF] text-3xl font-bold">Warehouse Management</h1>
          
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-[#22C55E] hover:bg-[#00BC4C] px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={20} />
            Add Warehouse
          </button>
        </div>

        {warehouses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-[#3FEBD0]">No warehouses added yet.</p>
            <p className="text-[#F0F2F0] mt-2">Click the button above to add your first warehouse.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {warehouses.map(warehouse => (
              <WarehouseCard
                key={warehouse.id}
                warehouse={warehouse}
                onDelete={() => deleteWarehouse(warehouse.id)}
              />
            ))}
          </div>
        )}

        {showForm && (
          <WarehouseForm
            onClose={() => setShowForm(false)}
            onSuccess={handleFormSuccess}
          />
        )}
      </div>
    </div>
  );
}

export default WarehousePage;