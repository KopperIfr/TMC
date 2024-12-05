import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validation from 'validator';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: validation.isEmail,
            message: 'Provide a valid email address!'
        }
    },
    password: {
        type: String,
        validate: {
            validator: (v) => {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
            },
            message: "Password not strong enough!"
        }
    },
    googleId: {
        type: String,
        default: null
    }
});

// Middleware to hash the password before saving it ( local strategy )
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords..
UserSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Custom validation to ensure that password is only required when googleId is null
UserSchema.path('password').validate(function (password){
    // If googleId doesnt exist, password is required
    if (!this.googleId && !password) {
        return false;
    }
    return true;
}, 'Password is required if not using Google OAuth');

export default mongoose.model('User', UserSchema);
