

// --- myController.js --- //

// Importing our model..
import Users from "../models/User.js";


// Sign In User
export const signIn = async (req, res) => {
    const { username, password } = req.body;

    // Using Mongoose to find the user
    const user = await Users.findOne({ username, password });

    if (user) {
        res.status(200).json({
            message: 'User successfully signed in!',
            user
        });
    } else {
        res.status(401).json({
            message: 'Invalid username or password!'
        });
    }
};

// Sign Up User
export const signUp = async (req, res) => {
    const { username, email, password } = req.body;

    // Validate received data
    const result = validate(username, email, password);
    if (result !== true) return res.status(400).json({ success: false, message: result });

    // Check if the username already exists
    const userExists = await Users.findOne({ username });
    if (userExists) return res.status(409).json({ success: false, message: 'Username already exists!' });

    // Create new user
    await Users.create({ username, email, password });

    return res.status(201).json({
        success: true,
        message: 'User registered successfully!',
    });
};

// Get User by ID
export const getUserById = async (req, res) => {
    const { id } = req.params;

    // Find user by ID
    const user = await Users.findById(id);

    if (!user) {
        return res.status(404).json({ message: 'User not found!', userId: id });
    }

    res.status(200).json({
        message: 'User found!',
        user
    });
};

// Get All Users
export const getUsers = async (req, res) => {
    const users = await Users.find();

    if (users.length > 0) {
        return res.status(200).json({
            message: 'Users found!',
            users
        });
    }

    res.status(404).json({
        message: 'No users found!'
    });
};

// Update User
export const updateUser = async (req, res) => {
    const { username, email, password } = req.body;
    const { id } = req.params;

    const updatedUser = await Users.findByIdAndUpdate(
        id,
        { username, email, password },
        { new: true, runValidators: true }
    );

    if (!updatedUser) {
        return res.status(404).json({
            message: 'User not found!',
            userId: id
        });
    }

    res.status(200).json({
        message: 'User updated successfully!',
        updatedUser
    });
};

// Delete User
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    const deletedUser = await Users.findByIdAndDelete(id);

    if (!deletedUser) {
        return res.status(404).json({
            message: 'User not found!',
            userId: id
        });
    }

    res.status(200).json({
        message: 'User deleted!',
        deletedUser
    });
};
