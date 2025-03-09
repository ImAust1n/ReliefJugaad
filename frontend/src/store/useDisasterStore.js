import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5001";

export const useDisasterStore = create((set, get) => ({
    disasters: [],

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
            const res = await axiosInstance.get("/disasters/all");
            const disasters = res.data;
            set({ disasters });
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