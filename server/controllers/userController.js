
const { User, Role } = require('../models');

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
        const { name, email, password, role } = req.body;
        if(!name || !email || !password || !role) return res.status(400).json({ message: 'All fields are required' });
        const user = await User.create({ name, email, password, role });
        res.status(201).json({ user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) return res.status(400).json({ message: 'User ID is required' });
        const { name, email, password, role } = req.body;
        const user = await User.findByIdAndUpdate(userId, { name, email, password, role }, { new: true });
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
