import { Link } from "react-router-dom";
import { authStore } from "../store/authStore";
import { chatStore } from "../store/chatStore";
import { ArrowLeft, LogOut, MessageCircle, Settings, User } from "lucide-react";


const Navbar = () => {
 const {logout, authUser} = authStore();
 const { sidebarOpen, setSidebarOpen} = chatStore()

 return ( 
   <nav className=" fixed w-full backdrop-blur-lg bg-base-100 border-b border-base-300 top-0 z-40 bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/"className="flex items-centar gap-2.5 hover:opacity-80 transition-all">
              <div className="size-7 md:size-9 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-7 h-7 md:w-9 md:h-9 text-primary"/>
              </div>
              <h1 className="md:text-2xl font-bold py-0 md:py-1">Chat</h1>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            {/* back to sidebar */}
            {!sidebarOpen && (
             <button
               className="p-2 bg-base-200 rounded-2xl"
               onClick={() => setSidebarOpen(true)}>
              <ArrowLeft className="sm:hidden"/>
             </button>
            )}
            <Link to= "/settings" className="p-3 bg-base-200 rounded-2xl">
             <Settings className="size-5 cursor-pointer" />
           </Link> 

           {authUser && (
               <>
                 <Link to="/profile" className="p-3 bg-base-200 rounded-2xl">
                   <User className="size-5 cursor-pointer"/>
                 </Link>
                
                <button onClick={logout} className="p-3 bg-base-200 rounded-2xl">
                 <Link to="/login">
                   <LogOut className="size-5 cursor-pointer" />
                 </Link>
                 </button>
               </>
           )}
          </div>
         
        </div>
      </div>
   </nav> 
);
}
 
export default Navbar;