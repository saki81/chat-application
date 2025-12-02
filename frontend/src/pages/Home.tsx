import { chatStore } from "../store/chatStore";
import NoChatSelected from "../components/NoChatSelected";
import ChatBox from "../components/ChatBox";
import SidebarUsers from "../components/SidebarUsers";


const Home = () => {

const {selectUser} = chatStore();


 return ( 
     <section className="h-screen bg-base-200">
       <div className="flex items-center pt-20 px-4">
        <div className="bg-base-100 rounded-2xl shadow-lg w-full max-w-7xl mx-auto h-[calc(100vh-6rem)]">
           <div className="flex h-full rounded-2xl overflow-hidden">
            <SidebarUsers />

           { !selectUser ? <NoChatSelected /> : <ChatBox/>}
           </div>
        </div>
       </div>
     </section>
  );
}
 
export default Home;