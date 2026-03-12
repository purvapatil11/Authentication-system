import mongoose from "mongoose";

export async function connect() {
    try {

        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL is not defined in .env.local");
        }

        await mongoose.connect(process.env.MONGO_URL);

        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB connected successfully");
        });

        connection.on("error", (err) => {
            console.log(
                "MongoDB connection error. Please make sure MongoDB is running. " + err
            );
            process.exit();
        });

    } catch (error) {
        console.log("Something went wrong");
        console.log(error);
    }
}