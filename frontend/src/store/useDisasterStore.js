import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import axios from "axios";

const BASE_URL = "http://localhost:5001";
const NASA_API_URL = "https://eonet.gsfc.nasa.gov/api/v3/events"; // NASA Disaster API

export const useDisasterStore = create((set, get) => ({
    disasters: [],
    nasaDisasters: [],

    addDisaster: async (data) => {
        try {
            const res = await axiosInstance.post("/disasters/addDisaster", data);
            toast.success("Reported successfully");
            console.log("Disaster added successfully", res.data);
        } catch (error) {
            toast.error(error.response);
        }
    },

    getAllDisasters: async () => {
        try {
            // Fetch from local API
            const res = await axiosInstance.get("/disasters/all");
            const localDisasters = res.data;

            set({ disasters: localDisasters });

        } catch (error) {
            console.log("Error in Get All Disasters: ", error);
            return [];
        }
    },

    getNasaDisasters: async () => {
        try {
            // Fetch from NASA API
            const nasaResponse = await axios.get(NASA_API_URL);
            const nasaDisasters = nasaResponse.data.events.slice(0, 100).map((event, index) => ({
                id: `NASA-${index + 1}`,
                state: event.categories[0]?.title || "Unknown", // Using category as a placeholder for state
                coordinates: event.geometry[0]?.coordinates || [],
                type: event.categories[0]?.title || "Unknown Type",
            }));

            // Combine both local and NASA disasters
            console.log("NASA Disasters: ", nasaDisasters);
            set({ nasaDisasters: nasaDisasters });

        } catch (error) {
            console.log("Error in Get All Disasters: ", error);
            return [];
        }
    },

    closeDisaster: async (id) => {
        try {
            const res = await axiosInstance.post(`/disasters/closeDisaster/${id}`);
            toast.success("Disaster closed successfully");
        } catch (error) {
            toast.error(error.response);
        }
    }
}));
