const { OilAllocation } = require('../models');

const calculateOilAllocation = async (req, res) => {
    try {
        // Logic to calculate oil allocation
        res.status(200).json({ message: 'Oil allocation calculated successfully' });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    calculateOilAllocation
};