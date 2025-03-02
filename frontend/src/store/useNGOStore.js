import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5001";

export const useNGOStore = create((set, get) => ({
    authNGO:null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/ngos/check");
            
            set({ authNGO:res.data });
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({authNGO:null})
        } finally {
            set({isCheckingAuth: false});
        }
    },

    signup: async (data) => {
        set({ isSigningUp:true });
        try {
            const res = await axiosInstance.post('/ngos/signup', data);
            toast.success("Account created successfully");
            set({ authNGO: res.data });
        } catch (error) {
            toast.error(error.response);
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/ngos/login", data);
            set({ authNGO: res.data });

            console.log(res.data);
            toast.success("Logged in successfully");

        } catch (error) {
            toast.error("Invalid credentials");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/ngos/logout");
            set({ authNGO: null });
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response);
        }
    },
}));