const jwt = require('jsonwebtoken');

exports.isAdmin = (req, res, next) => {
    if (req.userData.admin) {
        next();
    } else {
        return res.status(401).json({
            message: 'Authorization Failed.'
        });
    }
};

exports.isLoggedIn = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Authorization Failed.'
        });
    }
};