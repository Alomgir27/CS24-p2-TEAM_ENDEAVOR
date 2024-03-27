const { STS, StsEntry } = require('../models');

const createSTS = async (req, res) => {
    try {
        const { wardNumber, capacity, gpsCoordinates, stsManager, vehicleEntries, details } = req.body;
        if (!wardNumber || !capacity || !gpsCoordinates || !stsManager) return res.status(400).json({ message: 'All fields are required' });
        const sts = await STS.create({ wardNumber, capacity, gpsCoordinates: { type: 'Point', coordinates: gpsCoordinates }, stsManager, vehicleEntries, details });
        res.status(201).json({ sts });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const assignManager = async (req, res) => {
    try {
        const { stsId } = req.params;
        const { stsManager } = req.body;
        const sts = await STS.findByIdAndUpdate(stsId, { stsManager }, { new: true });
        res.status(200).json({ sts });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const addVehicleEntry = async (req, res) => {
    try {
        const { stsId, vehicleId, volume, timeOfArrival, timeOfDeparture, details } = req.body;
        if (!stsId || !vehicleId || !volume || !timeOfArrival || !timeOfDeparture) return res.status(400).json({ message: 'All fields are required' });
        const stsEntry = await StsEntry.create({ stsId, vehicleId, volume, timeOfArrival, timeOfDeparture, details });
        res.status(201).json({ stsEntry });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    createSTS,
    assignManager,
    addVehicleEntry
};
