import { apiWithToken } from './userService';

export const getRoles = async () => {
  return await apiWithToken.get('rbac/roles');
};

export const createRole = async ({
  name,
  description,
  permissions,
}: {
  name: string;
  description: string;
  permissions: string[];
}) => {
    return await apiWithToken.post('rbac/roles', {
        name,
        description,
        permissions
    });
};


export const getRole = async (id: string) => {
    return await apiWithToken.get(`rbac/roles/${id}`);
};

export const updateRole = async (id: string, {
  name,
  description,
  permissions,
}: {
  name: string;
  description: string;
  permissions: string[];
}) => {
    return await apiWithToken.put(`rbac/roles/${id}`, {
        name,
        description,
        permissions
    });
};

export const deleteRole = async (id: string) => {
    return await apiWithToken.delete(`rbac/roles/${id}`);
};
