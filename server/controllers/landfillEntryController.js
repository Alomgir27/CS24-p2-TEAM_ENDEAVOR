const { LandfillEntry } = require('../models');

const createLandfillEntry = async (req, res) => {
    try {
        const { landfill, vehicleId, volume, timeOfArrival, timeOfDeparture, details } = req.body;
        if (!landfill || !vehicleId || !volume || !timeOfArrival || !timeOfDeparture) return res.status(400).json({ message: 'All fields are required' });
        const landfillEntry = await LandfillEntry.create({ landfill, vehicleId, volume, timeOfArrival, timeOfDeparture, details });
        res.status(201).json({ landfillEntry });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    createLandfillEntry
};