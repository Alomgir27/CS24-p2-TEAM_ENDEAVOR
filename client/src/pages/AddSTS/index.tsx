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
import { getVehicles, getManagers, createSTS } from '../../services/vehicleService';
import Alert from '../../base-components/Alert';
import Notification from '../../base-components/Notification';
import { NotificationElement } from '../../base-components/Notification';
import { useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { IVehicle } from '../../types';
import { IManager } from '../../types';
import { ISts } from '../../types';
import { MapOptions } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import TomSelect from '../../base-components/TomSelect';



const index = () => {
    const schema = yup
        .object({
            wardNumber: yup.string().required(),
            capacity: yup.string().required(),
            details: yup.string().notRequired()
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
    const [vehicles, setVehicles] = useState<IVehicle[]>([]);
    const [managers, setManagers] = useState<IManager[]>([]);
    const [gpsCoordinate, setGpsCoordinate] = useState<LatLngTuple>([23.8103, 90.4125]);
    const [stsManager, setStsManager] = useState<string[]>([]);
    const [vehicleEntries, setVehicleEntries] = useState<string[]>([]);

    useEffect(() => {
        getVehicles().then((response) => {
            if (response.status === 200) {
                setVehicles(response.data.vehicles);
                console.log(response.data.vehicles);
            }
        });
    }, []);

    useEffect(() => {
        getManagers().then((response) => {
            if (response.status === 200) {
                setManagers(response.data.managers);
                console.log(response.data.managers);
            }
        });
    }, []);

    const onSubmit = async (data: any) => {
        const wardNumber = data.wardNumber || '';
        const capacity = data.capacity || '';
        const details = data.details || '';
        const gpsCoordinates: [number, number] = [gpsCoordinate[1], gpsCoordinate[0]];
        setLoading(true);

        try {
            const response = await createSTS({ wardNumber, capacity, gpsCoordinates, stsManager, vehicleEntries, details });
            console.log(response);
            if (response.status === 201) {
                setMessage('STS created successfully');
                setType('success');
                notificationRef.current?.showToast();
                setTimeout(() => {
                    setMessage('');
                    notificationRef.current?.hideToast();
                    reset();
                    setGpsCoordinate([23.8103, 90.4125]);
                    setStsManager([]);
                    setVehicleEntries([]);
                    window.location.reload();
                }, 1000);
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

    //enter a random ward number for simplicity
    useEffect(() => {
        let result = '';
        const characters = '0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < 2; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        console.log(result)
        reset({ wardNumber: result });
    }, []);

    return (
        <>
            <Notification getRef={(ref) => notificationRef.current = ref} className={clsx('mb-4 p-2')} options={{ duration: 3000 }} type={type}>
                {message}
            </Notification>

            <div className='intro-y flex items-center mt-8'>
                <h2 className='text-lg font-medium mr-auto'>Add STS</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormLabel>Ward Number</FormLabel>
                <FormInput
                    id='wardNumber'
                    type='text'
                    placeholder='Enter ward number'
                    {...register('wardNumber')}
                />
                <FormHelp type='error'>{errors.wardNumber?.message as string}</FormHelp>

                <FormLabel>Capacity</FormLabel>
                <FormInput
                    id='capacity'
                    type='number'
                    placeholder='Enter capacity in tonnes'
                    {...register('capacity')}
                />
                <FormHelp type='error'>{errors.capacity?.message as string}</FormHelp>
                <FormLabel>Select GPS Coordinates</FormLabel>
                <MapContainer center={gpsCoordinate} zoom={13} style={{ height: '400px', marginBottom: '20px' }}>
                    <TileLayer
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={gpsCoordinate} draggable={true} eventHandlers={{
                        dragend: (e) => {
                            setGpsCoordinate([e.target.getLatLng().lat, e.target.getLatLng().lng]);
                        }
                    }}>
                        <Popup>
                            For STS location drag the marker to the desired location
                        </Popup>
                    </Marker>
                </MapContainer>

                <div className='flex flex-col gap-4'>
                   <div className='flex flex-col gap-4'>
                        <FormLabel for='stsManager'>STS Manager</FormLabel>
                        <TomSelect
                            id="stsManager"
                            value={stsManager}
                            onChange={setStsManager}
                            className="w-full bg-stone-50 dark:bg-darkmode-800"
                            multiple
                            required
                            placeholder="Select STS Manager"
                        >
                            {managers.map((manager) => (
                                <option key={manager._id} value={manager._id}>
                                    {manager?.username}
                                </option>
                            ))}
                            </TomSelect>
                    </div>

                    <div className='flex flex-col gap-4'>

                     <FormLabel>Vehicle Entries</FormLabel>
                        <TomSelect
                            id="vehicleEntries"
                            value={vehicleEntries}
                            onChange={setVehicleEntries}
                            className="w-full bg-stone-50 dark:bg-darkmode-800"
                            placeholder="Select Vehicle Entries"
                            multiple
                            required
                        >
                            {vehicles.filter(vehicle => !vehicle.isAllocated).map((vehicle) => (
                                <option key={vehicle._id} value={vehicle._id} disabled={vehicle.isAllocated}>
                                    {vehicle.vehicleNumber}
                                </option>
                            ))}
                        </TomSelect>
                    </div>

                    <FormLabel>Details</FormLabel>
                    <FormInput
                        id='details'
                        type='text'
                        placeholder='Enter STS details'
                        {...register('details')}
                    />

                    <FormHelp>{errors.details?.message as string}</FormHelp>
                    
                </div>

                <Button type='submit' className='mt-5' variant='primary' disabled={loading}>
                    {loading ? 'Loading...' : 'Submit'}
                </Button>
            </form>
        </>

    );
}

export default index;