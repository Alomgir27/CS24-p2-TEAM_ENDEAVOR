const { Role, Permission } = require('../models');

const createRole = async (req, res) => {
    try {
        const { name, description, permissions } = req.body;
        if (!name) return res.status(400).json({ message: 'Role name is required' });
        const role = await Role.create({ name, details: { description }, permissions });
        res.status(201).json({ role });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getRoles = async (req, res) => {
    try {
        const roles = await Role.find().populate('permissions');
        res.status(200).json({ roles });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getRole = async (req, res) => {
    try {
        const { roleId } = req.params;
        const role = await Role.findById(roleId).populate('permissions');
        res.status(200).json({ role });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


const updateRole = async (req, res) => {
    try {
        const { roleId } = req.params;
        const { name, description, permissions } = req.body;
        const role = await Role.findByIdAndUpdate(roleId, { name, details: { description }, permissions }, { new: true });
        res.status(200).json({ role });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const deleteRole = async (req, res) => {
    try {
        const { roleId } = req.params;
        await Role.findByIdAndDelete(roleId);
        res.status(200).json({ message: 'Role deleted successfully' });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const createPermission = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) return res.status(400).json({ message: 'Permission name is required' });
        const permission = await Permission.create({ name, details: { description } });
        res.status(201).json({ permission });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getPermissions = async (req, res) => {
    try {
        const permissions = await Permission.find();
        res.status(200).json({ permissions });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const updatePermission = async (req, res) => {
    try {
        const { permissionId } = req.params;
        const { name } = req.body;
        const permission = await Permission.findByIdAndUpdate(permissionId, { name }, { new: true });
        res.status(200).json({ permission });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const deletePermission = async (req, res) => {
    try {
        const { permissionId } = req.params;
        await Permission.findByIdAndDelete(permissionId);
        res.status(200).json({ message: 'Permission deleted successfully' });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const assignPermissions = async (req, res) => {
    try {
        const { roleId } = req.params;
        const { permissions } = req.body;
        const role = await Role.findByIdAndUpdate(roleId, { permissions }, { new: true });
        res.status(200).json({ role });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const assignRoles = async (req, res) => {
    try {
        const { userId } = req.params;
        const { roles } = req.body;
        const user = await User.findByIdAndUpdate(userId, { roles }, { new: true });
        res.status(200).json({ user });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    createRole,
    getRoles,
    getRole,
    updateRole,
    deleteRole,
    createPermission,
    getPermissions,
    updatePermission,
    deletePermission,
    assignPermissions,
    assignRoles
};