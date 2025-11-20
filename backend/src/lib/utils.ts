import jwt from "jsonwebtoken";
import { Response } from "express"


export const generateToken = (userId: string, res: Response) => {
   const secret = process.env.JWT_SECRET
    if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
   const token = jwt.sign({userId}, secret, {
      expiresIn: "7d"
   });

   res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // miliseconds
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development"
   })


   return token;
}