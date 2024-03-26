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



const index = () => {
  const [permissions, setPermissions] = useState<IPermission[]>([]);

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
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onSubmit = async (data) => {
    const name = data.name || '';
    const description = data.description || '';

    console.log(name);
    console.log(description);
    console.log(selectedPermissions);
  };

  return (
    <>
      <div className='flex items-center mt-8 intro-y'>
        <h2 className='mr-auto text-lg font-medium'>Add new role</h2>
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
                    'h-28' +
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
                    <FormCheck className='mr-4'>
                      <FormCheck.Input
                        id={`checkbox-switch-${permissionKey}`}
                        type='checkbox'
                        value={permission._id}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPermissions([
                              ...selectedPermissions,
                              permission,
                            ]);
                          } else {
                            setSelectedPermissions(
                              selectedPermissions.filter(
                                (selectedPermission) =>
                                  selectedPermission._id !== permission._id
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

              <Button variant='primary' type='submit' className='mt-3'>
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default index;
