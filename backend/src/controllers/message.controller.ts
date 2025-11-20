import { Request, Response } from "express";
import User from "../models/user.model";
import Message from "../models/message.model";
import cloudinary from "../lib/cloudinary";


export const getUsersSidebar = async (req: Request, res: Response) => {
   try {
      const loggInUser = req.user?._id;
      // get all users except logged-in user
      const filterAllUsers = await User.find({ _id: {$ne: loggInUser}}).select("-password");

      res.status(200).json(filterAllUsers);
   } catch (error) {
      const err = error as Error;
      console.log("Sidebar users is error", err.message);
      res.status(500).json({message: "Internal server error"});
   }
};

export const getMessages = async (req: Request, res: Response) => {
   try {
      const {id: userToChat} = req.params;
      const myId = req.userId

      const messagess = await Message.find({
         $or: [
            {senderId: myId, receiverId: userToChat},
            {senderId: userToChat, receiverId: myId}
         ]
      });

      res.status(200).json(messagess)
   } catch (error) {
      const err = error as Error;
      console.log("Error in getMeassage", err.message);
      res.status(500).json({message: "Internal server error"})
   }
}

export const sendMessage = async (req: Request, res: Response) => {
   try {
      const { text, image } = req.body;
      const { id: receiverId } = req.params;
    
      const senderId = req.userId;

      let imageUrl;
      if(image) {
        // Uploud image to cloudinary
        const uploadRes = await cloudinary.uploader.upload(image);
        imageUrl = uploadRes.secure_url;
      }

      const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl,
      });

      await newMessage.save();

      // realtime functionality socket.io

      res.status(201).json(newMessage)
   } catch (error) {
      const err = error as Error;
      console.log("Error in sendMeassage", err.message);
      res.status(500).json({message: "Internal server error"})
   }
}