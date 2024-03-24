const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const nodemailer = require('nodemailer');
require('dotenv').config();

//email sending
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) return res.status(400).json({ message: 'All fields are required' });
        const user = await User.create({ name, email, password, role });
        res.status(201).json({ user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'All fields are required' });
        const user = await User.findOne({
            email
        });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.status(400).json({ message: 'Invalid password' });

        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        res.header('Authorization', token).json({ token, user });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const logout = (req, res) => {
    res.header('Authorization', '').json({ message: 'Logged out successfully' });
}

const initiateResetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: 'Email is required' });
        const user = await User.findOne({
            email
        });
        if (!user) return res.status(400).json({ message: 'User not found' })

        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Password Reset',
            text: `Click on the link to reset your password: http://localhost:3000/reset-password/${token}`
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                res.status(400).json({ message: err.message });
            } else {
                res.status(200).json({ message: 'Reset link sent to email' });
            }
        });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const confirmResetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        if (!token || !password) return res.status(400).json({ message: 'All fields are required' });
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findById(verified._id);
        if (!user) return res.status(400).json({ message: 'User not found' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ message: 'Password reset successfully' });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        if(!oldPassword || !newPassword) return res.status(400).json({ message: 'All fields are required' });
        const user = await User.findById(req.user._id);
        const validPass = await bcrypt.compare(oldPassword, user.password);
        if (!validPass) return res.status(400).json({ message: 'Invalid password' });
        // Change password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ message: 'Password changed successfully' });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}
        
module.exports = {
    createUser,
    login,
    logout,
    initiateResetPassword,
    confirmResetPassword,
    changePassword
};
    