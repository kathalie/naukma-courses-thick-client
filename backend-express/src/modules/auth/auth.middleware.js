// auth.middleware.js
const jwt = require('jsonwebtoken');
const { jwtConstants } = require('../../common/constants');

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send({ message: 'Unauthorized' });

    jwt.verify(token, jwtConstants.secret, (err, user) => {
        if (err) return res.status(403).send({ message: 'Invalid token' });
        req.user = user;
        next(); 
    });
}

function authorizeAdmin(req, res, next) {
    if (req.user.role !== 'admin') return res.status(403).send({ message: 'Admin access required' });
    next();
}

module.exports = {
    authenticateToken,
    authorizeAdmin,
};
