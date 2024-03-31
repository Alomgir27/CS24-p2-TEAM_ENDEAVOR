import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import { getSTSEntries } from '../../services/vehicleService';
import { getAllLandfills } from '../../services/landfillService';
import { createRoute } from '../../services/routeService';
import axios from 'axios';
import {
    FormInput,
    FormLabel,
    FormHelp,
    FormCheck,
    FormSwitch,
    FormInline,
} from '../../base-components/Form';
import Notification from '../../base-components/Notification';
import { NotificationElement } from '../../base-components/Notification';
import { useRef } from 'react';
import Button from '../../base-components/Button';



const DhakaMap = () => {
    const [map, setMap] = useState(null);
    const [routeControl, setRouteControl] = useState<any>(null);
    const [distanceInKm, setDistanceInKm] = useState(0);
    const [stsEntries, setStsEntries] = useState<any[]>([]);
    const [landfills, setLandfills] = useState<any[]>([]);
    const [stsLocation, setStsLocation] = useState<any[]>([]);
    const [landfillLocation, setLandfillLocation] = useState<any[]>([]);
    const [stsEntryId, setStsEntryId] = useState<string>('');
    const [landfillId, setLandfillId] = useState<string>('');
    const [numberOfTrips, setNumberOfTrips] = useState<number | null>(1);
    const [cost, setCost] = useState<number | null>(0);
    const [costPerKm, setCostPerKm] = useState<number | null>(0);
    const notificationRef = useRef<NotificationElement>(null);
    const [type, setType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState<string>('');
    const [distanceAndLocation, setDistanceAndLocation] = useState<any[]>([]);
    


    const fetchStsEntry = async () => {
        setLoading(true);
        try {
            const res = await getSTSEntries();
            const { stsEntries } = res.data;
            console.log(stsEntries);
            let stsEntriesData = stsEntries.map(async (stsEntry: any) => {
                return {
                    ...stsEntry,
                    location: await getlocation(stsEntry.stsId.gpsCoordinates.coordinates),
                }
            });
            setStsEntries(await Promise.all(stsEntriesData));
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchLandfills = async () => {
        try {
            const res = await getAllLandfills();
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

    useEffect(() => {
        fetchStsEntry();
        fetchLandfills();
    }, []);

    const getlocation = async (coords: any) => {
        let position = {
            coords: {
                latitude: coords[1],
                longitude: coords[0]
            }
        }
        // const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
        // return res?.data?.display_name || '';
        return `${position.coords.latitude}, ${position.coords.longitude}`;
    }

  useEffect(() => {
    if (!map) {
      const dhakaCenter = [23.8103, 90.4125];
      const zoomLevel = 11;

     const mapInstance = L.map('map').setView(dhakaCenter as any, zoomLevel);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; Wastage Management System'
      }).addTo(mapInstance);

      setMap(mapInstance as any);
    }
  }, [map]);

  useEffect(() => {
      if (map && stsLocation && landfillLocation) {
        //clear previous route
        if (routeControl) {
            routeControl.setWaypoints([]);
        }
        const place1 = [stsLocation[1], stsLocation[0]]; // STS location [latitude, longitude]
        const place2 = [landfillLocation[1], landfillLocation[0]]; // Landfill location [latitude, longitude]

      const instance = L.Routing.control({
        waypoints: [
          L.latLng(place1[0], place1[1]),
          L.latLng(place2[0], place2[1])
        ],
        routeWhileDragging: true
      }).addTo(map);
      setRouteControl(instance);
    }
  }, [map, stsLocation, landfillLocation]);
    
    useEffect(() => {
        if (routeControl) {
            routeControl.on('routesfound', function (e) {
                const routes = e.routes;
                const summary = routes[0].summary;
                setDistanceInKm(summary.totalDistance / 1000);
                console.log('Total distance in km:', summary.totalDistance / 1000);
            });
        }
    }, [routeControl]);

    useEffect(() => {
        if (stsEntryId) {
            const stsEntry = stsEntries.find((stsEntry) => stsEntry._id === stsEntryId);
            //get distance between STS location and landfills location one by one
            let distanceAndLocation: any[] = [];
            landfills.forEach((landfill) => {
                const place1 = stsEntry.stsId.gpsCoordinates.coordinates;
                const place2 = landfill.gpsCoordinates;
                const distance = L.latLng(place1[1], place1[0]).distanceTo(L.latLng(place2[1], place2[0])) / 1000;
                distanceAndLocation.push({
                    landfillId: landfill._id,
                    landfillName: landfill.name,
                    landfillLocation: landfill.location,
                    distance
                });
            }
            );
            //sort by distance
            distanceAndLocation.sort((a, b) => a.distance - b.distance);
            setDistanceAndLocation(distanceAndLocation);
            if(distanceAndLocation.length > 0){
                setLandfillId(distanceAndLocation[0].landfillId);
                setLandfillLocation(landfills.find((landfill) => landfill._id === distanceAndLocation[0].landfillId).gpsCoordinates);
            }
        }
    }
    , [stsEntryId]);

    

    useEffect(() => {
        if (stsEntryId && landfillId && distanceInKm && numberOfTrips) {
            const { vehicleId } = stsEntries.find((stsEntry) => stsEntry._id === stsEntryId);
            const { fuelCostLoaded, fuelCostUnloaded } = vehicleId;
            const capacity = parseInt(vehicleId.capacity.split(' ')[0]);
            const { volume } = stsEntries.find((stsEntry) => stsEntry._id === stsEntryId);
            const costPerKm = fuelCostUnloaded + (fuelCostLoaded - fuelCostUnloaded) * (volume / capacity);
            setCostPerKm(costPerKm);
            const cost = costPerKm * distanceInKm * numberOfTrips;
            setCost(cost);
           
        }
    }, [stsEntryId, landfillId, distanceInKm, numberOfTrips]);
    


    const handleCreateRoute = async () => {
        if (stsEntryId && landfillId && distanceInKm && numberOfTrips && cost) {
            setLoading(true);
            try {
                const res = await createRoute({
                    stsEntryId,
                    landfillId,
                    distance: distanceInKm,
                    cost,
                    numberOfTrips,
                    details
                });
                console.log(res);
                setType('success');
                setMessage('Route created successfully');
                notificationRef.current?.showToast();
                setTimeout(() => {
                    notificationRef.current?.hideToast();
                    window.location.reload();
                }, 1000);
                fetchStsEntry();
            } catch (error) {
                console.error(error);
                setType('error');
                setMessage('Failed to create route');
                notificationRef.current?.showToast();
                setTimeout(() => {
                    notificationRef.current?.hideToast();
                }, 3000);
            } finally {
                setLoading(false);
            }
        }
    }

    const handleLandfillChange = (e: any) => {
        const landfill = landfills.find((landfill) => landfill._id === e.target.value);
        if (landfill) {
            setLandfillLocation(landfill.gpsCoordinates);
            setLandfillId(landfill._id);
        }
    }
           
    
    


   

    return (
        <>
            <h1 className='text-2xl font-bold mb-4'>Optimize Route</h1>

            <h2 className='mb-4'>Select STS Entry</h2>
            <select onChange={(e) => {
                const stsEntry = stsEntries.find((stsEntry) => stsEntry._id === e.target.value);
                if (stsEntry) {
                    setStsLocation(stsEntry.stsId.gpsCoordinates.coordinates);
                    setStsEntryId(stsEntry._id);
                }
            }}
                className='mb-4 w-full border border-gray-300 rounded-md p-2'
                value={stsEntryId}
            >
                <option value="">{stsEntries.length > 0 ? 'Select STS Entry' : loading ? 'Loading...' : 'No STS Entry'}</option>
                {stsEntries.map((stsEntry) => (
                    <option key={stsEntry._id} value={stsEntry._id}
                        disabled={stsEntry.isAllocated}
                    >Ward {stsEntry?.stsId?.wardNumber} - Vehicle {stsEntry?.vehicleId?.vehicleNumber} - {stsEntry?.location?.split(',').slice(0, 2).join(',')}{stsEntry?.isAllocated ? ' - Allocated' : ''}</option>
                ))}
            </select>

            {/* table view for select */}

            <table className='table w-full mb-4'>
                <thead>
                    <tr className='bg-gray-100'>
                        <th>Ward Number</th>
                        <th>Vehicle Number</th>
                        <th>Location</th>
                        <th>Volume</th>
                        <th>Allocated</th>
                    </tr>
                </thead>
                <tbody className='overflow-y-scroll h-40 text-center'>
                    {stsEntries?.map((stsEntry) => (
                        <tr key={stsEntry._id}>
                            <td>Ward {stsEntry?.stsId?.wardNumber}</td>
                            <td>{stsEntry?.vehicleId?.vehicleNumber}</td>
                            <td>{stsEntry?.location.split(',').slice(0, 2).join(',')}</td>
                            <td>{stsEntry?.volume}</td>
                            <td>{stsEntry?.isAllocated ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
                
            <h2 className='mb-4'>Select Landfill</h2>
            <select onChange={handleLandfillChange}
                className='mb-4 w-full border border-gray-300 rounded-md p-2'
                value={landfillId}

            >
                <option value="">Select Landfill</option>
                {landfills.map((landfill) => (
                    <option key={landfill._id} value={landfill._id}>{landfill.name} - {landfill.location?.split(',').slice(0, 2).join(',')}</option>
                ))}
            </select>

           

            {/* table view for select */}
            <table className='table w-full'>
                <thead>
                    <tr>
                        <th>Selected</th>
                        <th>Landfill Name</th>
                        <th>Location</th>
                        <th>Distance</th>
                    </tr>
                </thead>
                <tbody className='overflow-y-scroll h-40 text-center'>
                    {distanceAndLocation?.map((landfill) => (
                        <tr key={landfill?.landfillId}>
                            <td>{landfill?.landfillId === landfillId ? 'Yes' : 'No'}</td>
                            <td>{landfill?.landfillName}</td>
                            <td>{landfill?.landfillLocation.split(',').slice(0, 2).join(',')}</td>
                            <td>{(landfill?.distance).toFixed(2)} km</td>
                        </tr>
                    ))}
                </tbody>
            </table>


            

            <FormLabel>Number of Trips</FormLabel>
            <FormInput
                id='numberOfTrips'
                type='number'
                placeholder='Enter number of trips'
                value={numberOfTrips}
                min={1}
                max={3}
                onChange={(e) => setNumberOfTrips(parseInt(e.target.value))}
            />

            <h2
                className='w-full border border-gray-300 rounded-md p-2 text-center mt-4 mb-4 text-lg font-bold'
            >
                Total Distance: {distanceInKm} km
            </h2>

            <h2
                className='w-full border border-gray-300 rounded-md p-2 text-center mt-4 mb-4 text-lg font-bold'
            >
                Cost Per Km: {costPerKm}
            </h2>

            <h2
                className='w-full border border-gray-300 rounded-md p-2 text-center mt-4 mb-4 text-lg font-bold'
            >
                Total Cost: {cost}
            </h2>

            
            <div id="map" style={{ height: '80vh', width: '100%' }} />

            <FormLabel>Details</FormLabel>
            <FormInput
                id='details'
                type='text'
                placeholder='Enter details'
                value={details}
                onChange={(e) => setDetails(e.target.value)}
            />

            <Button
                onClick={handleCreateRoute}
                variant='primary'
                className='mt-4'
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Create Route'}
            </Button>

            <Notification getRef={(ref) => notificationRef.current = ref} className='mt-4' type={type}>
                {message}
            </Notification>
            </>
        );
}

export default DhakaMap;
