const {
    Dashboard
} = require('../models');

const getDashboard = async (req, res) => {
    try {
        const dashboard = await Dashboard.find();
        res.status(200).json({ dashboard });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    getDashboard
};