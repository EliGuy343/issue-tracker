import jwt from 'jsonwebtoken';
import config from 'config';

export default function(req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) {
        return res.status(401).json({msg:"no token, authorization denied"});
    }
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({msg:"token is invalid"});
    }

}

