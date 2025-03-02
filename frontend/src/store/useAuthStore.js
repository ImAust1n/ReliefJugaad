import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5001";

export const useAuthStore = create((set, get) => ({
    authUser:null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    socket: null,

    onlineUsers: [],

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            
            set({ authUser:res.data });
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({authUser:null})
        } finally {
            set({isCheckingAuth: false});
        }
    },

    signup: async (data) => {
        set({ isSigningUp:true });
        try {
            const res = await axiosInstance.post('/auth/signup', data);
            toast.success("Account created successfully");
            set({ authUser: res.data });

            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            // const res = await axiosInstance.post("/auth/login", data);
            // set({ authUser: res.data });

            console.log(data);

            set({ authUser: data });
            toast.success("Logged in successfully");

            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            toast.error("Logging out...");
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
            get.disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
}));