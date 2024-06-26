const { STS, StsEntry, User, Vehicle } = require('../models');
const axios = require('axios');

const createSTS = async (req, res) => {
    try {
        const { wardNumber, capacity, gpsCoordinates, stsManager, vehicleEntries, details } = req.body;
        if (!wardNumber || !capacity || !gpsCoordinates || !stsManager) return res.status(400).json({ message: 'All fields are required' });
        // let position = { coords: { latitude: gpsCoordinates[1], longitude: gpsCoordinates[0] } };
        // let location = 'Unknown';
        // try {
        //    const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
        //     location = res.data.display_name || 'Unknown';
        // } catch (err) {
        //     console.log(err);
        // }

        const sts = await STS.create({ wardNumber, capacity, gpsCoordinates: { type: 'Point', coordinates: gpsCoordinates }, stsManager, vehicleEntries, details });
        //update vehicle isAllocated field to true
        if (vehicleEntries.length > 0) {
            console.log(vehicleEntries);
            vehicleEntries.forEach(async (vehicleId) => {
                await Vehicle.findByIdAndUpdate(vehicleId, { isAllocated: true }, { new: true });
            });
        }
        res.status(201).json({ sts });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getSTS = async (req, res) => {
    try {
        const { _id } = req.user;
        const { role } = req.user;
        if (role === 'System Admin') {
            const sts = await STS.find({}).populate('stsManager').populate('vehicleEntries');
            res.status(200).json({ sts });
        } else {
            const sts = await STS.find({ stsManager: { $in: [_id] } }).populate('stsManager').populate('vehicleEntries');
            res.status(200).json({ sts });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


const getStsEntries = async (req, res) => {
    try {
        const { _id } = req.user;
        //this _id is stsManager id or role is System Admin
        const user = await User.findById(_id);
        if (!user) return res.status(400).json({ message: 'User not found' });
        if (user?.role === 'System Admin') {
            const sts = await STS.find({}).populate('stsManager').populate('vehicleEntries');
            const stsIds = sts.map(sts => sts._id);
            const stsEntries = await StsEntry.find({ stsId: { $in: stsIds } }).populate('stsId').populate('vehicleId');
            return res.status(200).json({ stsEntries });
        } else {
            const sts = await STS.find({ stsManager: { $in: [_id] } }).populate('stsManager').populate('vehicleEntries');
            const stsIds = sts.map(sts => sts._id);
            const stsEntries = await StsEntry.find({ stsId: { $in: stsIds } }).populate('stsId').populate('vehicleId');
            res.status(200).json({ stsEntries });
        }
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

const addStsEntry = async (req, res) => {
    try {
        const { stsId, vehicleId, volume, timeOfArrival, timeOfDeparture, details } = req.body;
        console.log(req.body);
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
    addStsEntry,
    getSTS,
    getStsEntries
};
