import mongoose from "mongoose";
import * as dotenv from 'dotenv'
dotenv.config()

export default function connectDB () {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log('MongoDB Connected'))
        .catch((e) => console.log(e))
}