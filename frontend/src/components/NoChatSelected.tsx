import { MessageCircle } from "lucide-react";

const NoChatSelected = () => {
 return ( 
     <div className="flex items-center justify-center flex-col w-full">
        <div className="max-w-md text-center">
          {/* icon */}
          <div className="flex items-center gap-4 mb-6">
           <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center animate-pulse">
           <MessageCircle className="w-10 h-10 text-primary "/> 
           </div>
          </div>
         </div>

         {/*Welcome text*/}
         <h2 className="text-2xl tracking-wide">Welcome to Chat</h2>
         <p className="text-md tracking-wide">Select a chat user in the sidebar</p>
     </div>
  );
}
 
export default NoChatSelected;