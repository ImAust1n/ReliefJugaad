import React, { useState } from 'react';

const NGOPage = () => {
  const [warehouseName, setWarehouseName] = useState('');
  const [disasterArea, setDisasterArea] = useState('');
  const [supplyType, setSupplyType] = useState('');
  const [stockUpdate, setStockUpdate] = useState('');
  const [inventory, setInventory] = useState({ supplies: [], stocks: [] });

  const handleAddWarehouse = () => {
    alert(`Warehouse "${warehouseName}" added successfully!`);
    setWarehouseName('');
  };

  const handleSelectDisasterArea = () => {
    alert(`Disaster area "${disasterArea}" selected for aid distribution.`);
    setDisasterArea('');
  };

  const handleRequestSupplies = () => {
    const updatedSupplies = [...inventory.supplies, supplyType];
    setInventory({ ...inventory, supplies: updatedSupplies });
    alert(`Supplies requested: ${supplyType}`);
    setSupplyType('');
  };

  const handleUpdateStocks = () => {
    const updatedStocks = [...inventory.stocks, stockUpdate];
    setInventory({ ...inventory, stocks: updatedStocks });
    alert(`Stock updated: ${stockUpdate}`);
    setStockUpdate('');
  };

  return (
    <div className="dashboard grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5 pt-18">
      {[ 
        { title: "Add & Manage Warehouses", value: warehouseName, setValue: setWarehouseName, action: handleAddWarehouse, placeholder: "Warehouse Name", button: "Add Warehouse" },
        { title: "Select Disaster Area", value: disasterArea, setValue: setDisasterArea, action: handleSelectDisasterArea, placeholder: "Disaster Area", button: "Select Area" },
        { title: "Request Relief Supplies", value: supplyType, setValue: setSupplyType, action: handleRequestSupplies, placeholder: "Supply Type", button: "Request Supplies" },
        { title: "Update Resource Stocks", value: stockUpdate, setValue: setStockUpdate, action: handleUpdateStocks, placeholder: "Stock Update", button: "Update Stocks" }
      ].map((card, index) => (
        <div key={index} className="dashboard-card border border-green-900 p-5 rounded-lg shadow-md text-center bg-green-900">
          <h3 className="border-b-2 border-teal-400 pb-2 text-teal-400">{card.title}</h3>
          <input
            type="text"
            placeholder={card.placeholder}
            value={card.value}
            onChange={(e) => card.setValue(e.target.value)}
            className="w-full p-2 mt-2 border border-green-900 rounded bg-gray-200 text-black"
          />
          <button
            onClick={card.action}
            className="bg-green-500 text-gray-200 border-none px-4 py-2 rounded mt-3 hover:bg-green-600 transition"
          >
            {card.button}
          </button>
        </div>
      ))}
      <div className="dashboard-card border border-green-900 p-5 rounded-lg shadow-md text-center bg-green-900 col-span-1 md:col-span-2 lg:col-span-3">
        <h3 className="border-b-2 border-teal-400 pb-2 text-teal-400">Inventory Management</h3>
        <p className="text-gray-200 mt-2">Manage relief supplies and update resource stocks in real-time.</p>
        <div>
          <h4 className="text-teal-400 mt-3">Requested Supplies:</h4>
          <ul>
            {inventory.supplies.map((supply, index) => (
              <li key={index} className="text-gray-200">{supply}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-teal-400 mt-3">Stock Updates:</h4>
          <ul>
            {inventory.stocks.map((stock, index) => (
              <li key={index} className="text-gray-200">{stock}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NGOPage;
