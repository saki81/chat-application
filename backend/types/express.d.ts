import { IUser } from "../src/models/user.model";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
    user?: IUser;
    userId?: string;
    cookies: {
      jwt?: string;
      [key: string]: any
    };
 
    }
  }
}


export {};