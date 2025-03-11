import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5001";

export const useNeedyStore = create((set, get) => ({
    needy: [],

    addNeedy: async (data) => {
        try {
            const res = await axiosInstance.post("/needy/add", data);
            toast.success("Reported successfully");
            console.log("Needy added successfully", res.data);
        } catch (error) {
            toast.error(error.response);
        }
    },
    getAllNeedy: async () => {
        try {
            const res = await axiosInstance.get("/needy/all");
            set({ needy: res.data });
            console.log("Needy fetched successfully", res.data);
        } catch (error) {
            console.log("Error in getAllNeedy: ", error);
            set({ needy: [] });
        }
    },

    closeRequest: async (id) => {
        try {
            const res = await axiosInstance.post(`/needy/close/${id}`);
            toast.success("Request closed successfully");
            console.log("Request closed successfully", res.data);
            get().getAllNeedy();
        } catch (error) {
            toast.error(error.response);
        }
    }
}));