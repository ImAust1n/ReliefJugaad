import React from 'react';
import { Trash2, MapPin } from 'lucide-react';

export function WarehouseCard({ warehouse, onDelete, deleteButton=true }) {

  return (
    <div className="bg-[#112221] rounded-lg p-6 shadow-lg relative">
      {deleteButton ? (
        <button
          onClick={() => onDelete(warehouse.id)}
          className="absolute top-4 right-4 text-[#F0F2F0] hover:text-red-500 transition-colors"
          aria-label="Delete warehouse"
        >
          <Trash2 size={20} />
        </button>
      ) : (
        <a
        className="absolute top-4 right-4 text-[#F0F2F0] hover:text-blue-500 transition-colors"
        aria-label="Show on map"
        href={`https://www.google.com/maps?q=${
          warehouse.latitude
        },${
          warehouse.longitude
        }&ll=20.5937,78.9629&z=5`}
        >
          <MapPin size={20}/>
        </a>
      )}

      <h3 className="text-[#00E8CF] text-xl font-semibold mb-4">{warehouse.name}</h3>

      <div className="space-y-2 text-[#F0F2F0]">
        <p><span className="text-[#3FEBD0]">Location:</span> {warehouse.location}</p>
        {deleteButton && <p><span className="text-[#3FEBD0]">Capacity:</span> {warehouse.capacity}</p>}
        {deleteButton && <p><span className="text-[#3FEBD0]">Current Stock:</span> {warehouse.currentStock}</p>}
        {deleteButton && <p><span className="text-[#3FEBD0]">Coordinates:</span> {warehouse.latitude}, {warehouse.longitude}</p>}
      </div>
    </div>
  );
}