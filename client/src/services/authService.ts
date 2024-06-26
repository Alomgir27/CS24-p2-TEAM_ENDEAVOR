import axios from 'axios';
const API_URL = 'http://localhost:5000/api/auth/';
import { apiWithToken } from './userService';

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000
});


export const register = async ({ username, email, password }: { username: string; email: string; password: string }) => {
    return await api.post('create', {
        username,
        email,
        password,
    });
};

export const login = async ({ email, password }: { email: string; password: string }) => {
    return await api.post('login', {
        email,
        password,
    });
};

export const forgotPassword = async ({ email }: { email: string }) => {
    return await api.post('reset-password/initiate', {
        email,
    });
};

export const resetPassword = async ({ token, password }: { token: string; password: string }) => {
    return await api.post('reset-password/confirm', {
        token,
        password,
    });
};

export const changePassword = async ({ oldPassword, newPassword }: { oldPassword: string; newPassword: string }) => {
    return await apiWithToken.post('change-password', {
        oldPassword,
        newPassword,
    });
}

export const logout = async () => {
    return await api.post('logout');
};

