const { Vehicle } = require('../models');

const createVehicle = async (req, res) => {
    try {
        const { vehicleNumber, type, capacity, fuelCostLoaded, fuelCostUnloaded, details } = req.body;
        if (!vehicleNumber || !type || !capacity || !fuelCostLoaded || !fuelCostUnloaded) return res.status(400).json({ message: 'All fields are required' });
        const vehicle = await Vehicle.create({ vehicleNumber, type, capacity, fuelCostLoaded, fuelCostUnloaded, details });
        res.status(201).json({ vehicle });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ isAllocated: false });
        res.status(200).json({ vehicles });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    createVehicle,
    getVehicles
};