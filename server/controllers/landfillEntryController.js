const { LandfillEntry, Landfill, FleetAndVehicleDeployment } = require('../models');

const createLandfill = async (req, res) => {
    try {
        const { name, capacity, operationalTimespan, gpsCoordinates, landfillManager, details } = req.body;
        if (!name || !capacity || !operationalTimespan || !gpsCoordinates) return res.status(400).json({ message: 'All fields are required' });
        const landfill = await Landfill.create({ name, capacity, operationalTimespan, gpsCoordinates: { type: 'Point', coordinates: gpsCoordinates }, landfillManager, details });
        res.status(201).json({ landfill });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


const getLandfills = async (req, res) => {
    try {
        const { _id } = req.user;
        const landfills = await Landfill.find({ landfillManager: { $in: [_id] } }).populate('landfillManager');
        res.status(200).json({ landfills });
      
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getAllLandfills = async (req, res) => {
    try {
        const landfills = await Landfill.find().populate('landfillManager');
        res.status(200).json({ landfills });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const createLandfillEntry = async (req, res) => {
    try {
        const { landfillId, volume, timeOfArrival, timeOfDeparture, details } = req.body;
        if (!landfillId ||  !volume || !timeOfArrival || !timeOfDeparture) return res.status(400).json({ message: 'All fields are required' });
        const landfillEntry = await LandfillEntry.create({ landfill: landfillId, volume, timeOfArrival, timeOfDeparture, details });
        res.status(201).json({ landfillEntry });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getLandfillEntries = async (req, res) => {
    try {
        const landfillEntries = await LandfillEntry.find().populate('landfill');
        res.status(200).json({ landfillEntries });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getLandfillDetails = async (req, res) => {
    try {
        const fleetAndVehicleDeployment = await FleetAndVehicleDeployment.find()
            .populate('stsId')
            .populate('routeIds')
            .populate({
                path: 'routeIds',
                populate: {
                    path: 'landfillId',
                    model: 'Landfill'
                },
                populate: {
                    path: 'stsId',
                    model: 'STS'
                }
            });
        res.status(200).json({ fleetAndVehicleDeployment });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


module.exports = {
    createLandfill,
    getLandfills,
    createLandfillEntry,
    getAllLandfills,
    getLandfillEntries,
    getLandfillDetails
};