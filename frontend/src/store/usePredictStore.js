import { create } from 'zustand';

export const usePredictStore = create((set) => ({
  result: null,
  loading: false,
  error: null,
  
  fetchHello: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('http://127.0.0.1:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: 'What should i do if i m stuck in an earthquake?' })
      });
      console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(data.response);
      set({ result: data.response, loading: false });
      return data;
    } catch (error) {
      console.error('Error fetching hello:', error);
      set({ error: error.message, loading: false });
      return null;
    }
  },
}));

export default usePredictStore;
