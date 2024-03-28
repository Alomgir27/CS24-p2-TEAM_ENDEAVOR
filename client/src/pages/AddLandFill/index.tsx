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
import TomSelect from '../../base-components/TomSelect';
import Button from '../../base-components/Button';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createLandfill } from '../../services/landfillService';
import { getLandfillManagers } from '../../services/landfillService';
import Alert from '../../base-components/Alert';
import Notification from '../../base-components/Notification';
import { NotificationElement } from '../../base-components/Notification';
import { useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import clsx from 'clsx';
import { IUser } from '../../types';
import { useEffect } from 'react';



const Index = () => {
    const schema = yup
        .object({
            name: yup.string().required(),
            capacity: yup.number().required(),
            operationalTimespan: yup.string().required(),
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
    const [gpsCoordinate, setGpsCoordinate] = useState<LatLngTuple>([23.8103, 90.4125]);
    const [landfillManagers, setLandfillManagers] = useState<IUser[]>([]);
    const [landfillManager, setLandfillManager] = useState<string[]>([]);

    useEffect(() => {
        const fetchLandfillManagers = async () => {
            const { data } = await getLandfillManagers();
            setLandfillManagers(data.managers);
        };

        fetchLandfillManagers();
    }, []);

    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
            await createLandfill({
                name: data.name,
                capacity: data.capacity,
                operationalTimespan: data.operationalTimespan,
                gpsCoordinates: [gpsCoordinate[1], gpsCoordinate[0]],
                landfillManager: landfillManager,
                details: data.details
            });
            setType('success');
            setMessage('Landfill added successfully');
            notificationRef.current?.showToast();
            reset();
            setGpsCoordinate([23.8103, 90.4125]);
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
        <div className="container mx-auto">
            <h1 className="text-2xl font-semibold mb-4">Add Landfill</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormLabel>Name</FormLabel>
                <FormInput
                    type="text"
                    placeholder="Landfill Name"
                    {...register('name')}
                />
                <FormHelp>{errors.name?.message as string}</FormHelp>
        
                <FormLabel>Capacity</FormLabel>
                <FormInput
                    type="number"
                    placeholder="Capacity"
                    {...register('capacity')}
                />
                <FormHelp>{errors.capacity?.message as string}</FormHelp>

                <div className="mb-4 w-full">
                  <FormLabel className="mb-2">Landfill Manager</FormLabel>
                
                    <TomSelect
                        id="landfillManager"
                        value={landfillManager}
                        onChange={setLandfillManager}
                        className="w-full bg-stone-50 dark:bg-darkmode-800"
                        multiple
                        required
                        placeholder="Select Landfill Manager"
                    >
                        {landfillManagers.map((manager) => (
                            <option key={manager._id} value={manager._id}>
                                {manager.username}
                            </option>
                        ))}
                    </TomSelect>
                </div>  
        
                <FormLabel>Operational Timespan</FormLabel>
                <FormInput
                    type="number"
                    placeholder="Operational Timespan in hours"
                    id="operationalTimespan"
                    {...register('operationalTimespan')}
                />
                <FormHelp>{errors.operationalTimespan?.message as string}</FormHelp>
        
                <FormLabel>Details</FormLabel>
                <FormInput
                    type="text"
                    placeholder="Details"
                    {...register('details')}
                />
                <FormHelp>{errors.details?.message as string}</FormHelp>
        
                <FormLabel>Location</FormLabel>
                <MapContainer
                    center={gpsCoordinate}
                    zoom={13}
                    style={{ height: '400px' }}
                    className="mb-4"
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={gpsCoordinate} draggable={true} eventHandlers={{
                        dragend: (e) => {
                            setGpsCoordinate([e.target.getLatLng().lat, e.target.getLatLng().lng]);
                        }
                    }}>
                        <Popup>Landfill Location</Popup>
                    </Marker>
                </MapContainer>
        
                <Button type="submit" disabled={loading} className="bg-primary text-white">
                    {loading ? 'Adding Landfill' : 'Add Landfill'}
                </Button>
            </form>
            <Notification
                getRef={(ref) => notificationRef.current = ref}
                className={clsx('mb-4 p-2 flex')}
                options={{ duration: 3000 }}
                type={type}
            >
                {message}
            </Notification>
        </div>
    );
}

export default Index;