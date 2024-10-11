import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (password) => {
                validator.isStrongPassword(password, {
                    minLength: 8,
                    minUppercase: 1,
                    minSymbols: 1,
                    minNumbers: 1
                })
            }
        }
    },
    googleId: {
        type: String
    },
    facebookId: {
        type: String
    }
});

// Hashear la contraseña antes de guardarla
UserSchema.pre('save', async (next) => {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(err);
    }
});

UserSchema.methods.comparePassword = async (password) => {
    return await bcrypt.compare(password, this.password);
}

export default mongoose.model('User', UserSchema);
