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
    FormTextarea
} from '../../base-components/Form';
import Button from '../../base-components/Button';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { getLandfills, addLandfillEntry } from '../../services/landfillService';
import Alert from '../../base-components/Alert';
import Notification from '../../base-components/Notification';
import { NotificationElement } from '../../base-components/Notification';
import { useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';

const Index = () => {
    const schema = yup
        .object({
            volume: yup.number().required(),
            timeOfArrival: yup.date().required(),
            timeOfDeparture: yup.date().required(),
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
    const [landfillId, setLandfillId] = useState<string>('');
    const [landfills, setLandfills] = useState<any[]>([]);
    
    useEffect(() => {
        const fetchLandfills = async () => {
            try {
                const res = await getLandfills();
                const { landfills } = res.data;
                console.log(landfills);
                let landfillData = landfills.map(async (landfill: any) => {
                    return {
                        _id: landfill._id,
                        name: landfill.name,
                        location: await getlocation(landfill.gpsCoordinates.coordinates),
                        gpsCoordinates: landfill.gpsCoordinates.coordinates
                    }
                });
                setLandfills(await Promise.all(landfillData));
            } catch (error) {
                console.error(error);
            }
        };
        fetchLandfills();
    }, []);
    


   

    const getlocation = async (coords: any) => {
        let position = {
            coords: {
                latitude: coords[1],
                longitude: coords[0]
            }
        }
        const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
        return res?.data?.display_name || '';

            
    }

    const onSubmit = async (data: any) => {
        const volume = data.volume || '';
        const timeOfArrival = data.timeOfArrival || '';
        const timeOfDeparture = data.timeOfDeparture || '';
        const details = data.details || '';
        setLoading(true);

        try {
            const response = await addLandfillEntry({ landfillId, volume, timeOfArrival, timeOfDeparture, details });
            console.log(response);
            setType('success');
            setMessage('Landfill entry added successfully');
            notificationRef.current?.showToast();
            reset();
            setTimeout(() => {
                notificationRef.current?.hideToast();
            }, 3000);
        } catch (error) {
            setType('error');
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Notification getRef={(ref) => notificationRef.current = ref} className={clsx('mb-4 p-2 flex')} options={{ duration: 3000 }} type={type}>
                {message}
            </Notification>

            <div className='intro-y flex items-center mt-8'>
                <h2 className='text-lg font-medium mr-auto'>Add Landfill Entry</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormLabel>Landfill</FormLabel>
                <select
                    className={twMerge([
                        "disabled:bg-slate-100 disabled:cursor-not-allowed disabled:dark:bg-darkmode-800/50",
                        "[&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50",
                        "transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md py-2 px-3 pr-8 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50"
                    ])}
                    id='landfillId'
                    value={landfillId}
                    onChange={(e) => setLandfillId(e.target.value)}
                >
                    <option value=''>Select Landfill</option>
                    {landfills.map((landfill: any) => (
                        <option key={landfill._id} value={landfill._id}>{landfill.name} - {landfill.location}</option>
                    ))}
                </select>

                <FormLabel className='mt-5'>Volume</FormLabel>
                <FormInput
                    id='volume'
                    type='number'
                    placeholder='Enter volume in tons'
                    {...register('volume')}
                />
                <FormHelp>{errors.volume?.message as string}</FormHelp>

                <FormLabel>Time of Arrival</FormLabel>
                <FormInput
                    id='timeOfArrival'
                    type='datetime-local'
                    placeholder='Enter time of arrival'
                    {...register('timeOfArrival')}
                />
                <FormHelp>{errors.timeOfArrival?.message as string}</FormHelp>

                <FormLabel>Time of Departure</FormLabel>
                <FormInput
                    id='timeOfDeparture'
                    type='datetime-local'
                    placeholder='Enter time of departure'
                    {...register('timeOfDeparture')}
                />
                <FormHelp>{errors.timeOfDeparture?.message as string}</FormHelp>

                <FormLabel>Details</FormLabel>
                <FormTextarea
                    id='details'
                    placeholder='Enter details'
                    {...register('details')}
                />
                <FormHelp>{errors.details?.message as string}</FormHelp>

                <Button type='submit' className='mt-5' variant='primary' disabled={loading}>
                    {loading ? 'Loading...' : 'Submit'}
                </Button>
            </form>
        </>
    );

}

export default Index;
