import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { Request, Response, NextFunction } from "express";



export const protectedRoute = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const token = req.cookies.jwt;

      if(!token) {
       return res.status(401).json({message: "Unauthorized no token provided"})
      };

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {userId: string};

      if(!decoded) {
       return res.status(401).json({message: "Unauthorized token is not valid"});
      };

      const user = await User.findById(decoded.userId ).select("-password");
      
      if (!user) {
       return res.status(404).json({message: "User is not found"});
      };

      req.userId = user._id.toString();

      next();
   } catch (error) {
      const err = error as Error;
      console.log("Error in protect middleware", err.message);
      res.status(500).json({message: "Internal server error"})
   }
}