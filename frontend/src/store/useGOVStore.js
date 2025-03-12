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
    users: 0,
    userEmails: ["seemeadit21824@gmail.com", "akashkrgupta2904@gmail.com", "ynithya2@gmail.com"],

    setUsers: async () => {
        try {
            const res = await axiosInstance.get(`/users`);
            set({ users: res.data.length });
            set((state) => ({ userEmails: [...state.userEmails, ...res.data.map((user) => user.email)] }));
            console.log(res.data);
        } catch (error) {
            console.log("Error in setUsers:", error);
        }
    },

    sendEmail: async (email) => {
        try {
            const { userEmails } = get();
            
            if (email) {
                // Send to a specific email if provided
                const res = await axiosInstance.post(`${BASE_URL}/api/email/send`, { 
                    recipient_email: email,
                    subject: "Emergency Alert: Disaster Warning",
                    message: "This is an important alert regarding an ongoing disaster situation. Please take necessary precautions and follow official guidelines."
                });
                console.log(res.data);
                toast.success("Emergency alert email sent successfully");
            } else {
                // Send to all emails in the userEmails list
                let successCount = 0;
                for (const userEmail of userEmails) {
                    try {
                        await axiosInstance.post(`${BASE_URL}/api/email/send`, { 
                            recipient_email: userEmail,
                            subject: "Emergency Alert: Disaster Warning",
                            message: "This is an important alert regarding an ongoing disaster situation. Please take necessary precautions and follow official guidelines."
                        });
                        successCount++;
                    } catch (err) {
                        console.log(`Failed to send email to ${userEmail}:`, err);
                    }
                }
                
                if (successCount === userEmails.length) {
                    toast.success(`Emergency alerts sent to all ${successCount} recipients`);
                } else if (successCount > 0) {
                    toast.success(`Emergency alerts sent to ${successCount} out of ${userEmails.length} recipients`);
                } else {
                    toast.error("Failed to send any emergency alert emails");
                }
            }
        } catch (error) {
            console.log("Error in sendEmail:", error);
            toast.error("Failed to send emergency alert emails");
        }
    },
    
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