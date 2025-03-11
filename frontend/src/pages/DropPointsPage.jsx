import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { WarehouseCard } from '../components/WarehouseCard';
import { WarehouseForm } from '../components/WarehouseForm';
import useWarehouseStore from '../store/useWarehouseStore';

function WarehousePage() {
  const { warehouses } = useWarehouseStore();

  return (
    <div className="min-h-screen bg-[#000F0B] text-[#F0F2F0] pt-20 p-8">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-[#00E8CF] text-3xl font-bold">Warehouse</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {warehouses.map(warehouse => (
          <WarehouseCard
            key={warehouse.id}
            warehouse={warehouse}
            deleteButton={false}
            notUser={false}
          />
        ))}
          </div>
    </div>
  );
}

export default WarehousePage;
