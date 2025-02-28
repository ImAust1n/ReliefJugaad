import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useGOVStore = create((set, get) => ({
    authGOV:null,
    isSigningUp: false,
    isLoggingIn: false,
}));