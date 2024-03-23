const { Vehicle } = require('../models');

const createVehicle = async (req, res) => {
    try {
        const { vehicleNumber, type, capacity } = req.body;
        if (!vehicleNumber || !type || !capacity) return res.status(400).json({ message: 'All fields are required' });
        const vehicle = await Vehicle.create({ vehicleNumber, type, capacity });
        res.status(201).json({ vehicle });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    createVehicle
};