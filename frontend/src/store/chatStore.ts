import { create } from "zustand"
import { apiInstance } from "../lib/axios";
import  toast  from "react-hot-toast";
import type { Chat} from "../types";
import { authStore } from "./authStore";



export const chatStore = create<Chat>((set, get) => ({
    messages: [],
    users: [],
    authUser: null,
    selectUser: null,
    sidebarOpen: true,
    isUsersLoading: false,
    isMessagesLoading: false,
    typingUsers: {},
    typingTimeout: null,
    
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
        set({ messages: [...messages, res.data] });

        // Stop typing when message is sent 
        get().stopTyping()
     } catch (error: any) {
        toast.error(error.response.data.message)
     }
   },
   
   subscribeToMessages: () => {
     const { selectUser } = get(); 
     if (!selectUser) return;

     const socket = authStore.getState().socket;

     // Listen for new messages
     socket?.on("newMessage", (newMessage) => {
       const currentSelectUser = get().selectUser;
       const shouldAddMessage = 
             newMessage.senderId === currentSelectUser?._id ||
             newMessage.receiverId === currentSelectUser?._id;

          if(shouldAddMessage) {
             set({ messages: [...get().messages, newMessage] })
          }
     });
     // Listen for typing indicator
     socket?.on("userTyping",({ senderId, isTyping}) => {
        const currentSelectUser = get().selectUser;

        // Only update typing if it s from the currently select user
        if (senderId === currentSelectUser?._id) {
           set({ 
               typingUsers: 
                  {...get().typingUsers, 
                  [senderId]: isTyping
          }})
        }
     })
   },
   unsubscribeMessages: () => {
     const socket = authStore.getState().socket;
     socket?.off("newMessage");
     socket?.off("userTyping");
   },

   startTyping: () => {
     const { selectUser, typingTimeout} = get();
     if (!selectUser) return;

     const socket = authStore.getState().socket;
     const authUser = authStore.getState().socket;

     if (!socket || !authUser) return;

     if (typingTimeout) {
       clearTimeout(typingTimeout)
     }

     // Emit typing event
     socket.emit("typing", {
      receiverId: selectUser._id,
      isTyping: true
     });

     // Set timeout stop typing after 2 seconds of inactivity
     const timeout = setTimeout(() => {
       get().stopTyping();
     }, 2000);

     set({ typingTimeout: timeout })
   },

   stopTyping: () => {
     const { selectUser, typingTimeout} = get();
     if (!selectUser) return;

     const socket = authStore.getState().socket;

     if (typingTimeout) {
      clearTimeout(typingTimeout);
      set({ typingTimeout: null});
     }

     socket?.emit("typing", {
        receiverId: selectUser._id,
        isTyping: false
     })
   },

   isUserTyping: (userId: string): boolean => {
    const isTyping = get().typingUsers[userId] || false;
    return isTyping
    
   },

   setSelectUser: (selectUser) => { 
    console.log("Setting selected user:", selectUser)
     // stop typing when switching users
     get().stopTyping();

     get().unsubscribeMessages()

     set({ selectUser, typingUsers: {} });

     if (selectUser) {
      get().subscribeToMessages()
     }
    },
   setSidebarOpen: (value) => set({ sidebarOpen: value}),
   
})); 



