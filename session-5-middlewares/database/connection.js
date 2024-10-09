
// --- connection.js --- //

import mongoose from 'mongoose'

const connectionDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to database!');
    } catch (error) {
        console.log('Error connecting to Database: ', error);
    }
}

export default connectionDB;