// --- User.js --- //

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String, // Defines the type of username
        required: true, // Username is required
        unique: true, // Username must be unique
        minLength: 3 // Username's length must be at least 3
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    }
}, { timestamps: true });


const User = mongoose.model('User', UserSchema);

export default User;