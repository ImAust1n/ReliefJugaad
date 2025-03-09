import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5001";

export const useNeedyStore = create((set, get) => ({
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
            return res.data;
        } catch (error) {
            console.log("Error in getAllNeedy: ", error);
            return [];
        }
    }
}));