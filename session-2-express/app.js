// 1. Imports..
import express from 'express';
import dotenv from 'dotenv';
import users from './database/users.js';

// Initializing vars..
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

// Requests..
app.get('/home/:id', (req, res) => {

    // 1. Url
    const url = req.url;

    // 2. Data
    const data = req.body;
    const { username, password } = req.body;


    // 3. Paramaters
    const { id } = req.params;


    // 4. Query
    const { query } = req.query;


    // 5. Sessions
    const { user } = req.session;

    // 6. Cookies
    const shoppingCart = req.cookies.shoppingCart;


    // 7. Method
    const method = req.method;


    res.status(200).json({
        user
    })



});

app.post('/search', (req, res) => {

    const { name } = req.query;

    const person = users.findByName(name);

    return res.json({
        person
    });

})


app.get('/users/:id/:username/:email', (req, res) => {
    const { id, username, email } = req.params;
    const user = users.findByEmailAndId(email, id);
    return res.json({
        user
    })
})


app.get('/about', (req, res) => {
    return res.send('About');
});


app.listen(PORT, () => {
    console.log(`Server listening to port: ${PORT}`);
});