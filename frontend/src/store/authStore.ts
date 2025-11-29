import { create } from "zustand";
import { apiInstance } from "../lib/axios";
import type { Auth } from "../types";
import  toast  from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:5000";

export const authStore = create<Auth>((set, get) => ({
    authUser: null,
    isRegister: false,
    isLogin: false,
    isUpdateProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
       try {
         const res = await apiInstance.get("/auth/check", {withCredentials: true});
         set({ authUser: res.data});
         
         get().connectSocket;
       } catch (error) {
         console.log("Error in check auth", error)
       } finally {
         set({ isCheckingAuth: false })
       }
    },
    register: async (data) =>  {
      set({ isRegister: true})
      try {
         const res = await apiInstance.post("/auth/register",data);
         set({ authUser: res.data});
         toast.success("Account created succesfully");

         get().connectSocket();
      } catch (error: any) { 
         toast.error(error.response.data.message)   
      }
        finally {
         set({ isRegister: false })
       }
    },
    login: async (data) => {
      set({ isLogin: true})
      try {
         const res = await apiInstance.post("/auth/login", data);
         set({ authUser: res.data});
         toast.success("Log in succesfully");

         get().connectSocket();
      } catch (error: any) {
         toast.error(error?.response?.data?.message)
      }
        finally {
         set({ isLogin: false})
        }

    },
    logout: async () => {
       try {
          await apiInstance.post("/auth/logout");
          set({ authUser: null})
          toast.success("Logout is succesfully")

          get().disconnectSocket();
       } catch (error: any) {
          toast.error(error.res.data.message);
          set({ authUser: null})
       }
    },
    updateProfile: async (data: {fullName?: string; profilePic?: string }) => {
      set({ isUpdateProfile: true })
      try {
         const res = await apiInstance.put("/auth/update-profile",data);
         set({ authUser: res.data });
         toast.success("Profile updated successfully");
      } catch (error: any) {
         console.log("error in updated profile", error);

         const errors = error?.response?.data?.errors;

         if(errors?.fullName) {
            toast.error(errors.fullName);
         }

         if(errors?.profilePic) {
            toast.error(errors.profilePic);
         }

         if(!errors && error?.response?.data?.message) {
            toast.error(error.response.data.message);
         }
      
      }
      finally {
         set({ isUpdateProfile: false})
      }
    },

    connectSocket: () => {
      const { authUser, socket } = get();
       if (!authUser || socket?.connected) return;

       const newSocket = io(BASE_URL, {
         query: {
            userId: authUser._id,
         },
       });
       newSocket.connect();

       set({ socket: newSocket });

       newSocket.on("getOnlineUsers", (userIds: string[]) => {
          const auth = get().authUser;
          
          if (!auth) {
            set({ onlineUsers: userIds});
            return;
          }

          // Remove yourself from the list
          const filtered = userIds.filter((id) => id !== auth._id);
          set({ onlineUsers: filtered})
       })
    },
    disconnectSocket: () => {
       if (get().socket?.connected) get().socket?.disconnect()
    }
}));