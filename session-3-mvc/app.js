// --- app.js --- //

// Imports..
import express from "express";
import dotenv from "dotenv";
import myController from './controllers/myController.js';
import connectionDB from './database/connection.js';

dotenv.config();

// Initializing connection..
connectionDB();

const PORT = process.env.PORT || 3000;
const app = express();

// Routes..
app.use(express.json());

app.get("/sign-up", myController.signUp);

app.post('/sign-in', myController.signIn);

app.put('/user/:id', myController.updateUser);

app.delete('/user/:id', myController.deleteUser);


// Server listening..
app.listen(PORT, () => {
    console.log("Server listening on port:", PORT);
});