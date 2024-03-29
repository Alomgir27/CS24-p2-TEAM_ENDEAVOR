import { apiWithToken } from './userService';

export const getPermissions = async () => {
  return await apiWithToken.get('rbac/permissions');
};

export const createPermission = async ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  return await apiWithToken.post('rbac/permissions', {
    name,
    description,
  });
};


export const deletePermission = async (permissionId: string) => {
    return await apiWithToken.delete(`rbac/permissions/${permissionId}`);
}