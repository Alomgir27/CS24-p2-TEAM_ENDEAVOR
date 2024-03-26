import React, { useRef, useState } from 'react';

import Button from '../../base-components/Button';
import { FormInput } from '../../base-components/Form';
import Lucide from '../../base-components/Lucide';
import { useNavigate } from 'react-router-dom';
import { Dialog, Menu } from '../../base-components/Headless';

interface Permission {
  id: string;
  name: string;
  description: string;
}

interface Role {
  id: string;
  name: string;
  permissions: Permission[];
  description: string;
}

const index = () => {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);

  const onDelete = () => {
    console.log('delete');
    setDeleteConfirmationModal(false);
  };


  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: '1',
      name: 'Create',
      description: 'Create permission',
    },
    {
      id: '2',
      name: 'Read',
      description: 'Read permission',
    },
    {
      id: '3',
      name: 'Update',
      description: 'Update permission',
    },
    {
      id: '4',
      name: 'Delete',
      description: 'Delete permission',
    },
  ]);

  const [roles, setRoles] = useState<Role[]>([
    {
      id: '1',
      name: 'Admin',
      description: 'Admin role',
      permissions: [
        {
          id: '1',
          name: 'Create',
          description: 'Create permission',
        },
        {
          id: '2',
          name: 'Read',
          description: 'Read permission',
        },
        {
          id: '3',
          name: 'Update',
          description: 'Update permission',
        },
        {
          id: '4',
          name: 'Delete',
          description: 'Delete permission',
        },
      ],
    },
    {
      id: '2',
      name: 'User',
      description: 'User role',
      permissions: [
        {
          id: '1',
          name: 'Create',
          description: 'Create permission',
        },
        {
          id: '2',
          name: 'Read',
          description: 'Read permission',
        },
      ],
    },
  ]);

  return (
    <>
      <h2 className='mt-10 text-lg font-medium intro-y'>Roles</h2>
      <div className='grid grid-cols-12 gap-6 mt-5'>
        <div className='flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap'>
          <Button
            variant='primary'
            className='mr-2 shadow-md'
            onClick={() => navigate('/add-permission')}
          >
            Add Role
          </Button>
          <div className='w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0'>
            <div className='relative w-56 text-slate-500'>
              <FormInput
                type='text'
                className='w-56 pr-10 !box'
                placeholder='Search...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Lucide
                icon='Search'
                className='absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3'
              />
            </div>
          </div>
        </div>

        {roles.map((role, roleKey) => (
          <div
            key={roleKey}
            className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3'
          >
            <div className='intro-y box'>
              <div className='p-5'>
                <div className='flex items-center'>
                  <div className='w-10 h-10 image-fit'>
                    <Lucide icon='User' className='w-10 h-10' />
                  </div>
                  <div className='ml-4 truncate'>
                    <div className='font-medium text-lg'>{role.name}</div>
                    <div className='text-slate-500'>{role.description}</div>
                  </div>
                </div>

                {/* show persmissions */}
                <div className='mt-5'>
                  <h3>Permissions</h3>
                  {permissions.map((permission, permissionKey) => (
                    <div key={permissionKey} className='flex items-center mt-2'>
                      
                    
                      {role.permissions.find(
                        (rolePermission) => rolePermission.id === permission.id
                      ) ? (
                        <Lucide
                          icon='Check'
                          className='w-5 h-5 text-green-500'
                        />
                      ) : (
                        <Lucide
                          icon='X'
                          className='w-5 h-5 text-red-500'
                        />
                      )}

                      <div className='ml-2'>{permission.name}</div>
                    </div>
                  ))}

                  
                </div>

                <div className='flex items-center justify-between mt-5'>
                  <Button variant='secondary' className='p-2 shadow-md'>
                    Edit
                  </Button>
                  <Button
                    variant='danger'
                    className='p-2 shadow-md'
                    onClick={() => {
                      setDeleteConfirmationModal(true);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <Dialog
          open={deleteConfirmationModal}
          onClose={() => {
            setDeleteConfirmationModal(false);
          }}
          
        >
          <Dialog.Panel>
            <div className='p-5 text-center'>
              <Lucide
                icon='XCircle'
                className='w-16 h-16 mx-auto mt-3 text-danger'
              />
              <div className='mt-5 text-3xl'>Are you sure?</div>
              <div className='mt-2 text-slate-500'>
                Do you really want to delete these records? <br />
                This process cannot be undone.
              </div>
            </div>
            <div className='px-5 pb-8 text-center'>
              <Button
                variant='outline-secondary'
                type='button'
                onClick={() => {
                  setDeleteConfirmationModal(false);
                }}
                className='w-24 mr-1'
              >
                Cancel
              </Button>
              <Button
                variant='danger'
                type='button'
                className='w-24'
                onClick={onDelete}
              >
                Delete
              </Button>
            </div>
          </Dialog.Panel>
        </Dialog>
      </div>
    </>
  );
};

export default index;
