import { useEffect, useState } from "react";
import { chatStore } from "../store/chatStore";
import SidebarSkeleton from "./skeletons-loading/SidebarSkeleton";
import { Users } from "lucide-react";
import { authStore } from "../store/authStore";


const SidebarUsers = () => {

 const { users, selectUser, isUsersLoading,getUsers,setSelectUser, sidebarOpen, setSidebarOpen} = chatStore();

 const { onlineUsers, authUser} = authStore();
 const  [showOnlineOnly, setShowOnlineOnly] = useState<boolean>(false) ;


  useEffect(() => {
   getUsers()
 }, [getUsers]);

    const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;


 if (isUsersLoading) return <SidebarSkeleton/>



 return ( 
    <>
     <aside className={`h-full w-full sm:w-60 border-r border-base-300  flex-col transition-all duration-300 ${sidebarOpen ? "block" : "hidden"} sm:block`}>

      <div className="border-b border-base-300 w-full p-4">
        <div className="flex items-center gap-2">
           <Users className="w-6 h-6"/>
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
         {/* Online filter toogle*/}
         <div className="mt-3 flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input 
              type="checkbox" 
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm" /> 
          </label>
           <span className="text-xs text-zinc-500">({onlineUsers.length   } online)</span>
         </div>
       </div>

         {filteredUsers.filter(u => u._id !== authUser?._id).map((user) => (
           <button
             key={user._id}
             onClick={()=> {
               setSelectUser(user);

               if (window.innerWidth < 640) setSidebarOpen(false)
              }}
             className={`
               w-full p-3 flex gap-3
               hover:bg-base-300 transition-colors
               ${selectUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
              `}>
            
              <div className="relative md:mx-0 sm:mx-auto">
                <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                 <span 
                   className="absolute bottom-0 right-0 size-3 bg-green-500 
                    rounded-full ring-2 ring-zinc-900"/>
              )}
              </div>

              <div className="text-left min-w-0">
                 <div className="font-medium truncate">{user.fullName}</div>
                 <div className="text-sm text-zinc-400">
                    {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                 </div>
              </div>
           
           </button>   
         ))}

         {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">
              No online users
          </div>
         )} 
     </aside>
    </>
  );
}
 
export default SidebarUsers;