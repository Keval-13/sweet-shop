import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`)
        console.log(`DB connect with host: ${connection.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export {connectDB};