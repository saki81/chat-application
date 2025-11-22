import express from "express";
import authRoutes from "./routes/auth.route";
import messagesRoutes from "./routes/message.route";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connDB } from "./lib/db";
import cors from "cors";
import {  server, app } from "./lib/socket";

dotenv.config();



app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(cookieParser());
app.use(cors({
   origin: "http://localhost:5173",
   credentials: true,
}))

app.use("/api/auth", authRoutes);
app.use("/api/message", messagesRoutes);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
   console.log("Server is running " + PORT);
   connDB();
});