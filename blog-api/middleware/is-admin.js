module.exports = (req, res, next) => {
    if (req.userData.admin) {
        next();
    } else {
        return res.status(401).json({
            message: 'Authorization Failed.'
        });
    }
};