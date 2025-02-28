import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
    authUser:null,
    isSigningUp: false,
    isLoggingIn: false,
}));