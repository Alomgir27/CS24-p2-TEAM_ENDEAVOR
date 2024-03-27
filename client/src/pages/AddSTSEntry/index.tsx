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
import { getSTS, addStsEntry } from '../../services/vehicleService';
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
    const [stsId, setStsId] = useState<string>('');
    const [vehicleId, setVehicleId] = useState<string>('');

    const [sts, setSts] = useState<any[]>([]);
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchSts = async () => {
            try {
                const res = await getSTS();
                const { sts } = res.data;
                console.log(sts);
                let stsData = sts.map(async (sts: any) => {
                    return {
                        _id: sts._id,
                        wardNumber: sts.wardNumber,
                        location: await getlocation(sts.gpsCoordinates.coordinates),
                        gpsCoordinates: sts.gpsCoordinates.coordinates,
                        vehicles: sts.vehicleEntries
                    }
                });
                setSts(await Promise.all(stsData));
            } catch (error) {
                console.error(error);
            }
        };
        fetchSts();
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

        console.log(stsId, vehicleId, volume, timeOfArrival, timeOfDeparture, details);
        setLoading(true);

        try {
            const response = await addStsEntry({ stsId, vehicleId, volume, timeOfArrival, timeOfDeparture, details });
            console.log(response);
            if (response.status === 201) {
                setMessage('STS entry created successfully');
                setType('success');
                notificationRef.current?.showToast();
                setTimeout(() => {
                    setMessage('');
                    notificationRef.current?.hideToast();
                    reset();
                    setStsId('');
                    setVehicleId('');
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
    }

    useEffect(() => {
        let vehicleData = sts.filter((sts: any) => sts._id === stsId);
        setVehicles(vehicleData[0]?.vehicles);
    }
    , [stsId]);

    


    return (
        <>
            <Notification getRef={(ref) => notificationRef.current = ref} className={clsx('mb-4 p-2 flex')} options={{ duration: 3000 }} type={type}>
                {message}
            </Notification>

            <div className='intro-y flex items-center mt-8'>
                <h2 className='text-lg font-medium mr-auto'>Add STS Entry</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormLabel>STS</FormLabel>
                <select
                    className={twMerge([
                        "disabled:bg-slate-100 disabled:cursor-not-allowed disabled:dark:bg-darkmode-800/50",
                        "[&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50",
                        "transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md py-2 px-3 pr-8 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50"
                    ])}
                    id='stsId'
                    value={stsId}
                    onChange={(e) => setStsId(e.target.value)}
                >
                    <option value=''>Select STS</option>
                    {sts.map((sts: any) => (
                        <option key={sts._id} value={sts._id}>Ward No: {sts.wardNumber} - {sts.location}</option>
                    ))}
                </select>
                {stsId && (
                <>
                  <FormLabel className='mt-5'>Vehicle</FormLabel>
                    <select
                        className={twMerge([
                            "disabled:bg-slate-100 disabled:cursor-not-allowed disabled:dark:bg-darkmode-800/50",
                            "[&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50",
                            "transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md py-2 px-3 pr-8 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50"
                        ])}
                        id='vehicleId'
                        value={vehicleId}
                        onChange={(e) => setVehicleId(e.target.value)}
                    >
                        <option value=''>Select vehicle</option>
                        {vehicles && vehicles?.map((vehicle: any) => (
                            <option key={vehicle._id} value={vehicle._id}>{vehicle.vehicleNumber}</option>
                        ))}
                        </select>
                </>
            )}

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