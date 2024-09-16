const connSucceed = (succeed) => {
    return (req, res, next) => {
        if(succeed) return next();
        return res.status(500).send('Fatal Error: Connection failed!');
    }
}

const isAuthenticated = (req, res, next) => {
    console.log('Authentification middleware..');
    if(req.session.userId) {
        next();
    } else {
        res.status(403).json({
            error: "You need to be logged in!"
        })
    }
}

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
    isAuthenticated,
    alreadyLogedIn
}