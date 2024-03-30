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
 
         
        
        const fleetAndVehicleDeployment = await FleetAndVehicleDeployment.find();
        const data = {
            dashboard,
            stsEntryCount,
            stsTotalVolume: stsTotalVolume.length > 0 ? stsTotalVolume[0].totalVolume : 0,
            landfillEntryCount,
            landfillTotalVolume: landfillTotalVolume.length > 0 ? landfillTotalVolume[0].totalVolume : 0,
            dailyFuelCost: dailyFuelCost.length > 0 ? dailyFuelCost[0].totalCost : 0,
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