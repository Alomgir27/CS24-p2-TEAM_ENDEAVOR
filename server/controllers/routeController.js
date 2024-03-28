const { Route, StsEntry } = require('../models');

const createOptimizeRoutes = async (req, res) => {
    try {
        const { stsEntryId, landfillId, distance, cost, numberOfTrips, details } = req.body;
        if (!stsEntryId || !landfillId || !distance || !cost || !numberOfTrips) return res.status(400).json({ message: 'All fields are required' });
        const route = await Route.create({ stsEntryId, landfillId, distance, cost, numberOfTrips, details });
        await StsEntry.findByIdAndUpdate(stsEntryId, { isAllocated: true });
        res.status(201).json({ route });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getRoutes = async (req, res) => {
    try {
        //also populate stsEntryId.stsId and stsEntryId.vehicleId
        const routes = await Route.find()
            .populate('stsEntryId')
            .populate({
                path: 'stsEntryId',
                populate: {
                    path: 'stsId',
                    model: 'STS'
                }
            })
            .populate({
                path: 'stsEntryId',
                populate: {
                    path: 'vehicleId',
                    model: 'Vehicle'
                }
            })
            .populate('landfillId');
        res.status(200).json({ routes });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getRoute = async (req, res) => {
    try {
        const { routeId } = req.params;
        if (!routeId) return res.status(400).json({ message: 'Route ID is required' });
        const route = await Route.findById(routeId)
            .populate('stsEntryId')
            .populate({
                path: 'stsEntryId',
                populate: {
                    path: 'stsId',
                    model: 'STS'
                }
            })
            .populate({
                path: 'stsEntryId',
                populate: {
                    path: 'vehicleId',
                    model: 'Vehicle'
                }
            })
            .populate('landfillId')
            .populate({
                path: 'landfillId',
                populate: {
                    path: 'landfillManager',
                    model: 'User'
                }
            });
        res.status(200).json({ route });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}


module.exports = {
    createOptimizeRoutes,
    getRoutes,
    getRoute
};