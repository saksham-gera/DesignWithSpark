import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    jwt.verify(token, process.env.JWT_SECRET_CODE, (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid token');
        }
        req.user = decoded;
        next();
    });
};