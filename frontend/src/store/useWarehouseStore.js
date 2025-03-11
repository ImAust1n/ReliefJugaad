import { create } from 'zustand';

export const useWarehouseStore = create((set, get) => ({
  warehouses: [
    {
      id: 1,
      name: "Main Warehouse",
      location: "Gujarat",
      capacity: 10000,
      currentStock: 5000,
      latitude: 22.3039,
      longitude: 70.8022,
    },
    {
      id: 2,
      name: "Secondary Warehouse",
      location: "Kerala",
      capacity: 5000,
      currentStock: 2000,
      latitude: 10.5263,
      longitude: 76.2166,
    },
    {
      id: 3,
      name: "Emergency Warehouse",
      location: "Odisha",
      capacity: 2000,
      currentStock: 1000,
      latitude: 20.9925,
      longitude: 85.0206,
    },
    {
      id: 4,
      name: "Central Warehouse",
      location: "Maharashtra",
      capacity: 15000,
      currentStock: 8000,
      latitude: 19.0760,
      longitude: 72.8777,
    },
    {
      id: 5,
      name: "Coastal Warehouse",
      location: "Tamil Nadu",
      capacity: 7500,
      currentStock: 3500,
      latitude: 13.0827,
      longitude: 80.2707,
    }
  ],
  currentWarehouse: null,
  loading: false,
  error: null,

  addWarehouse: async (warehouseData) => {
    set({ loading: true });
    try {
      // Simulate API call by generating a unique ID
      const newWarehouse = {
        ...warehouseData,
        id: Date.now(), // Use timestamp as a unique ID
      };

      set((state) => ({
        warehouses: [...state.warehouses, newWarehouse],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  deleteWarehouse: async (warehouseId) => {
    set({ loading: true });
    try {
      set((state) => ({
        warehouses: state.warehouses.filter((warehouse) => warehouse.id !== warehouseId),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchWarehouses: async () => {
    set({ loading: true });
    try {
        set({loading:false});
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useWarehouseStore;
