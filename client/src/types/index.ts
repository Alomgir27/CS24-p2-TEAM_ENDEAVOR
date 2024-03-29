export interface IUser {
    _id: string;
    email: string;
    password: string;
    username: string;
    role: string;
    details: any;
}

export interface IVehicle {
    _id: string;
    vehicleNumber: string;
    type: string;
    capacity: string;
    fuelCostLoaded: number;
    fuelCostUnloaded: number;
    isAllocated: boolean;
    details: any;
}

export interface IManager {
    _id: string;
    username: string;
    email: string;
    phone: string;
    role: string;
    details: any;
}

export interface ISts {
    _id: string;
    wardNumber: string;
    capacity: string;
    gpsCoordinates: {
        type: string;
        coordinates: [number];
    };
    stsManager: string;
    vehicleEntries: IVehicle[];
    details: any;
}

export interface IWasteEntry {
    _id: string;
    stsId: string;
    vehicleId: string;
    volume: number;
    timeOfArrival: Date;
    timeOfDeparture: Date;
    details: any;
}

export interface ILandfillEntry {
    _id: string;
    landfill: string;
    vehicleId: string;
    volume: number;
    timeOfArrival: Date;
    timeOfDeparture: Date;
    details: any;
}

export interface IOilAllocation {
    _id: string;
    vehicleId: string;
    volume: number;
    destination: string;
    timeOfArrival: Date;
    timeOfDeparture: Date;
    details: any;
}

export interface IDashboard {
    _id: string;
    vehicleId: string;
    stsId: string;
    landfill: string;
    details: any;
}
;
export interface IRoute {
    _id: string;
    stsEntryId: string | ISts;
    landfillId: string | ILandfillEntry;
    distance: number;
    cost: number;
    numberOfTrips: number;
    details: any;
}

export interface IRole {
    _id: string;
    name: string;
    permissions: [string];
    details: any;
}

export interface IPermission {
    _id: string;
    name: string;
    details: any;
}

