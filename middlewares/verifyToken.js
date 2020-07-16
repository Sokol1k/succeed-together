const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (req.path == '/login' || req.path == '/register') {
        next();
    } else {
        const token = req.header('auth-token');
        if (!token) return res.status(401).send({ message: 'Access Denied' });
        try {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = verified.user;
            next();
        } catch (err) {
            res.status(403).send({ message: 'Invalid Token' });
        }
    }

}