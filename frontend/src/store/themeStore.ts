import { create } from "zustand";
import type {Theme, ThemeState} from "../types";



export const themeStore = create<ThemeState>((set) => ({
   theme: (localStorage.getItem("chat-theme") as Theme) || "dark",
   setTheme:  (theme )=> {
   localStorage.setItem("chat-theme",theme)
   set({ theme });
  }
}));