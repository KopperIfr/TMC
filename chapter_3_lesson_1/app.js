// Imports..
const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 3000

// Connecting to database..
const connectDB = require('./database/connection.js');
connectDB();

// Using middlewares..
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Importing routers..
const productRouter = require('./routes/productRouter.js');
app.use('/products', productRouter);

// Server listening..
app.listen(PORT, () => {
    console.log('Server listening on port:', PORT);
})


