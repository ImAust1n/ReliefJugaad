import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5001";

export const useGOVStore = create((set, get) => ({
    authGOV:null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/gov/check");
            
            set({ authGOV:res.data });
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({authGOV:null})
        } finally {
            set({isCheckingAuth: false});
        }
    },

    signup: async (data) => {
        set({ isSigningUp:true });
        try {
            const res = await axiosInstance.post('/gov/signup', data);
            toast.success("Account created successfully");
            set({ authGOV: res.data });
        } catch (error) {
            toast.error(error.response);
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/gov/login", data);
            set({ authGOV: res.data });

            console.log(data);
            toast.success("Logged in successfully");

        } catch (error) {
            toast.error("Invalid credentials");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/gov/logout");
            set({ authGOV: null });
        } catch (error) {
            toast.error(error.response);
        }
    },
}));