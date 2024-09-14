
// --- userController.js --- //

// Importing the model User
const User = require('./models/User.js');

// Function that listens for POST request /users/regiser
const registerUser = (req, res) => {

    const {username, email, pwd} = req.body;

    const result = validating(username, email, pwd);

    if(result){ 
        User.registersNewUser();
        res.redirect('/register?message=User registered successfully!');
    }

    if(!result) {
        User.doesntRegisterNewUser();
        res.redirect('/register?message=Check formular fields!');
    }

}

// Function that handles POST /users/login
const loginUser = (req, res) => {
    const {username, pwd} = req.body;

    const result = User.confirmsUserExists(username) && User.confirmsPasswordIsCorrect(pwd);

    if(result) {

        const userData = User.fetchUserData(username);

        req.session.username = userData['username'];
        req.session.email = userData['email'];

        res.json(userData);

    }


}

module.exports= {
    registerUser,
    loginUser
}
