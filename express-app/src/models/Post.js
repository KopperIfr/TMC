const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 3
    },
    content: {
        type: String,
        required: true,
        minLength: 20,
        maxLength: 280
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    authorUsername: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;