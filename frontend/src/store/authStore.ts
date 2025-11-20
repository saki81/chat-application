import { create } from "zustand";
import { apiInstance } from "../lib/axios";
import type { Auth } from "../types";
import  toast  from "react-hot-toast";



export const authStore = create<Auth>((set) => ({
    authUser: null,
    isRegister: false,
    isLogin: false,
    isUpdateProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],

    checkAuth: async () => {
       try {
         const res = await apiInstance.get("/auth/check", {withCredentials: true});
         set({ authUser: res.data});

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
       } catch (error: any) {
          toast.error(error.res.data.message)
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
    }
}));