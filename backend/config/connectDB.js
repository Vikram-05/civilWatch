import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()


if(!process.env.MONGOODB_URL){
    throw new Error(
        "please provide MONGOODB_URL in .env file"
    )
    // console.log("mongooDB error")
}

async function connectDB() {
    try {
        // Use mongoose.connect instead of mongoose.createConnection for a single connection
        await mongoose.connect(process.env.MONGOODB_URL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("MongoDB connection error: ", error);
        process.exit(1);
    }
}


export default connectDB