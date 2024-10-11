const middleware = async (req, res, next) => {

    if(req.url === '/sign-out') {

        // If logged in
        if(req.session.user) return next();
    }

    if(req.url === '/sign-in' || req.url === '/sign-up') {
        
        // If not logged in
        if(!req.session.user) return next();
    }


    res.status(403).json({
        message: 'Forbiden'
    })

}

export default middleware;