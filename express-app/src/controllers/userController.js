const User = require('../models/User.js');


const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.user_id);
        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Error: Failed getting user information!',
            error: error
        });
    }
}

const getLoggedInUser = async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Error: Failed getting user information!',
            error: error
        });
    }
}

const loginUser = async (req, res) => {
    try {

        const { username, password } = req.body;
        const user = await User.findOne({username});

        if(!user){ 
            return res.json({
                success: false,
                message: 'Invalid credentials!'
            });
        }

        const isMatch = await user.comparePassword(password);

        if(!isMatch) return res.status(401).json({
            success: false,
            message: 'Invalid credentials!'
        })

        req.session.userId = user._id;
        req.session.username = user.username;
        req.session.email = user.email;

        return res.status(200).json({
            success: true,
            message: 'Login succesfull'
        })

    } catch (error) {
        res.status(500).json({
            message: 'Internal Error: Login Failed!'
        });
    }
}

const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const user = await User.create({
            username: username,
            email: email,
            password: password
        });
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.log(error);
        res.status(200).json({
            error: error.message
        })
    }
}

const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            // Handle any error that occurs while destroying the session
            return res.status(500).json({
                success: false,
                message: 'Logout failed. Please try again.',
            });
        }

        // Send a success response
        return res.json({
            success: true,
            message: 'User logged out successfully!'
        });
    });
}


const updateUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.session.userId);
        res.status(200).json({
            success: true,
            message: 'User information updated!'
        })
    } catch (error) {
        res.send(500).json({
            success: true,
            message: 'Internal Error: Failed updating user information!',
            error: error
        })
    }
}

module.exports = {
    getUser,
    getLoggedInUser,
    loginUser,
    logoutUser,
    registerUser,
    updateUser
}