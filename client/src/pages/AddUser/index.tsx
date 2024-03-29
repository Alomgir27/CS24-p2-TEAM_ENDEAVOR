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
import Notification from '../../base-components/Notification';
import { NotificationElement } from '../../base-components/Notification';
import { useRef } from 'react';
import { useEffect } from 'react';
import Lucide from '../../base-components/Lucide';
import _ from 'lodash';
import { useNavigate } from 'react-router';
import { getRoles } from '../../services/roleService';
import { IRole } from '../../types';


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
    const [roles, setRoles] = useState<IRole[]>([]);
    const [notification, setNotification] = useState<string | null>(null);
    const [type, setType] = useState<'success' | 'error' | 'warning' | 'info'>(
        'success'
    );
    const notificationRef = useRef<NotificationElement>(null);
    const handleNotification = (message: string, type: typeof setType) => {
        setNotification(message);
        setType(type);
        notificationRef.current?.showToast();
    };
    const handleHideNotification = () => {
        setNotification(null);
        notificationRef.current?.hideToast();
    }
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            const res = await createUser({ ...data, role });
            console.log(res);
            handleNotification('User created successfully', 'success');
            setTimeout(() => {
                handleHideNotification();
                navigate('/users');
            }
            , 3000);
        } catch (error) {
            console.error(error);
            handleNotification(error.response.data.message, 'error');
            setTimeout(() => handleHideNotification(), 3000);
        } finally {
            setLoading(false);
        }
  }
  
  useEffect(() => {
    const fetchRoles = async () => {
        try {
            const res = await getRoles();
            const { roles } = res.data;
          setRoles(roles);
          console.log(roles);
        } catch (error) {
            console.error(error);
        }
    };
    fetchRoles();
  }, []);
    

        

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
                    'border-danger': errors?.username,
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
                  required
                >
                  <option value='Unassigned'>Unassigned</option>
                  {roles.map((role) => (
                    <option key={role._id} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                  
                </FormSelect>
              </div>

              <div className='mt-5 flex'>
                <Button variant='primary' type='submit' disabled={loading}>
                    {loading ? 'Loading...' : 'Create User'}
                 </Button>
                <Notification
                  getRef={(el) => {
                    notificationRef.current = el;
                  }}
                    className='flex'
                >
                    <Lucide
                        icon='CheckCircle'
                        className={`w-6 h-6 text-${
                            type === 'success' ? 'green' : 'red'
                            }-500`}
                    />  
                    <div className='ml-4 mr-4'>
                        <div className='font-medium'>{_.startCase(type)}</div>
                        <div className='mt-1 text-slate-500'>{notification}</div>
                    </div>
                </Notification>
                              
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default index;