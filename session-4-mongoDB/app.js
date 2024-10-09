// --- app.js --- //

// Imports..
import express from "express";
import dotenv from "dotenv";
import connectionDB from './database/connection.js';
import productsRouter from './routes/productsRouter.js';

dotenv.config();


// Initializing connection..
connectionDB();

const PORT = process.env.PORT || 3000;
const app = express();

// Middlewares..
app.use(express.json());

// Using routers..
app.use('/products', productsRouter);

// Server listening..
app.listen(PORT, () => {
    console.log("Server listening on port:", PORT);
});



