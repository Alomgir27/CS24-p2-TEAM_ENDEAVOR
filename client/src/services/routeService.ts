import { apiWithToken } from "./userService";


export const createRoute = async({
    stsEntryId,
    landfillId,
    distance,
    cost,
    numberOfTrips,
    details
}: {
    stsEntryId: string;
    landfillId: string;
    distance: number;
    cost: number;
    numberOfTrips: number;
    details: string;
}) => {
    return await apiWithToken.post('optimize-routes', {
        stsEntryId,
        landfillId,
        distance,
        cost,
        numberOfTrips,
        details
    });
}

export const getRoutes = async() => {
    return await apiWithToken.get('routes');
}

export const getRoute = async(routeId: string) => {
    return await apiWithToken.get(`route/${routeId}`);
}