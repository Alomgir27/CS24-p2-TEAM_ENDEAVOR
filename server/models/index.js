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
        type: [String],
        required: true
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


// EcoSync: Revolutionizing Waste Management in Dhaka North
// City Corporation
// In the bustling city of Dhaka, the Dhaka North City Corporation (DNCC) has
// been grappling with the ever-growing challenges of solid waste
// management. The stakes are high in a city that is not just the heart of
// Bangladesh's economic activities but also home to millions of dreams.
// Amidst this, a visionary team at the DNCC, has embarked on a mission to
// redefine the city's approach to waste management. From the inefficiencies
// in domestic waste collection to the pioneering initiatives with international
// partners for waste-to-energy conversions, DNCC has taken multi-pronged
// initiatives to improve the situation.
// Current Municipal Solid Waste Management Practices:
// ● Domestic Waste Collection: Currently, domestic wastes are collected
// from housing societies and transported to one of 54 Secondary
// Transfer Stations (STS) owned by DNCC.
// ● Waste Transfer: Waste is then transported from STS to landfills using
// dump trucks and compactor trucks, with compactor trucks having the
// capacity to carry 5x more volume due to compression. Aminbazar
// landfill serves DNCC, while Matuail landfill caters to the Dhaka South
// City Corporation (DSCC).
// ● STS and Open Bins: Each ward has one STS. In wards lacking an STS,
// open bins are utilized. DNCC operations begin in the post-STS stage.
// ● Resource Allocation: DNCC manages oil allocation based on vehicle
// trips to ensure efficient operation.
// With the vision to create a sustainable and efficient waste management
// ecosystem, the DNCC is now poised to introduce EcoSync, a
// comprehensive web application that will serve as the nerve center for all
// waste management activities within the jurisdiction of the Dhaka North City
// Corporation. EcoSync aims to bridge the gaps, streamline processes, and
// enhance accountability through technological innovation.
// The Challenge:
// Participants are invited to design and develop EcoSync, a web application
// that functions as an administrative panel for various stakeholders involved
// in the solid waste management process of DNCC. The application should
// cater to the specific needs of the System Admin, Landfill Manager, and STS
// Managers, providing a unified platform to manage the complexities of
// waste collection, transportation, and processing efficiently.
// Key Features:
// 1. User management for 4 different roles:
// a. System Admin,
// b. STS Manager,
// c. Landfill Manager,
// d. Unassigned
// Authentication Endpoints
// ● /auth/create - For creating new users. (Only System Admins)
// ● /auth/login - For user login.
// ● /auth/logout - For logging out users and terminating sessions.
// ● /auth/reset-password/initiate - For initiating the password reset
// process.
// ● /auth/reset-password/confirm - For confirming password reset
// with a token or code.
// ● /auth/change-password - For allowing users to change their
// password after logging in.
// User Management Endpoints
// ● /users - GET method for listing all users (System Admin
// access).
// ● /users/{userId} - GET method for retrieving a specific user's
// details.
// ● /users - POST method for creating a new user (System Admin
// access).
// ● /users/{userId} - PUT method for updating a user's details
// (restricted to own details or System Admin access).
// ● /users/{userId} - DELETE method for deleting a user (System
// Admin access).
// ● /users/roles - GET method for listing all available roles.
// ● /users/{userId}/roles - PUT method for updating a user's roles
// (System Admin access).
// Profile Management Endpoints
// ● /profile - GET method for retrieving the logged-in user's profile.
// ● /profile - PUT method for updating the logged-in user's profile.
// Role-Based Access Control (RBAC) Endpoints
// e. /rbac/roles - For defining and managing roles.
// f. /rbac/permissions - For defining and managing permissions.
// g. /rbac/roles/{roleId}/permissions - For assigning permissions to
// a role.
// h. /rbac/users/{userId}/roles - For assigning roles to a user
// (System Admin access). By default, after user creation, the role
// is unassigned. This role should not have any access. The user
// can only login and update their profile with this role.
// 2. Data Entry Interface :
// a. System admin can add vehicles with these mandatory
// attributes. You can store additional attributes as well.
// i. Vehicle Number
// ii. Type : Open Truck, Dump Truck, Compactor, Container
// Carrier
// iii. Capacity: 3 ton, 5 ton, 7 ton.
// b. System admin can create STS with ward number, capacity in
// Tonnes and GPS coordinates.
// c. System admin can also assign an STS manager for each STS.
// d. STS managers can add entry of vehicles leaving the STS with
// STS ID, vehicle number, volume of waste, time of arrival and
// time of departure.
// e. Landfill managers can add entry of truck dumping with volume
// of waste, time of arrival and time of departure.
// 3. Automatic Billing: Calculate oil allocation based on automated
// handling of weight bill data for accountability.
// a. A vehicle goes to Aminbazar landfill from STS three times every
// day.
// b. If the vehicle took less volume than capacity, he’ll get less oil.
// c. 147 vehicles x 3 bills each day x 7 times per week = 3087 bills
// each week.
// d. All vehicle’s destinations are Aminbazar but the starting point is
// different.
// 4. Waste Collection and Transfer Tracking: Optimize routes for vehicles,
// ensuring the most efficient use of resources and minimizing traffic
// congestion during waste transfer from STS to landfills.
// 5. Dashboard Overview: Real-time monitoring of waste collection and
// transportation activities, with visual analytics for quick
// decision-making. This is up to the participants

// ### APIs:

// 1. Authentication Endpoints:
// - POST /auth/create
// - POST /auth/login
// - POST /auth/logout
// - POST /auth/reset-password/initiate
// - POST /auth/reset-password/confirm
// - POST /auth/change-password

// 2. User Management Endpoints:
// - GET /users
// - GET /users/{userId}
// - POST /users
// - PUT /users/{userId}
// - DELETE /users/{userId}
// - GET /users/roles
// - PUT /users/{userId}/roles

// 3. Profile Management Endpoints:
// - GET /profile
// - PUT /profile

// 4. Role-Based Access Control (RBAC) Endpoints:
// - POST /rbac/roles
// - GET /rbac/roles
// - PUT /rbac/roles/{roleId}
// - DELETE /rbac/roles/{roleId}
// - POST /rbac/permissions
// - GET /rbac/permissions
// - PUT /rbac/permissions/{permissionId}
// - DELETE /rbac/permissions/{permissionId}
// - PUT /rbac/roles/{roleId}/permissions
// - PUT /rbac/users/{userId}/roles

// 5. Data Entry Interface Endpoints:
// - POST /vehicles
// - POST /sts
// - PUT /sts/{stsId}/assign-manager
// - POST /sts/{stsId}/vehicles
// - POST /landfill-entries

// 6. Automatic Billing Endpoints:
// - POST /calculate-oil-allocation

// 7. Waste Collection and Transfer Tracking Endpoints:
// - POST /optimize-routes

// 8. Dashboard Overview Endpoints:
// - GET /dashboard

// These APIs cover all the functionalities and endpoints mentioned in the EcoSync project description.

//routes/dashboardController.js