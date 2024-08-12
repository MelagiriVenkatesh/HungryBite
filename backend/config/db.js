import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const url = process.env.DB_URL;
export const connectDB = async() => {
    await mongoose.connect(url)
        .then(() => 
            console.log("DB Connected!!!"));
}