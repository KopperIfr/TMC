// --- myController.js --- //

// Importing our model..
import Users from "../models/User.js";

export const signIn = (req, res) => {
    const { username, password } = req.body;
    const user = Users.find((user) => {
        if(user.username === username && user.password === password) {
            return user;
        }
    })
    if(user) {
        res.status(200).json({
            message: 'User successfully signed in!',
            user
        })
    }
}

export const signUp = async (req, res) => {

    // Extracting data from the body..
    const { username, email, password } = req.body;

    // Validating recived data..
    const result = validate(id, username, email, password);
    if(result !== true) return res.status(200).json({
        success: false,
        message: result
    })

    // Using model to check if username already taken
    // for that we use the method find()
    const user = await Users.find({username: username});
    if(user) return res.status(200).json({
        success: false,
        message: 'Username already exists!'
    })

    // When we insert data into the database
    // with mongoose, we use the method create()..
    await Users.create({
        username: username,
        email: email,
        password: password
    })

    return res.status(200).json({
        success: true,
        message: 'User registered successfully!',
    })
}

export const getUserById = (req, res) => {

    // Extracting user id from params
    const {id} = req.params;

    // Using our model to find that user..
    const user = Users.find((user) => {
        if(user.id == id) return user;
    })

    // If there isnt an user return user not found..
    if(!user) return res.status(404).json({
        message: `User not found!`,
        userId: id
    }) 

    // If there IS an user return the user..
    res.status(200).json({
        message: 'User found!',
        user
    })
    
}

export const getUsers = async (req, res) => {

    // Using our model to retrieve all users..

    const users = await Users.find();

    // Checking if there are users..
    if(users) {
        return res.status(200).json({
            message: 'Users found!',
            users
        })
    }

    // If not..
    res.status(200).json({
        message: 'No users found!'
    })
}

export const updateUser = async (req, res) => {

    // Extracting new user data from body..
    const {username, email, password} = req.body;

    // Extracting id from params..
    const {id} = req.params

    // Using our model to update data in our database
    // When using mongoose we have to use 
    // findByIdAndUpdate()..

    await Users.findByIdAndUpdate(id, {
        username: username,
        email: email,
        password: password
    })

    // If there was no user found to be updated..
    res.status(404).json({
        message: 'User not found!',
        userId: id
    })
}

export const deleteUser = async (req, res) => {
    // Extracting user id from params..
    const {id} = req.params;

    // Using our model to delete a specific
    // user using mongoose findByIdAndDelete()

    await Users.findByIdAndDelete(id);
    
    // Returning the updated User database..
    res.status(200).json({
        message: 'User deleted!',
        Users
    })
}


const validate = (args = []) => {
    console.log('Validating data..');
    setTimeout(1000, () => {console.log('Data validated!')})
}

