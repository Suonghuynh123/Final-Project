import dotenv from 'dotenv';

dotenv.config();

import mongoose from 'mongoose';


const connection = () => {
    mongoose
        .connect(process.env.MONGODB_URI)
        .then((result) => console.log("Connected to database"))
}

export default connection;