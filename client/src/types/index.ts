export interface IUser {
    email: string;
    password: string;
    username: string;
    roles: string;
    details: any;
}

export interface IVehicle {
    vehicleNumber: string;
    type: string;
    capacity: string;
    details: any;
}

export interface ISts {
    wardNumber: string;
    capacity: string;
    gpsCoordinates: {
        type: string;
        coordinates: [number];
    };
    stsManager: string;
    details: any;
}

export interface IWasteEntry {
    stsId: string;
    vehicleId: string;
    volume: number;
    timeOfArrival: Date;
    timeOfDeparture: Date;
    details: any;
}

export interface ILandfillEntry {
    landfill: string;
    vehicleId: string;
    volume: number;
    timeOfArrival: Date;
    timeOfDeparture: Date;
    details: any;
}

export interface IOilAllocation {
    vehicleId: string;
    volume: number;
    destination: string;
    timeOfArrival: Date;
    timeOfDeparture: Date;
    details: any;
}

export interface IDashboard {
    vehicleId: string;
    stsId: string;
    landfill: string;
    details: any;
}

export interface IRoute {
    vehicleId: string;
    stsId: string;
    landfill: string;
    details: any;
}

export interface IRole {
    name: string;
    permissions: [string];
    details: any;
}

export interface IPermission {
    name: string;
    details: any;
}

