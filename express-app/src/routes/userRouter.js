
// --- users router.js --- //

// Importing Router
const { Router } = require('express');

// Initializing Router
const router = Router();

// Importing controller
const userController = require('../controllers/userController.js');
const postController = require('../controllers/postController.js');

// Importing middleware
const middleware = require('./middlewares.js');

// Defining routes
router.get('/logout', middleware.isLoggedIn, userController.logoutUser);
router.get('/:user_id', userController.getUser);

router.post('/login', middleware.alreadyLogedIn, userController.loginUser);
router.post('/register', userController.registerUser);
router.post('/add/post', middleware.isLoggedIn, postController.addPost);

router.put('/update', middleware.isLoggedIn, userController.updateUser);

router.delete('/delete/post', middleware.isLoggedIn, postController.deletePost);

// Exporting router
module.exports = router;