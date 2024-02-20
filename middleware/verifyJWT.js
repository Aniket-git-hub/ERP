import jwt from 'jsonwebtoken';
import CustomError from '../utils/createError.js';
import getEnvVariable from '../utils/env.js';

function verifyJWT(req, res, next) {
    let token;
    let secret;

    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1];
        secret = getEnvVariable('JWT_SECRET');
    } else {
        throw new CustomError('JsonWebTokenError', 'No token provided');
    }
    try {
        if (process.env.NODE_ENV === 'production') {
            const decoded = jwt.verify(token, secret);
            req.user = decoded;
        } else {
            req.user = { userId: 1 };
        }
        next();
    } catch (error) {
        next(new CustomError('JsonWebTokenError', 'Invalid token', error));
    }
}

export default verifyJWT;
