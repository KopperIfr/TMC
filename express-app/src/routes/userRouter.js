
// --- userRouter.js --- //

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
router.get('/logout', middleware.isAuthenticated, userController.logoutUser);
router.get('/:user_id', userController.getUser);

router.post('/login', middleware.alreadyLogedIn, userController.loginUser);
router.post('/register', userController.registerUser);
router.post('/add/post', middleware.isAuthenticated, postController.addPost);

router.put('/update', middleware.isAuthenticated, userController.updateUser);

router.delete('/delete/post', middleware.isAuthenticated, postController.deletePost);

// Exporting router
module.exports = router;