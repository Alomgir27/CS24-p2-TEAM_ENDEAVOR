import axios from 'axios';

const API_URL = 'http://localhost:5000/api/';

export const apiWithToken = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
});

export const apiWithTokenAndFormData = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'multipart/form-data'
    },
});

// Add an interceptor to dynamically set the Authorization header before each request
apiWithToken.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = token;
    }
    return config;
});

apiWithTokenAndFormData.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = token;
    }
    return config;
});


export const getUsers = async () => {
    return await apiWithToken.get('users');
};

export const getUser = async (userId: string) => {
    return await apiWithToken.get(`users/${userId}`);
};

export const createUser = async ({ username, email, password, role }: { username: string; email: string; password: string; role: string }) => {
    return await apiWithToken.post('users', {
        username,
        email,
        password,
        role,
    });
};

export const updateUser = async ({ userId, username, email, password, role }: { userId: string; username: string; email: string; password: string; role: string }) => {
    return await apiWithToken.put(`users/${userId}`, {
        username,
        email,
        password,
        role,
    });
};

export const updateProfile = async ({ username, email }: { username: string; email: string; }) => {
    return await apiWithToken.put(`profile`, {
        username,
        email,
    });
}

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



