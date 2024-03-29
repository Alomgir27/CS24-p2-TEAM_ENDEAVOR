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
        const vehicles = await Vehicle.find();
        res.status(200).json({ vehicles });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getVehicle = async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
        res.status(200).json({ vehicle });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const updateVehicle = async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const { vehicleNumber, type, capacity, fuelCostLoaded, fuelCostUnloaded, details } = req.body;
        const vehicle = await Vehicle.findByIdAndUpdate(vehicleId, { vehicleNumber, type, capacity, fuelCostLoaded, fuelCostUnloaded, details }, { new: true });
        if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
        res.status(200).json({ vehicle });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const deleteVehicle = async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const vehicle = await Vehicle.findByIdAndDelete(vehicleId);
        if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
        res.status(200).json({ message: 'Vehicle deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    createVehicle,
    getVehicles,
    getVehicle,
    updateVehicle,
    deleteVehicle,
};