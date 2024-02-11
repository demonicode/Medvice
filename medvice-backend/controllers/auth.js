const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Register a new user
const register = async (req, res, next) => {
    const {name, email, password, patientId} = req.body;

    try {
        const user = new User({name, email, password, patientId});
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1 hour'});
        await user.save();

        res.json({
            code: 201,
            message: 'User created',
            token: token
        });
    } catch (error) {
        next(error);
    }
};

// Login with an existing user
const login = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) {
            return res.status(401).json({message: 'Incorrect password'});
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY, {
            expiresIn: '1 hour'
        });
        res.json({code: 201, token: token});
    } catch (error) {
        next(error);
    }
};

module.exports = {register, login};
