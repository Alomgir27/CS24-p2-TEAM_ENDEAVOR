import { apiWithToken } from './userService';

export const getRoles = async () => {
  return await apiWithToken.get('rbac/roles');
};

