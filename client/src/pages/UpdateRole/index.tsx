import React, { useEffect, useState } from 'react';
import {
  FormCheck,
  FormInput,
  FormLabel,
  FormTextarea,
} from '../../base-components/Form';
import Button from '../../base-components/Button';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { IPermission } from '../../types';
import { getPermissions } from '../../services/permissionService';
import { updateRole, getRole } from '../../services/roleService';
import Alert from '../../base-components/Alert';
import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';



const index = () => {
  const [permissions, setPermissions] = useState<IPermission[]>([]);
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

  const schema = yup
    .object({
      name: yup.string().required().min(2),
      description: yup.string(),
    })
    .required();

  const [selectedPermissions, setSelectedPermissions] = useState<IPermission[]>(
    []
  );

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const res = await getPermissions();
        const { permissions } = res.data;
        setPermissions(permissions);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPermissions();
  }, []);

  const {
    register,
    trigger,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onSubmit = async (data : any) => {
    const name = data.name || '';
    const description = data.description || '';
    setLoading(true);

    try {
      const response = await updateRole(id as string, {
        name,
        description,
        permissions: selectedPermissions.map((permission) => permission._id),
      });
        console.log(name, description, selectedPermissions.map((permission) => permission._id));

      if (response.status == 200) {
        setSuccess('Role updated successfully');
        setTimeout(() => {
          setSuccess('');
          navigate('/roles')
        }, 3000);
        reset();
      } else {
        setError('Something went wrong');
      }
    } catch (error) {
      setError(
        (error &&
          error?.response &&
          error.response?.data &&
          error.response.data?.message) ||
          'Something went wrong'
      );
    }
    setLoading(false);
    };
    
    useEffect(() => {
        getRole(id as string).then((res) => {
            console.log(res.data);
            const { role } = res.data;
            reset({
                name: role.name,
                description: role.details?.description,
            });
            setSelectedPermissions(role.permissions);

        });
    }, [id]);

  return (
    <>
      <div className='flex items-center mt-8 intro-y'>
        <h2 className='mr-auto text-lg font-medium'>Update role</h2>
      </div>
      <div className='grid grid-cols-12 gap-6 mt-5'>
        <div className='col-span-12 intro-y lg:col-span-6 intro-y box'>
          <div className='flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400'>
            <h2 className='mr-auto text-base font-medium'>Role Form</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='p-5'>
              <div>
                <FormLabel htmlFor='name'>Name</FormLabel>
                <FormInput
                  id='name'
                  type='text'
                  placeholder='Enter role name'
                  {...register('name')}
                  className={clsx('input', {
                    'border-red-500': errors.name,
                  })}
                />

                {errors.name && (
                  <div className='mt-2 text-red-500'>
                    {typeof errors.name.message === 'string' &&
                      errors.name.message}
                  </div>
                )}
              </div>

              <div className='mt-3'>
                <FormLabel htmlFor='description'>Description</FormLabel>
                <FormTextarea
                  id='description'
                  placeholder='Enter description'
                  {...register('description')}
                  className={
                    'min-h-60 resize-none' +
                    clsx('input', {
                      'border-red-500': errors.description,
                    })
                  }
                ></FormTextarea>

                {errors.description && (
                  <div className='mt-2 text-red-500'>
                    {typeof errors.description.message === 'string' &&
                      errors.description.message}
                  </div>
                )}
              </div>

              <div className='mt-3'>
                <label>Add permissions</label>
                <div className='flex flex-col mt-2 sm:flex-row'>
                  {permissions.map((permission, permissionKey) => (
                    <FormCheck className='mr-4 mt-3' key={permissionKey}>
                          <FormCheck.Input
                            type='checkbox'
                            id={`checkbox-switch-${permissionKey}`}
                            checked={selectedPermissions.some(
                              (p) => p._id === permission._id
                            )}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedPermissions([
                                  ...selectedPermissions,
                                  permission,
                                ]);
                              } else {
                                setSelectedPermissions(
                                  selectedPermissions.filter(
                                    (p) => p._id !== permission._id
                                  )
                                );
                              }
                            }}
                       
                      />
                      <FormCheck.Label
                        htmlFor={`checkbox-switch-${permissionKey}`}
                      >
                        {permission.name}
                      </FormCheck.Label>
                    </FormCheck>
                  ))}
                </div>
                          </div>

              {success && (
                <Alert variant='success' className='mt-3'>
                  {success}
                </Alert>
              )}

              {error && (
                <Alert variant='danger' className='mt-3'>
                  {error}
                </Alert>
              )}

              <Button variant='primary' type='submit' className='mt-4' disabled={selectedPermissions.length === 0 || loading}>
                {loading ? 'Loading...' : 'Update'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default index;
