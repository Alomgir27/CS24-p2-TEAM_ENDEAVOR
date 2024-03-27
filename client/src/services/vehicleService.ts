import { apiWithToken } from './userService';

export const createVehicle = async({
    vehicleNumber,
    type,
    capacity,
    fuelCostLoaded,
    fuelCostUnloaded,
    details
}: {
    vehicleNumber: string;
    type: string;
    capacity: string;
    fuelCostLoaded: number;
    fuelCostUnloaded: number;
    details: string;
}) => {
    return await apiWithToken.post('vehicles', {
        vehicleNumber,
        type,
        capacity,
        fuelCostLoaded,
        fuelCostUnloaded,
        details
    });
}

export const createSTS = async ({
    wardNumber,
    capacity,
    gpsCoordinates,
    stsManager,
    vehicleEntries,
    details
}: {
    wardNumber: string;
    capacity: string;
    gpsCoordinates: [number, number];
    stsManager: string[];
    vehicleEntries: string[];
    details: string;
}) => {
    return await apiWithToken.post('sts', {
        wardNumber,
        capacity,
        gpsCoordinates,
        stsManager,
        vehicleEntries,
        details
    });
}
   

export const assignManager = async(stsId: string, manager: string) => {
    return await apiWithToken.put(`sts/${stsId}/assign-manager`, {
        manager
    });
}

export const addStsEntry = async({
    stsId,
    vehicleId,
    volume,
    timeOfArrival,
    timeOfDeparture,
    details
}: {
    stsId: string;
    vehicleId: string;
    volume: number;
    timeOfArrival: string;
    timeOfDeparture: string;
    details: string;
}) => {
    return await apiWithToken.post('sts-entries', {
        stsId,
        vehicleId,
        volume,
        timeOfArrival,
        timeOfDeparture,
        details
    });
}

export const createLandfillEntry = async({
    landfill,
    vehicle,
    date,
    time,
    weight,
    details
}: {
    landfill: string;
    vehicle: string;
    date: string;
    time: string;
    weight: number;
    details: string;
}) => {
    return await apiWithToken.post('landfill-entries', {
        landfill,
        vehicle,
        date,
        time,
        weight,
        details
    });
}


export const getVehicles = async() => {
    return await apiWithToken.get('vehicles');
}

export const getSTS = async() => {
    return await apiWithToken.get('sts');
}

export const getLandfillEntries = async() => {
    return await apiWithToken.get('landfill-entries');
}


export const getManagers = async () => {
    return await apiWithToken.get('managers');
}

export const getLandfills = async() => {
    return await apiWithToken.get('landfills');
}


export const getVehicle = async(vehicleId: string) => {
    return await apiWithToken.get(`vehicles/${vehicleId}`);
}

export const getSTSById = async (stsId: string) => {
    return await apiWithToken.get(`sts/${stsId}`);
}

export const getLandfillEntry = async (landfillEntryId: string) => {
    return await apiWithToken.get(`landfill-entries/${landfillEntryId}`);
}

export const getLandfill = async (landfillId: string) => {
    return await apiWithToken.get(`landfills/${landfillId}`);
}

