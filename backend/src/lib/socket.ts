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

export function getReceiverSocketId(userId: string){
   return usersSocket[userId]
}
// Used to store users who are online 
const usersSocket: Record<string, string> = {} // userId: socketId

io.on("connection", (socket) => {
   console.log("User connected", socket.id );

   const userId = socket.handshake.query.userId as string;
   if (userId) usersSocket[userId] = socket.id;

   // io.emit() is used to send events to all the connected clients
   io.emit("getOnlineUsers",Object.keys(usersSocket))

   socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
      delete usersSocket[userId];
      io.emit("getOnlineUsers", Object.keys(usersSocket))
   })
})


export { io, app, server };