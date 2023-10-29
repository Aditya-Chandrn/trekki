import mongoose from "mongoose";
import { config } from "dotenv";

config();
const MONGODB_URI = process.env.MONGODB_URI;

const ConnectMongoDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Connected to MongoDB database");
    } catch (error) {
        console.log("Error connecting MongoDB database \nERROR : ",error.message);
    }
}

export default ConnectMongoDB;