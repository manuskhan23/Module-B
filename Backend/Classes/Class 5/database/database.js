import mongoose from "mongoose";
import 'dotenv/config';

const DBConnect = () => {
    const uri = process.env.MONGO_URI;

    mongoose.connect(uri);

    mongoose.connection.on("connected", () => {
    console.log("mongodb connected successfully...");
    });

    mongoose.connection.on("error", (err) => {
    console.log("Mongo Error:", err);
    });
};

export default DBConnect;