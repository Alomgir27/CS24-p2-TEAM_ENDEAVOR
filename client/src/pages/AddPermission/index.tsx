import React, { useState } from 'react';
import {
  FormInput,
  FormLabel,
  FormTextarea,
} from '../../base-components/Form';
import Button from '../../base-components/Button';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';

const index = () => {

  const schema = yup
    .object({
      name: yup.string().required().min(2),
      description: yup.string(),
    })
    .required();

  const {
    register,
    trigger,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });


  const onSubmit = async (data) => {
    const name = data.name || '';
    const description = data.description || '';

    console.log(name, description);

    //TODO: Add API call to create permission
  }

  return (
    <>
      <div className='flex items-center mt-8 intro-y'>
        <h2 className='mr-auto text-lg font-medium'>Add new permission</h2>
      </div>
      <div className='grid grid-cols-12 gap-6 mt-5'>
        <div className='col-span-12 intro-y lg:col-span-6 intro-y box'>
          <div className='flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400'>
            <h2 className='mr-auto text-base font-medium'>Permission Form</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='p-5'>
              <div>
                <FormLabel htmlFor='permission-name'>Name</FormLabel>
                <FormInput
                  id='permission-name'
                  type='text'
                  placeholder='Enter permission name'
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
                <FormLabel htmlFor='permission-description'>
                  Description
                </FormLabel>
                <FormTextarea
                  id='permission-description'
                  placeholder='Enter description'
                  {...register('description')}
                  
                  className={ 'h-28' + clsx('input', {
                    'border-red-500': errors.description,
                  })}

                ></FormTextarea>

                {errors.description && (
                  <div className='mt-2 text-red-500'>
                    {typeof errors.description.message === 'string' &&
                      errors.description.message}
                  </div>
                )}
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
