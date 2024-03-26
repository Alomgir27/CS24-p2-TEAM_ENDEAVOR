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
        enum: ['System Admin', 'STS Manager', 'Landfill Manager', 'Unassigned'],
        default: 'Unassigned'
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
        enum: ['3 ton', '5 ton', '7 ton']
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
    stsManager: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    details: {
        type: Schema.Types.Mixed,
        required: false
    }
}, { timestamps: true });



const wasteEntrySchema = new Schema({
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
        type: Date,
        required: true
    },
    timeOfDeparture: {
        type: Date,
        required: true
    },
    details: {
        type: Schema.Types.Mixed,
        required: false
    }
}, { timestamps: true });



const landfillEntrySchema = new Schema({
    landfill: {
        type: String,
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
        type: Date,
        required: true
    },
    timeOfDeparture: {
        type: Date,
        required: true
    },
    details: {
        type: Schema.Types.Mixed,
        required: false
    }
}, { timestamps: true });

const oilAllocationSchema = new Schema({
    vehicleId: {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    volume: {
        type: Number,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    timeOfArrival: {
        type: Date,
        required: true
    },
    timeOfDeparture: {
        type: Date,
        required: true
    },
    details: {
        type: Schema.Types.Mixed,
        required: false
    }
}, { timestamps: true });


const dashboardSchema = new Schema({
    vehicleId: {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    stsId: {
        type: Schema.Types.ObjectId,
        ref: 'STS',
        required: true
    },
    landfill: {
        type: String,
        required: true
    },
    details: {
        type: Schema.Types.Mixed,
        required: false
    }
}, { timestamps: true });




const routeSchema = new Schema({
    vehicleId: {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    stsId: {
        type: Schema.Types.ObjectId,
        ref: 'STS',
        required: true
    },
    landfill: {
        type: String,
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
const WasteEntry = mongoose.model('WasteEntry', wasteEntrySchema);
const LandfillEntry = mongoose.model('LandfillEntry', landfillEntrySchema);
const OilAllocation = mongoose.model('OilAllocation', oilAllocationSchema);
const Dashboard = mongoose.model('Dashboard', dashboardSchema);
const Route = mongoose.model('Route', routeSchema);
const Role = mongoose.model('Role', roleSchema);
const Permission = mongoose.model('Permission', permissionSchema);

stsSchema.index({ location: "2dsphere" });


module.exports = {
    User,
    Vehicle,
    STS,
    WasteEntry,
    LandfillEntry,
    OilAllocation,
    Dashboard,
    Route,
    Role,
    Permission
};