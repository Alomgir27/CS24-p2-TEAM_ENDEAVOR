//middlewares/isAuthenticated.js
const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied' });
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = await User.findById(verified._id);
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
}

