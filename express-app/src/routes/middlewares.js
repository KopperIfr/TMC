// ---  middlewares.js  --- //

// Middleware that checks if there is connection to database
const connSucceed = (succeed) => {
    return (req, res, next) => {
        if(succeed) return next();
        return res.status(500).send('Fatal Error: Connection failed!');
    }
}


// Middleware that checks that the user is logged in.
const isLoggedIn = (req, res, next) => {
    if(req.session.userId) {
        next();
    } else {
        res.status(403).json({
            error: "You need to be logged in!"
        })
    }
}


// Middleware that checks if the user is already logged in.
const alreadyLogedIn = (req, res, next) => {
    if(!req.session.userId) {
        return next();
    }
    res.status(403).json({
        message: 'Already logged in!'
    })
}

module.exports = {
    connSucceed,
    isLoggedIn,
    alreadyLogedIn
}