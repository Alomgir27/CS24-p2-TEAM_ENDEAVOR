const { Route, StsEntry, FleetAndVehicleDeployment } = require('../models');

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
        const { _id } = req.user;
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
        let filteredRoutes = routes;
        if (_id) {
            filteredRoutes = routes.filter(route => route.stsEntryId.stsId.stsManager.includes(_id));
        }
        res.status(200).json({ routes: filteredRoutes });
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


const deployVehicle = async (req, res) => {
    try {
        const { stsId, routeIds, deployTimeRange, totalDistance, totalWaste, totalVehicles, totalTrips, totalFuelCost } = req.body;
        if (!stsId || !routeIds || !deployTimeRange || !totalDistance || !totalWaste || !totalVehicles || !totalTrips || !totalFuelCost) return res.status(400).json({ message: 'All fields are required' });
        // console.log(req.body);
        const deployment = await FleetAndVehicleDeployment.create({ stsId, routeIds, deployTimeRange, totalDistance, totalWaste, totalVehicles, totalTrips, totalFuelCost });
        res.status(201).json({ deployment });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getDeployments = async (req, res) => {
    try {
        const deployments = await FleetAndVehicleDeployment.find()
            .populate('stsId')
            .populate({
                path: 'stsId',
                populate: {
                    path: 'stsManager',
                    model: 'User'
                }
            });
        res.status(200).json({ deployments });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    createOptimizeRoutes,
    getRoutes,
    getRoute,
    deployVehicle,
    getDeployments
};
