const {
    Dashboard,
    FleetAndVehicleDeployment,
    Vehicle,
    LandfillEntry,
    StsEntry
} = require('../models');


const getDashboard = async (req, res) => {
    try {
        const dashboard = await Dashboard.find();
       
         // Count STS entries
         const stsEntryCount = await StsEntry.countDocuments();
         // Calculate total volume of waste collected at STS
         const stsTotalVolume = await StsEntry.aggregate([
             { $group: { _id: null, totalVolume: { $sum: "$volume" } } }
         ]);
 
         // Count Landfill entries
         const landfillEntryCount = await LandfillEntry.countDocuments();
         // Calculate total volume of waste collected at Landfill
         const landfillTotalVolume = await LandfillEntry.aggregate([
             { $group: { _id: null, totalVolume: { $sum: "$volume" } } }
         ]);
 
         // Calculate daily fuel cost for trucks
         const dailyFuelCost = await Vehicle.aggregate([
             { $project: { totalFuelCost: { $add: ["$fuelCostLoaded", "$fuelCostUnloaded"] } } },
             { $group: { _id: null, totalCost: { $sum: "$totalFuelCost" } } }
         ]);
 
         console.log("STS Entry Count:", stsEntryCount);
         console.log("Total Volume at STS:", stsTotalVolume[0].totalVolume);
         console.log("Landfill Entry Count:", landfillEntryCount);
         console.log("Total Volume at Landfill:", landfillTotalVolume[0].totalVolume);
         console.log("Daily Fuel Cost:", dailyFuelCost[0].totalCost);
        
        const fleetAndVehicleDeployment = await FleetAndVehicleDeployment.find();
        const data = {
            dashboard,
            stsEntryCount,
            stsTotalVolume: stsTotalVolume[0].totalVolume,
            landfillEntryCount,
            landfillTotalVolume: landfillTotalVolume[0].totalVolume,
            dailyFuelCost: dailyFuelCost[0].totalCost,
            fleetAndVehicleDeployment
        };
        res.status(200).json(data);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}
        

      
module.exports = {
    getDashboard
};