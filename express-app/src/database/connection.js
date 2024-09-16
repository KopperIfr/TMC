
// --- connection.js --- //

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to database!');
    } catch (error) {
        console.log('Error connecting to Database: ', error);
    }
}

module.exports = connectDB;