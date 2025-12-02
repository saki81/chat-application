import { X } from "lucide-react"
import { authStore } from "../store/authStore";
import { chatStore } from "../store/chatStore";


const ChatHeader = () => {

  const { selectUser, setSelectUser } = chatStore();
  const { onlineUsers} = authStore()

 return ( 
     <div className="p-2.5 border-b border-base-300">
       <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
           {/* avatar */}
           <div className="avatar">
             <div className="size-10 rounded-full relative">
               <img src={selectUser?.profilePic || "/avatar.png"} alt={selectUser?.fullName}/>
             </div>
           </div>

           {/* user info */}
           <div>
              <h3 className="font-medium">{selectUser?.fullName}</h3>
              <p className="text-sm text-base-content/70">
              {selectUser && onlineUsers.includes(selectUser._id) ?
                 "Online" : "Offline"
                } 
              </p>
           </div>
         </div>
         {/* close */}
          <button onClick={() => setSelectUser(null)}>
           <X/>
          </button>
       </div>
     </div>
  );
}
 
export default ChatHeader;