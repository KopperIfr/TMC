const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email address'
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        validate: {
            validator: (value) => {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
            },
            message: props => 'Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character'
        }
    }
}, { timestamps: true });

// Pre-save middleware to hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash if the password is new or modified
    try {
        const salt = await bcrypt.genSalt(10); // Generate salt
        this.password = bcrypt.hash(this.password, salt); // Hash the password with the salt
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare entered password with hashed password
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model('User', UserSchema);

module.exports = User;
