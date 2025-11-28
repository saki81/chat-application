import { create } from "zustand"
import { apiInstance } from "../lib/axios";
import  toast  from "react-hot-toast";
import type { Chat} from "../types";
import { authStore } from "./authStore";


export const chatStore = create<Chat>((set, get) => ({
    messages: [],
    users: [],
    selectUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
       set({isUsersLoading: true});
     try {
       const res = await apiInstance.get("/message/users");
       set({users: res.data})
    } catch (error: any) {
       toast.error(error.response.data.message)
     } finally {
       set({isUsersLoading: false});
     }
   },
   
   getMessages: async (userId: string) => {
    set({isMessagesLoading: true})
     try {
       const res = await apiInstance.get(`/message/${userId}`);
       set({messages: res.data})
     } catch (error: any) {
       toast.error(error.response.data.message);
     } finally {
       set({isMessagesLoading: false})
     }
   },

   sendMessage: async (messageData) => {
     const { selectUser, messages } = get();
     try {
        const res = await apiInstance.post(`message/send/${selectUser?._id}`,messageData);
        set({ messages: [...messages, res.data] })
     } catch (error: any) {
        toast.error(error.response.data.message)
     }
   },

   subscribeToMessages: () => {
     const { selectUser } = get();
     if (!selectUser) return;

     const socket = authStore.getState().socket;

     socket?.on("newMessage", (newMessage) => {
        set({
          messages: [...get().messages, newMessage]
        })
     }) 
   },
   unsubscribeMessages: () => {
     const socket = authStore.getState().socket;
     socket?.off("newMessage")
   },

   setSelectUser: (selectUser) => set({ selectUser }),
}))
