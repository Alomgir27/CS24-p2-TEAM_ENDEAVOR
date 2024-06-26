const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: false
  },
  role: {
     type: String,
     required: true,
  },
    details: {
        type: Schema.Types.Mixed,
        required: false
    }
}, { timestamps: true });



const vehicleSchema = new Schema({
    vehicleNumber: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Open Truck', 'Dump Truck', 'Compactor', 'Container Carrier']
    },
    capacity: {
        type: String,
        required: true,
        enum: ['3 ton', '5 ton', '7 ton', '15 ton']
    },
    fuelCostLoaded: {
        type: Number,
        required: true
    },
    fuelCostUnloaded: {
        type: Number,
        required: true
    },
    isAllocated: {
        type: Boolean,
        required: false,
        default: false
    },
    details: {
        type: Schema.Types.Mixed,
        required: false
    }
}, { timestamps: true });

    

const stsSchema = new Schema({
    wardNumber: {
        type: String,
        required: true
    },
    capacity: {
        type: String,
        required: true
    },
    gpsCoordinates: {
        type: {
            type: String,
            enum: ['Point', 'Polygon'],
            default: 'Point',
            required: true
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    },
    location: {
        type: String,
        required: false
    },
    stsManager: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        required: false
    },
    vehicleEntries: {
        type: [Schema.Types.ObjectId],
        ref: 'Vehicle',
        required: false
    },
    details: {
        type: Schema.Types.Mixed,
        required: false
    }
}, { timestamps: true });



const stsEntrySchema = new Schema({
    stsId: {
        type: Schema.Types.ObjectId,
        ref: 'STS',
        required: true
    },
    vehicleId: {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    volume: {
        type: Number,
        required: true
    },
    timeOfArrival: {
        type: Schema.Types.Mixed,
        required: true
    },
    timeOfDeparture: {
        type: Schema.Types.Mixed,
        required: true
    },
    isAllocated: {
        type: Boolean,
        required: false,
        default: false
    },
    details: {
        type: Schema.Types.Mixed,
        required: false
    }
}, { timestamps: true });



const landfillSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    operationalTimespan: {
        type: Schema.Types.Mixed,
        required: true
    },
    gpsCoordinates: {
        type: {
            type: String,
            enum: ['Point', 'Polygon'],
            default: 'Point',
            required: true
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    },
    location: {
        type: String,
        required: false
    },
    landfillManager: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        required: false
    },
    details: {
        type: Schema.Types.Mixed,
        required: false
    }
}, { timestamps: true });



const landfillEntrySchema = new Schema({
    landfill: {
        type: Schema.Types.ObjectId,
        ref: 'Landfill',
    },
    volume: {
        type: Number,
        required: true
    },
    timeOfArrival: {
        type: Schema.Types.Mixed,
        required: true
    },
    timeOfDeparture: {
        type: Schema.Types.Mixed,   
        required: true
    },
    details: {
        type: Schema.Types.Mixed,
        required: false
    }
}, { timestamps: true });




const dashboardSchema = new Schema({
    numOfUsers: {
        type: Number,
        required: true
    },
    numOfVehicles: {
        type: Number,
        required: true
    },
    numOfSTS: {
        type: Number,
        required: true
    },
    numOfLandfills: {
        type: Number,
        required: true
    },
    numOfRoutes: {
        type: Number,
        required: true
    },
    allLandfillsLocations: {
        type: Schema.Types.Mixed,
        required: false
    },
    allStsLocations: {
        type: Schema.Types.Mixed,
        required: false
    },
    allVehicleMovements: {
        type: Schema.Types.Mixed,
        required: false
    },
    allCostData: {
        type: Schema.Types.Mixed,
        required: false
    },
    allDistanceData: {
        type: Schema.Types.Mixed,
        required: false
    },
    allVolumeData: {
        type: Schema.Types.Mixed,
        required: false
    },
    allTimeData: {
        type: Schema.Types.Mixed,
        required: false
    },
    details: {
        type: Schema.Types.Mixed,
        required: false
    }
}, { timestamps: true });
    



const routeSchema = new Schema({
    stsEntryId: {
        type: Schema.Types.ObjectId,
        ref: 'stsEntry',
        required: true
    },
    landfillId: {
        type: Schema.Types.ObjectId,
        ref: 'Landfill',
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    numberOfTrips: {
        type: Number,
        required: true
    },
    details: {
        type: Schema.Types.Mixed,
        required: false
    }
}, { timestamps: true });




const fleetAndVehicleDeploymentSchema = new Schema({
    routeIds: {
        type: [Schema.Types.ObjectId],
        ref: 'Route',
        required: true
    },
    stsId: {
        type: Schema.Types.ObjectId,
        ref: 'STS',
        required: true
    },
    deployTimeRange: {
        type: String,
        required: true
    },
    totalDistance: {
        type: Number,
        required: true
    },
    totalWaste: {
        type: Number,
        required: true
    },
    totalVehicles: {
        type: Number,
        required: true
    },
    totalTrips: {
        type: Number,
        required: true
    },
    totalFuelCost: {
        type: Number,
        required: true
    },
    details: {
        type: Schema.Types.Mixed,
        required: false
    }
}, { timestamps: true });



const roleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    permissions: {
        type: [Schema.Types.ObjectId],
        ref: 'Permission',
    },
    details: {
        type: Schema.Types.Mixed,
        required: false
    }
}, { timestamps: true });

const permissionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    details: {
        type: Schema.Types.Mixed,
        required: false
    }
}, { timestamps: true });


const User = mongoose.model('User', userSchema);
const Vehicle = mongoose.model('Vehicle', vehicleSchema);
const STS = mongoose.model('STS', stsSchema);
const LandfillEntry = mongoose.model('LandfillEntry', landfillEntrySchema);
const Dashboard = mongoose.model('Dashboard', dashboardSchema);
const Route = mongoose.model('Route', routeSchema);
const Role = mongoose.model('Role', roleSchema);
const Permission = mongoose.model('Permission', permissionSchema);
const StsEntry = mongoose.model('stsEntry', stsEntrySchema);
const Landfill = mongoose.model('Landfill', landfillSchema);
const FleetAndVehicleDeployment = mongoose.model('FleetAndVehicleDeployment', fleetAndVehicleDeploymentSchema);

stsSchema.index({ gpsCoordinates: "2dsphere" });
landfillSchema.index({ gpsCoordinates: "2dsphere" });



module.exports = {
    User,
    Vehicle,
    STS,
    LandfillEntry,
    Dashboard,
    Route,
    StsEntry,
    Role,
    Permission,
    Landfill,
    FleetAndVehicleDeployment
};