const { User } = require('../models');

const getProfile = async (req, res) => {
    try {
        const { _id } = req.user;
        const user = await User.findById(_id);
        res.status(200).json({ user });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const updateProfile = async (req, res) => {
    try {
        const { _id } = req.user;
        const { name, email } = req.body;
        const user = await User.findByIdAndUpdate(_id, { name, email }, { new: true });
        res.status(200).json({ user });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    getProfile,
    updateProfile
};