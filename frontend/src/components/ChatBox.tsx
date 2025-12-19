import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons-loading/MessageSkeleton";
import { chatStore} from "../store/chatStore";
import { authStore } from "../store/authStore";
import { useEffect, useRef} from "react";
import { Ellipsis } from 'lucide-react';


const ChatBox = () => {

  const {
         messages, 
         getMessages, 
         isMessagesLoading, 
         selectUser,
         subscribeToMessages,
         unsubscribeMessages,
         isUserTyping} = chatStore();

  if (!selectUser) return null;
  
  const isTyping =  isUserTyping(selectUser?._id); 

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
      if (messageEndRef.current && messages ) {
        messageEndRef.current.scrollIntoView({ behavior: "smooth"})
      }
    }, [messages, isTyping])


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
              className={`chat ${ message.senderId === authUser?._id  ? "chat-end" : "chat-start"}`}
              ref={messageEndRef}
             >
           
                       <div className="text-gray-400 text-sm flex">
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
                
                {message.text && 
                   <p className="break-words whitespace-pre-wrap max-w-[240px]">
                       {message.text}
                   </p>}  
  
             </div>
            </div>      
         ))}  

      <div className= "text-gray-400  text-sm "> 
                  { isTyping && (<Ellipsis className=" size-10 animate-pulse space-y-4 forced-color-adjust-auto"/>)} <div/>               
            </div> 
        </div>
        <MessageInput />
      </div>
  );
}
 
export default ChatBox;