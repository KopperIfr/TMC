import User from "../../models/User.js";
import jwt from 'jsonwebtoken';

const middleware = async (req, res, next) => {
    if (req.cookies.authToken) {
        if (!req.session.user) {
            try {
                const token = req.cookies.authToken;
                const decoded = jwt.verify(JSON.parse(token), process.env.JWT_SECRET_KEY);
                const user = await User.findById(decoded.id);
                req.session.user = {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
                return next();
            } catch (err) {
                console.error('Invalid token:', err.message);
                res.clearCookie('authToken');
                return res.status(401).send('Invalid token');
            }
        }
    }
    next();
}

export default middleware;
