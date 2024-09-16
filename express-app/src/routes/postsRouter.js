
// --- router.js --- //

// Importing Router
const { Router } = require('express');

// Initializing Router
const router = Router();

// Importing controller
const postController = require('../controllers/postController.js');

// Importing middleware
const middleware = require('./middlewares.js');

// Defining routes
router.get('/posts', postController.getPosts);
router.get('/posts/:user_id', postController.getPostsFromUser);

// Exporting router
module.exports = router;