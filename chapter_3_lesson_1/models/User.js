

// --- User.js --- //

const mongoose = require('mongoose');
// Define the schema for a blog post
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
});

const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;



