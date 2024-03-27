import { apiWithToken } from "./userService";


export const createLandfill = async({
    name,
    capacity,
    operationalTimespan,
    gpsCoordinates,
    landfillManager,
    details
}: {
    name: string;
    capacity: number;
    operationalTimespan: string;
    gpsCoordinates: [number, number];
    landfillManager: string[];
    details: string;
}) => {
    return await apiWithToken.post('landfill', {
        name,
        capacity,
        operationalTimespan,
        gpsCoordinates,
        landfillManager,
        details
    });
}

export const getLandfills = async() => {
    return await apiWithToken.get('landfills');
}

export const getLandfillManagers = async () => {
    return await apiWithToken.get('landfill-managers');
}

export const assignLandfillManager = async(landfillId: string, manager: string) => {
    return await apiWithToken.put(`landfills/${landfillId}/assign-manager`, {
        manager
    });
}

export const getLandfill = async(landfillId: string) => {
    return await apiWithToken.get(`landfills/${landfillId}`);
}

export const updateLandfill = async(landfillId: string, {
    name,
    capacity,
    operationalTimespan,
    gpsCoordinates,
    landfillManager,
    details
}: {
    name: string;
    capacity: number;
    operationalTimespan: string;
    gpsCoordinates: [number, number];
    landfillManager: string[];
    details: string;
}) => {
    return await apiWithToken.put(`landfills/${landfillId}`, {
        name,
        capacity,
        operationalTimespan,
        gpsCoordinates,
        landfillManager,
        details
    });
}

export const deleteLandfill = async(landfillId: string) => {
    return await apiWithToken.delete(`landfills/${landfillId}`);
}

export const addLandfillEntry = async({
    landfillId,
    volume,
    timeOfArrival,
    timeOfDeparture,
    details
}: {
    landfillId: string;
    volume: number;
    timeOfArrival: string;
    timeOfDeparture: string;
    details: string;
}) => {
    return await apiWithToken.post('landfill-entries', {
        landfillId,
        volume,
        timeOfArrival,
        timeOfDeparture,
        details
    });
}

