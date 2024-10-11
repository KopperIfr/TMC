import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
    name: {

        type: String,

        required: true,

        lowercase: true,

        uppercase: true,

        unique: true,

        default: 'Willson',

        immutable: true,

        minLength: 4,

        maxLength: 22,
    },
    age: {
        type: Number,

        required: true,

        min: 1,

        max: 99,

        validate: {
            validator: (v) => v % 2 === 0
        }
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: props => `${props.value} is not a valid email!`
        }
    },
    bestFriend: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    hobbies: [String],
    address: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        }
    }
});

const User = mongoose.model('User', UserSchema);

export default User;