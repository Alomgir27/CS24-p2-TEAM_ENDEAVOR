import React, { useEffect, useState } from 'react';
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
import { createVehicle } from '../../services/vehicleService';
import Alert from '../../base-components/Alert';
import Notification from '../../base-components/Notification';
import { NotificationElement } from '../../base-components/Notification';
import { useRef } from 'react';
import { twMerge } from 'tailwind-merge';


const index = () => {
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

    const notificationRef = useRef<NotificationElement>(null);
    const [type, setType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

  const onSubmit = async (data : any) => {
    const vehicleNumber = data.vehicleNumber || '';
    const type = data.type || '';
    const capacity = data.capacity || '';
    const fuelCostLoaded = data.fuelCostLoaded || '';
      const fuelCostUnloaded = data.fuelCostUnloaded || '';
    const details = data.details || '';

      console.log(vehicleNumber, type, capacity, fuelCostLoaded, fuelCostUnloaded, details);
    setLoading(true);

    try {
      const response = await createVehicle({ vehicleNumber, type, capacity, fuelCostLoaded, fuelCostUnloaded, details });
      console.log(response);
        if (response.status === 201) {
            setMessage('Vehicle created successfully');
            setType('success');
            notificationRef.current?.showToast();
            setTimeout(() => {
                setMessage('');
                notificationRef.current?.hideToast();
            }, 3000);
        reset();
        } else {
            setMessage('Something went wrong');
            setType('error');
            notificationRef.current?.showToast();
      }
    } catch (error) {
        setMessage('Something went wrong');
        setType('error');
        notificationRef.current?.showToast();
        console.error(error);
      
      }
    setLoading(false);
    };
    
    //create a random vehicle number for simplicity it's having 7 characters 
    useEffect(() => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < 7; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        reset({ vehicleNumber: result });
    }
    , []);

  return (
      <>
          <Notification getRef={(ref) => notificationRef.current = ref} className={clsx('mb-4 p-2')} options={{ duration: 3000 }} type={type}>
                {message}
          </Notification>
          
          <div className='intro-y flex items-center mt-8'>
              <h2 className='text-lg font-medium mr-auto'>Add Vehicle</h2>
          </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormLabel>Vehicle Registration Number</FormLabel>
                <FormInput
                    id='vehicleNumber'
                    type='text'
                    placeholder='Enter vehicle registration number'
                    {...register('vehicleNumber')}
                />
                <FormHelp type='error'>{errors.vehicleNumber?.message as string}</FormHelp>
    
                <FormLabel>Type</FormLabel>
              <select
                  className={twMerge([
                    "disabled:bg-slate-100 disabled:cursor-not-allowed disabled:dark:bg-darkmode-800/50",
                    "[&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50",
                      "transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md py-2 px-3 pr-8 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50"
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
                      "disabled:bg-slate-100 disabled:cursor-not-allowed disabled:dark:bg-darkmode-800/50",
                      "[&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50",
                      "transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md py-2 px-3 pr-8 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50"
                  ])}
                  {...register('capacity')}
                  id='capacity'
                >
                    <option value=''>Select vehicle capacity</option>
                    <option value='3 ton'>3 ton</option>
                    <option value='5 ton'>5 ton</option>
                    <option value='7 ton'>7 ton</option>
                </select>
                <FormHelp type='error'>{errors.capacity?.message as string}</FormHelp>
    
                <FormLabel>Fuel cost per kilometer - fully loaded</FormLabel>
                <FormInput
                    id='fuelCostLoaded'
                    type='number'
                    placeholder='Enter fuel cost per kilometer - fully loaded'
                    {...register('fuelCostLoaded')}
                />
                <FormHelp type='error'>{errors.fuelCostLoaded?.message as string}</FormHelp>
    
                <FormLabel>Fuel cost per kilometer - unloaded</FormLabel>
                <FormInput
                    id='fuelCostUnloaded'
                    type='number'
                    placeholder='Enter fuel cost per kilometer - unloaded'
                    {...register('fuelCostUnloaded')}
                />
                <FormHelp type='error'>{errors.fuelCostUnloaded?.message as string}</FormHelp>
    
                <FormLabel>Details</FormLabel>
                <FormInput
                    id='details'
                    type='text'
                    placeholder='Enter vehicle details'
                    {...register('details')}
                />
                <FormHelp type='error'>{errors.details?.message as string}</FormHelp>
    
              <Button type='submit' className='mt-5' variant='primary' disabled={loading}>
                  {loading ? 'Loading...' : 'Submit'}
                </Button>
          </form>
        </> 
    );
}

export default index;