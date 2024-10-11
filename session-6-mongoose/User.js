import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
    name: {

        // Type string required
        type: String,

        // Name required
        required: true,

        // Name will be saved in lowercase
        lowercase: true,

        // Name will be saved in uppercase
        uppercase: true,

        // Name must be unique
        unique: true,

        // Name will be Willson as default
        default: 'Willson',

        // Name cant be changed after being saved
        immutable: true,

        // Name minimum length is 4
        minLength: 4,

        // Name maximym length is 22
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