const Post = require('../models/Post.js');
const User = require('../models/User.js');

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            message: 'Internal Error: Retrieving posts failed!'
        })
    }
}


const getPostsFromUser = async (req, res) => {
    try {
        console.log(req.params.user_id);
        const posts = await Post.find({author: req.params.user_id});
        const user = await User.find({_id: req.params.user_id});
        res.status(200).json({
            success: true,
            data: {
                user: user,
                posts: posts
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Error: Failed getting posts from user!',
            error: error
        })
    }
}

const addPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = await Post.create({
            title,
            content, 
            author: req.session.userId,
            authorUsername: req.session.username
        });
        res.status(200).json({
            success: true,
            post: post
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Error: Failed adding a new Post!',
            error: error
        });
    }
}


const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.body.id);
        res.status(200).json({
            success: true,
            message: 'Post deleted!'
        })
    } catch (error) {
        res.send(500).json({
            success: true,
            message: 'Internal Error: Failed deleting post!',
            error: error
        })
    }
}

module.exports = {
    getPosts,
    getPostsFromUser,
    addPost,
    deletePost
}