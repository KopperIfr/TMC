
// --- middlewares.js --- //

const sayHello = (req, res, next) => {
    console.log('===================');
    console.log('Hello!');
    console.log('===================');
    next();
}

const isAdmin = (req, res, next) => {

    // We should actually use req.session
    if(req.body.id === 'is_admin') {
        console.log('Is admin!');
        next();
    } else {
        console.log('Not allowed!');
        res.status(403).send('Access forbidden');
    }
    
}

module.exports = {
    sayHello,
    isAdmin
}

