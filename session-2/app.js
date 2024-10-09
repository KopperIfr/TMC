// --- app.js --- //

import express from "express";

import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3000;

// Mock users database..
let users = [{id: 2837,username: 'john',email: 'john@gmail.com',password: 123}]

const app = express();

app.use(express.json());

app.get("/get-users", (req, res) => {
    res.status(200).json({message: 'Here are all the users!',users})
});

app.post('/add-user', (req, res) => {
    const { id, username, email, password } = req.body;
    const newUser = {id,username,email,password}
    users.push(newUser);
    res.status(200).json({message: 'New user added!',users})
});

app.put('/update-user/:id', (req, res) => {
    const id = req.params.id;
    const {username} = req.body;
    users.find((user) => {if(user.id == id) user.username = username});
    res.status(200).json({message: 'User updated successfully!',users})
});

app.delete('/delete-user/:id', (req, res) => {
    const id = req.params.id;
    const newUsers = users.filter((user) => {
        if(user.id != id) return user;
    })
    users = newUsers;
    res.status(200).json({message: 'User deleted successfully!',users})
});


// Server listening..
app.listen(PORT, () => {
    console.log("Server listening on port:", PORT);
});
