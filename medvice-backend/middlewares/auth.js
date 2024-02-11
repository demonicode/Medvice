const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
    const authorizationHeader = req.header("Authorization")

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({success: false, message: "Invalid authorization header"});
    }

    const token = authorizationHeader.replace("Bearer ", "")

    if (!token) {
        return res.status(401).json({message: 'Authentication required'});
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decodedToken.userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({message: 'Invalid token'});
    }
};

module.exports = {authenticate};
