import { Schema, model, Types} from "mongoose";

export interface IUser  {
   _id: Types.ObjectId;
   fullName: string;
   email: string;
   password: string;
   profilePic?: string;
   createdAt?: Date;
   updatedAt?: Date;
}



const userSchema = new Schema<IUser>(
 {
  email: {
    type: String,
    required: true,
    unique: true
   },
  fullName: {
    type: String,
    required: true
   },
  password: {
    type: String,
    required: true,
    minlength: 4
  },
  profilePic: {
    type: String,
    default: ""
  },
 },
 { timestamps: true }
);

const User = model<IUser>("User", userSchema );

export default User;