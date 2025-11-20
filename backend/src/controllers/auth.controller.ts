import { Request, Response} from "express";
import User, { IUser } from "../models/user.model"; 
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils";
import  cloudinary  from "../lib/cloudinary";
import jwt from "jsonwebtoken";


interface JwtPayload {
  userId: string;
  iat?: number;
  exp?: number;
}

export const register = async (req:Request, res:Response) => {

    const { fullName, email, password } = req.body
    
   try {
      

      if(!fullName || !email || !password) {
         return res.status(404).json({ message: "All fields are required"})
      }

      const user = await User.findOne({email}) as IUser;
      if(user) return res.status(400).json({ message: "Email already exists" });

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      if(password.length < 4) {
         return res.status(400).json({ message: "Password must be at long 4 characters" });
      }

      const newUser = new User({
        fullName,
        email,
        password: hashPassword,
      }) ;

      

      if(newUser) {
         // generate token here
         generateToken(newUser._id.toString(), res);
         await newUser.save();
       console.log("Created at:", newUser.createdAt);   
 
        res.status(201).json({
           _id: newUser._id,
           fullName: newUser.fullName,
           email: newUser.email,
           profilePic: newUser.profilePic,
         });
      } else {
          res.status(400).json({ message: "Invalid user data" })
      }
      
      
   } catch (error) {
       const err = error as Error
       console.log("Register error", err.message);
      res.status(500).json({message: "Internal server error"})
      
   }
};

export const login = async (req: Request, res: Response) => {
   const {email, password} = req.body;
   try {
      const user = await User.findOne({ email });
      if(!user) {
         return res.status(400).json({message: "Invalid credentials"})
      };

      if(!email || !password) {
         return res.status(400).json({message: "All fields are required"})
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if(!isPasswordCorrect) {
         return res.status(400).json({message: "Invalid password"})
      }

      generateToken(user._id.toString(), res);

      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
        createdAt: user.createdAt
      })
   } catch (error) {
      const err = error as Error;
      console.log("Login is error", err.message);
      res.status(500).json({message: "Internal server error"});
   }
};

export const logout = async (req: Request, res: Response) => {
   try {
     res.cookie("jwt","",{maxAge: 0});
     res.status(200).json({message: "Logout is successfully"});
   } catch (error) {
     const err = error as Error;
     console.log("Logout is error", err.message);
     res.status(500).json({message: "Internal server error"});
   }
};

export const updateProfile = async (req: Request, res: Response ) => {
   try {
    const { profilePic, fullName } = req.body;

    const errors: { fullName?: string; profilePic?: string} = {}

    if (fullName !== undefined) {
     if (typeof fullName !== "string" || !fullName.trim()) {
     errors.fullName = "Please add name to form";
     } else if (fullName.length < 3) {
    errors.fullName = "Full name must be at least 3 characters.";
   }
 }
   if (profilePic && !profilePic.startsWith("data:image")) {
  return res.status(400).json({
    errors: { profilePic: "Invalid image format" },
  });
    
}

    if(Object.keys(errors).length > 0) {
      return res.status(400).json({errors})
    }

    const user = req.userId;
    if (!user) return res.status(401).json({message: "Unautorized"})

      const updateFields: { profilePic?: string; fullName?: string } = {}

      if (fullName) {
         updateFields.fullName = fullName;
      }

      if (profilePic ) {
          console.log("Uploading image to Cloudinary...");
         const uploadRes = await cloudinary.uploader.upload(profilePic);
         console.log("Cloudinary upload response:", uploadRes);
         updateFields.profilePic = uploadRes.secure_url;
      }
     
      const updateUser = await User.findByIdAndUpdate(
         user,
         updateFields,
         { new: true }
      ).select("-password");

      if (!updateUser) {
         return res.status(400).json({ message: "User not found" })
      }

     res.status(200).json(updateUser);
 
   } catch (error) {
     const err = error as Error;
     console.log("Profile pic updated is error", err.message);
    return res.status(500).json({message: "Internal server error"});
   }
};

export const checkAuth = async (req: Request, res: Response) => {
   try {
      const token = req.cookies.jwt;

      if (!token) return res.status(401).json({message: "Not authenticated"});

      const secret = process.env.JWT_SECRET as string;
      const decoded = jwt.verify(token, secret) as unknown as JwtPayload;

      const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

      res.status(200).json(user);
   } catch (error) {
      const err = error as Error;
     console.log("Error is checkAuth", err.message);
     res.status(500).json({message: "Internal server error"});
   }
}