import { Socket } from "socket.io-client";

export interface User {
   _id: string;
   email: string;
   fullName: string;
   profilePic: string;
   createdAt?:  string;
   token: string;
}

export interface RegisterUser {
   email: string;
   fullName: string;
   password: string;
}

export interface LoginUser {
   email: string;
   password: string;
}

export interface UpdateUser {
   fullName?: string;
   profilePic?:  string;
}

export interface OnlineUser {
    _id: string;
    userId: string;
   
}

export interface Auth {
   authUser: User | null;
   isCheckingAuth: boolean;
   isRegister: boolean;
   isLogin: boolean;
   isUpdateProfile: boolean;
   socket: Socket | null;
   checkAuth: () => Promise<void>;
   register: (data: RegisterUser) => Promise<void>;
   login: (data: LoginUser) => Promise<void>;
   logout: () => Promise<void>;
   updateProfile: (data: UpdateUser) => Promise<void>;
   onlineUsers: string[];
   connectSocket: () => void;
   disconnectSocket: () => void;
}

export type Theme = 
       "light" 
     | "dark" 
     | "corporate"
     | "dim"
     | "dracula"
     | "garden"
     | "sunset"
     | "retro";

export interface ThemeState {
   theme: Theme;
   setTheme: (theme: Theme) => void;
}

export interface Message {
   _id: string;
   senderId: string;
   receiverId: string;
   userId: string;
   text: string;
   image: string;
   createdAt: string;
   authUser: User | null
}

export interface MessageData {
   text: string;
   image?: string;
}

export interface Chat {
   messages: Message[];
   users: User[];
   selectUser: User | null;
   sidebarOpen: boolean;
   isUsersLoading: boolean;
   isMessagesLoading: boolean;
   getUsers: () => Promise<void>;
   getMessages: (userId: string) => Promise<void>;
   setSelectUser: (data: User | null ) => void;
   setSidebarOpen: (value: boolean) => void;
   sendMessage: (messageData: MessageData ) => Promise<void>;
   subscribeToMessages: () => void;
   unsubscribeMessages: () => void;
}


