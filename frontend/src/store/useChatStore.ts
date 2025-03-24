import { create } from 'zustand';

export const useChatStore = create((set, get) => ({
  result: [],
  loading: false,
  error: null,
  
  fetchHello: async (message: string) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('http://127.0.0.1:5000/api/chat3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
      });
    //   console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
    //   console.log(data.response);
      set({ result: data.response, loading: false });
      return data.response;
    } catch (error) {
      console.error('Error fetching hello:', error);
      set({ error: error instanceof Error ? error.message : 'An unknown error occurred', loading: false });
      return null;
    }
  },  
}));

export default useChatStore;
