import User from "../../models/User.js";
import jwt from 'jsonwebtoken';

const middleware = async (req, res, next) => {

    if(req.cookies.authToken) {
        if(!req.session.user) {
            console.log(req.cookies.authToken);
            const id = jwt.decode(req.cookies.authToken);
            console.log(id);
            res.send('hola');
        }
    }

}

export default middleware;