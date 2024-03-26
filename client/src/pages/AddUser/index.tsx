import React, { useState } from 'react';
import {
  FormSelect,
  FormInput,
  FormLabel,
  FormHelp,
  FormCheck,
  FormSwitch,
  FormInline,
  InputGroup,
} from '../../base-components/Form';
import Button from '../../base-components/Button';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { createUser } from '../../services/userService';

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const index = () => {
  const schema = yup
    .object({
      username: yup.string().required().min(2),
      email: yup.string().required().email(),
      password: yup.string().required().min(6),
      confirmPassword: yup
        .string()
        .required()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
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

  const [role, setRole] = useState('Unassigned');
  const [submitSuccessText, setsubmitSuccessText] = useState('');
  const [submitErrorText, setSetsubmitErrorText] = useState('');

  const onSubmit = async (data: FormData) => {
    const response = await createUser({
      username: data.username,
      email: data.email,
      password: data.password,
      role: role,
    });

    if (response.status == 201) {
      setsubmitSuccessText('User created successfully');
      setsubmitSuccessText('');
    } else {
      setsubmitSuccessText('');
      setsubmitSuccessText('Something went wrong... ');
    }
  };

  return (
    <>
      <div className='flex items-center mt-8 intro-y'>
        <h2 className='mr-auto text-lg font-medium'>Add new user</h2>
      </div>
      <div className='grid grid-cols-12 gap-6 mt-5'>
        <div className='col-span-12 intro-y lg:col-span-6 intro-y box'>
          <div className='flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400'>
            <h2 className='mr-auto text-base font-medium'>User form</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='p-5'>
              <div>
                <FormLabel htmlFor='username'>Username</FormLabel>
                <FormInput
                  id='username'
                  type='text'
                  placeholder='Enter username'
                  {...register('username')}
                  className={clsx({
                    'border-danger': errors.username,
                  })}
                />

                {errors.username && (
                  <div className='mt-2 text-danger'>
                    {typeof errors.username.message === 'string' &&
                      errors.username.message}
                  </div>
                )}
              </div>
              <div className='mt-3'>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <FormInput
                  id='email'
                  type='text'
                  placeholder='example@gmail.com'
                  {...register('email')}
                  className={clsx({
                    'border-danger': errors.email,
                  })}
                />
                {errors.email && (
                  <div className='mt-2 text-danger'>
                    {typeof errors.email.message === 'string' &&
                      errors.email.message}
                  </div>
                )}
              </div>
              <div className='mt-3'>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <FormInput
                  id='password'
                  type='password'
                  placeholder='Password'
                  {...register('password')}
                  className={clsx({
                    'border-danger': errors.password,
                  })}
                />

                {errors.password && (
                  <div className='mt-2 text-danger'>
                    {typeof errors.password.message === 'string' &&
                      errors.password.message}
                  </div>
                )}
              </div>

              <div className='mt-3'>
                <FormLabel htmlFor='confirm-password'>Password</FormLabel>
                <FormInput
                  id='confirm-password'
                  type='password'
                  placeholder='Confirm Password'
                  {...register('confirmPassword')}
                  className={clsx({
                    'border-danger': errors.confirmPassword,
                  })}
                />

                {errors.confirmPassword && (
                  <div className='mt-2 text-danger'>
                    {typeof errors.confirmPassword.message === 'string' &&
                      errors.confirmPassword.message}
                  </div>
                )}
              </div>

              <div className='mt-3'>
                <FormLabel htmlFor='role'>Password</FormLabel>
                <FormSelect
                  id='role'
                  aria-label='.form-select-lg example'
                  className='sm:mt-2 sm:mr-2'
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option>System Admin</option>
                  <option>STS Manager</option>
                  <option>Landfill Manager</option>
                  <option>Unassigned</option>
                </FormSelect>
              </div>

              <div className='mt-5 flex'>
                <Button variant='primary' type='submit'>
                  Submit
                </Button>

                {submitSuccessText && (
                  <div className='ml-2 p-2 font-medium text-success'>
                    {submitSuccessText}
                  </div>
                )}

                {submitErrorText && (
                  <div className='ml-2 p-2 font-medium text-danger'>
                    {submitErrorText}
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default index;
