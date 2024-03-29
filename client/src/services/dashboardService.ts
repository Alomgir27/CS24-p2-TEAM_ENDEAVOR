import { apiWithToken } from "./userService";


const getDashboardData = async () => {
    return await apiWithToken.get('dashboard');
}


export {
    getDashboardData
}