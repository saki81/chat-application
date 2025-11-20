import { themes } from "../constants";
import { themeStore } from "../store/themeStore";
import type { Theme } from "../types";



const Settings = () => {

   const {theme, setTheme} = themeStore() 

 return ( 
     <main className="h-screen container mx-auto px-6 pt-32 lg:pt-40 max-w-2xl">
       <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl tracking-wide text-center">Theme</h2>
          <p className="text-lg tracking-wide  text-center text-base-content/80">Choose your thopic for your chat</p>
        </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 p-2 mt-6">
        {themes.map((t) => (
          <button
            key={t} 
            className= {`rounded-full  gap-1 p-1 my-2 mx-2 lg:my-4 lg:mx-4 ${theme ===  t 
              ? "bg-gray-500" 
              : "hover:bg-gray-500" }`}
            onClick={(() => setTheme(t as Theme))}>
       
             <div className="relative rounded-full h-10 overflow-hidden" data-theme={t}>
               <div className="absolute inset-0 grid grid-cols-2">
                 <div className="rounded-l-full bg-slate"></div>
                 <div className="rounded-r-full bg-primary"></div>
               </div> 
             </div>  
          </button>
         ))} 
          
       </div>
     </main>
  );
}
 
export default Settings;