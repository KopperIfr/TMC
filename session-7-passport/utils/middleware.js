export default {
    isNotAuthenticated: (req, res, next) => {
        if(req.isUnauthenticated()) {
            return next();
        }
        res.status(403).json({
            message: 'Already logged in!'
        })
    }
}