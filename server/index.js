const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');
const app = express();
require('dotenv').config();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const {
    User,
    Vehicle,
    STS,
    LandfillEntry,
    OilAllocation,
    Dashboard,
    Route,
    StsEntry,
    Role,
    Permission,
    Landfill
} = require('./models');

//run the cron job every 5 minutes
cron.schedule('*/5 * * * *', async () => {
    try {
        const numOfUsers = await User.countDocuments();
        const numOfVehicles = await Vehicle.countDocuments();
        const numOfSTS = await STS.countDocuments();
        const numOfLandfills = await Landfill.countDocuments();
        const numOfRoutes = await Route.countDocuments();
        const allLandfillsLocations = await Landfill.find({}, { gpsCoordinates: 1 });
        const allStsLocations = await STS.find({}, { gpsCoordinates: 1 });
        const allVehicleMovements = await StsEntry.find({}, { timeOfArrival: 1, timeOfDeparture: 1 });
        const allCostData = await Route.find({}, { cost: 1 });
        const allDistanceData = await Route.find({}, { distance: 1 });
        const allVolumeData = await StsEntry.find({}, { volume: 1 });
        const allTimeData = await StsEntry.find({}, { timeOfArrival: 1, timeOfDeparture: 1 });
        if (await Dashboard.findOne()) {
            const dashboard = await Dashboard.findOne();
            dashboard.numOfUsers = numOfUsers;
            dashboard.numOfVehicles = numOfVehicles;
            dashboard.numOfSTS = numOfSTS;
            dashboard.numOfLandfills = numOfLandfills;
            dashboard.numOfRoutes = numOfRoutes;
            dashboard.allLandfillsLocations = allLandfillsLocations;
            dashboard.allStsLocations = allStsLocations;
            dashboard.allVehicleMovements = allVehicleMovements;
            dashboard.allCostData = allCostData;
            dashboard.allDistanceData = allDistanceData;
            dashboard.allVolumeData = allVolumeData;
            dashboard.allTimeData = allTimeData;
            await dashboard.save();
            console.log('Dashboard updated successfully');
            return;
        }
        await Dashboard.create({
            numOfUsers,
            numOfVehicles,
            numOfSTS,
            numOfLandfills,
            numOfRoutes,
            allLandfillsLocations,
            allStsLocations,
            allVehicleMovements,
            allCostData,
            allDistanceData,
            allVolumeData,
            allTimeData
        });
        console.log('Dashboard created successfully');
    } catch (err) {
        console.log(err);
    }
});

// Routes
app.use('/api', require('./routes'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch(err => console.error(err));
  
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));