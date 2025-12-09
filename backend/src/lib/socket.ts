import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);



const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"]
    }
});

const usersSocket:  Record<string, string> = {};

export function getReceiverSocketId(userId: string){
   return usersSocket[userId] 
}

io.on("connection", (socket) => {
   console.log("User connected", socket.id );

   const userId = socket.handshake.query.userId as string;
   
   if (userId) usersSocket[userId] = socket.id;
   
   io.emit("getOnlineUsers",Object.keys(usersSocket));

   socket.on("typing",(data) => {
      
      const { receiverId, isTyping } = data;
      const receiverSocketId = usersSocket[receiverId];
      
      if (receiverSocketId) {     
         io.to(receiverSocketId).emit("userTyping", {
            senderId: userId,
            isTyping
         });
         
      }
   })
   socket.on("disconnect", () => {
      delete usersSocket[userId];
      io.emit("getOnlineUsers", Object.keys(usersSocket))
   });

});


export { io, app, server };