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
