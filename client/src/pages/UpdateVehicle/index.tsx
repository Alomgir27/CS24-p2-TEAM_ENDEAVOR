import React, { useEffect, useState } from 'react';
import {
  FormCheck,
  FormHelp,
  FormInput,
  FormLabel,
  FormTextarea,
} from '../../base-components/Form';
import Button from '../../base-components/Button';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import Alert from '../../base-components/Alert';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import { useParams } from 'react-router-dom';
import { NotificationElement } from '../../base-components/Notification';
import { getVehicle, updateVehicle } from '../../services/vehicleService';

const index = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const schema = yup
    .object({
      vehicleNumber: yup.string().required().min(7),
      type: yup.string().required(),
      capacity: yup.string().required(),
      fuelCostLoaded: yup.number().required(),
      fuelCostUnloaded: yup.number().required(),
      details: yup.string().notRequired(),
    })
    .required();

  const {
    register,
    trigger,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onSubmit = async (data: any) => {
    const vehicleNumber = data.vehicleNumber || '';
    const type = data.type || '';
    const capacity = data.capacity || '';
    const fuelCostLoaded = data.fuelCostLoaded || '';
    const fuelCostUnloaded = data.fuelCostUnloaded || '';
    const details = data.details || '';

    setLoading(true);

    try {
      const res = await updateVehicle({
        vehicleId: id as string,
        vehicleNumber,
        type,
        capacity,
        fuelCostLoaded,
        fuelCostUnloaded,
        details,
      });
      if (res.status === 200) {
        setSuccess('Vehicle updated successfully');
        setTimeout(() => {
          setSuccess('');
          navigate('/vehicles');
        }, 1000);
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
    getVehicle(id as string)
      .then((res) => {
        const { vehicle } = res.data;
        reset({
          vehicleNumber: vehicle.vehicleNumber,
          type: vehicle.type,
          capacity: vehicle.capacity,
          fuelCostLoaded: vehicle.fuelCostLoaded,
          fuelCostUnloaded: vehicle.fuelCostUnloaded,
          details: vehicle.details,
        });
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }, [id]);

  return (
    <>
      <div className='flex items-center mt-8 intro-y'>
        <h2 className='mr-auto text-lg font-medium'>Update Vehicle</h2>
      </div>
      <div className='grid grid-cols-12 gap-6 mt-5'>
        <div className='col-span-12 intro-y lg:col-span-6 intro-y box'>
          <div className='flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400'>
            <h2 className='mr-auto text-base font-medium'>
              Update Vehicle Form
            </h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className='p-5'>
            <FormLabel>Vehicle Registration Number</FormLabel>
            <FormInput
              id='vehicleNumber'
              type='text'
              placeholder='Enter vehicle registration number'
              {...register('vehicleNumber')}
              className={clsx('input', {
                'border-red-500': errors.name,
              })}
            />
            <FormHelp type='error'>
              {errors.vehicleNumber?.message as string}
            </FormHelp>

            <FormLabel>Type</FormLabel>
            <select
              className={twMerge([
                'disabled:bg-slate-100 disabled:cursor-not-allowed disabled:dark:bg-darkmode-800/50',
                '[&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50',
                'transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md py-2 px-3 pr-8 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50',
              ])}
              {...register('type')}
              id='type'
            >
              <option value=''>Select vehicle type</option>
              <option value='Open Truck'>Open Truck</option>
              <option value='Dump Truck'>Dump Truck</option>
              <option value='Compactor'>Compactor</option>
              <option value='Container Carrier'>Container Carrier</option>
            </select>
            <FormHelp type='error'>{errors.type?.message as string}</FormHelp>

            <FormLabel>Capacity</FormLabel>
            <select
              className={twMerge([
                'disabled:bg-slate-100 disabled:cursor-not-allowed disabled:dark:bg-darkmode-800/50',
                '[&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50',
                'transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md py-2 px-3 pr-8 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50',
              ])}
              {...register('capacity')}
              id='capacity'
            >
              <option value=''>Select vehicle capacity</option>
              <option value='3 ton'>3 ton</option>
              <option value='5 ton'>5 ton</option>
              <option value='7 ton'>7 ton</option>
              <option value='15 ton'>15 ton</option>
            </select>
            <FormHelp type='error'>
              {errors.capacity?.message as string}
            </FormHelp>

            <FormLabel>Fuel cost per kilometer - fully loaded</FormLabel>
            <FormInput
              id='fuelCostLoaded'
              type='number'
              placeholder='Enter fuel cost per kilometer - fully loaded'
              {...register('fuelCostLoaded')}
              className={clsx('input', {
                'border-red-500': errors.name,
              })}
            />
            <FormHelp type='error'>
              {errors.fuelCostLoaded?.message as string}
            </FormHelp>

            <FormLabel>Fuel cost per kilometer - unloaded</FormLabel>
            <FormInput
              id='fuelCostUnloaded'
              type='number'
              placeholder='Enter fuel cost per kilometer - unloaded'
              {...register('fuelCostUnloaded')}
            />
            <FormHelp type='error'>
              {errors.fuelCostUnloaded?.message as string}
            </FormHelp>

            <FormLabel>Details</FormLabel>
            <FormInput
              id='details'
              type='text'
              placeholder='Enter vehicle details'
              {...register('details')}
            />
            <FormHelp type='error'>
              {errors.details?.message as string}
            </FormHelp>

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

            <Button
              type='submit'
              className='mt-5'
              variant='primary'
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Submit'}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default index;
