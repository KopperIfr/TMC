// --- user router --- //

// Importing Router Object
import { Router } from "express";

// Initializing Router
const router = Router();

// Importing controller..
import userController from '../controllers/userController.js';
import isLoggedIn from '../utils/middlewares/isLoggedIn.js';

// Using middlewares..
//router.use(isLoggedIn);

// Router handling routes..
router.get('/', userController.loggedIn);
router.get('/sign-out', userController.signOut);
router.post('/sign-up', userController.signUp);
router.post('/sign-in', userController.signIn);

export default router;