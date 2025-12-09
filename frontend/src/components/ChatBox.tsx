import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons-loading/MessageSkeleton";
import { chatStore} from "../store/chatStore";
import { authStore } from "../store/authStore";
import { useEffect, useRef} from "react";


const ChatBox = () => {

  const {
         messages, 
         getMessages, 
         isMessagesLoading, 
         selectUser,
         subscribeToMessages,
         unsubscribeMessages,
         isUserTyping} = chatStore();
  
  const isTyping = selectUser ? isUserTyping(selectUser._id) : false; 

  const { authUser } = authStore();
  const messageEndRef = useRef<HTMLDivElement | null>(null)


    
    useEffect(() => {
      if ( selectUser?._id) {
  
         getMessages(selectUser._id );

         subscribeToMessages();

         return () => unsubscribeMessages();
      } 

    },[selectUser, getMessages,subscribeToMessages, unsubscribeMessages]);




    useEffect(() => {
      if (messageEndRef.current && messages) {
        messageEndRef.current.scrollIntoView({ behavior: "smooth"})
      }
    }, [messages])


 if(isMessagesLoading) 
    return (
       <div className="flex flex-1 flex-col overflow-auto">
          <MessageSkeleton />
       </div>
    )

 return ( 
      <div className="flex-1 flex flex-col overflow-auto">
       <ChatHeader/>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`chat ${message.senderId === authUser?._id ? "chat-end" : "chat-start"}`}
              ref={messageEndRef}
             >
           
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                   <img 
                     src={
                      message.senderId === authUser?._id
                        ? authUser.profilePic || "/avatar.png"
                        : selectUser?.profilePic || "/avatar.png"
                     } 
                     alt="profile-pic" />
                </div>
               
              </div>

              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                 {message.createdAt && new Date(message.createdAt).toLocaleDateString('en-GB') }
                </time>
              </div>
             
              <div className="chat-bubble flex flex-col">
                 {message.image && (
                   <img 
                     src={message.image} 
                     alt="Attachment"
                     className="sm:max-w-[200px] rounded-md mb-2"/>
                 )}
                
                {message.text && <p>{message.text}</p>}  
  
              </div>
               { isTyping &&  <div  className="text-gray-400 text-sm pl-14 pb-2 animate-pulse">
                {selectUser?.fullName || "User"} is typing...
             </div>}
            </div>
           
          ))}  

      
  
  { <div ref={messageEndRef} /> }
        </div>
        <MessageInput />
      </div>
  );
}
 
export default ChatBox;