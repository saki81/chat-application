import mongoose from "mongoose";


export const connDB = async () => {
  try {
     const conn = await mongoose.connect(process.env.MONGODB_URI as string);
     console.log(`Mongo DB connected ${conn.connection.host}`)
  } catch (err) {
   
  }
}