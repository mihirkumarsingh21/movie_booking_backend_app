import mongoose from "mongoose";

export const connectToDatabase = async () => {
    try {
        const mongodbUri = process.env.MONGODB_URI;
        if(!mongodbUri) {
            console.log(`mongodb uri not found in env file.`);
            throw new Error("mongodb uri not found in env file.");
        }

        const connectionResponse = await mongoose.connect(mongodbUri);
        console.log(`database connected successfully: ${connectionResponse.connection.host}`);
        
    } catch (error) {
        console.log(`failed to connect database: ${error}`);
        throw new Error("failed to connect database");
        
    }
}