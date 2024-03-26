
const { User, Role } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if(!userId) return res.status(400).json({ message: 'User ID is required' });
        const user = await User.findById(userId);
        res.status(200).json({ user });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const createUser = async (req, res) => {    
    try {
        const { username, email, password, role } = req.body;
        if (!username || !email || !password || !role) return res.status(400).json({ message: 'All fields are required' });
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword, role });
        res.status(201).json({ user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) return res.status(400).json({ message: 'User ID is required' });
        const { username, email, password, role } = req.body;
        const user = await User.findByIdAndUpdate(userId, { username, email, password, role }, { new: true });
        res.status(200).json({ user });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) return res.status(400).json({ message: 'User ID is required' });
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json({ roles });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const updateRoles = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) return res.status(400).json({ message: 'User ID is required' });
        const { role } = req.body;
        const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
        res.status(200).json({ user });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getRoles,
    updateRoles
};
