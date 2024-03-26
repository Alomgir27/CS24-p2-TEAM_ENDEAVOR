import axios from 'axios';

const API_URL = 'http://localhost:5000/api/';

const apiWithToken = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token')}`
    },
});

const apiWithTokenAndFormData = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `${localStorage.getItem('token')}`
    },
});


export const getUsers = async () => {
    return await apiWithToken.get('users');
};

export const getUser = async (userId: string) => {
    return await apiWithToken.get(`users/${userId}`);
};

export const createUser = async ({ username, email, password, role }: { username: string; email: string; password: string; role: string }) => {
    return await apiWithToken.post('users', {
        name: username,
        email,
        password,
        role,
    });
};

export const updateUser = async ({ userId, username, email, role }: { userId: string; username: string; email: string; role: string }) => {
    return await apiWithToken.put(`users/${userId}`, {
        username,
        email,
        role,
    });
};

export const deleteUser = async (userId: string) => {
    return await apiWithToken.delete(`users/${userId}`);
};

export const getRoles = async () => {
    return await apiWithToken.get('users/roles');
};

export const updateRoles = async ({ userId, role }: { userId: string; role: string }) => {
    return await apiWithToken.put(`users/${userId}/roles`, {
        role,
    });
};



