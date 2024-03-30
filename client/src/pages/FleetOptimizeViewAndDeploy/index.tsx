import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import { getSTS } from '../../services/vehicleService';
import { useNavigate } from 'react-router';
import { getRoutes } from '../../services/routeService';
import axios from 'axios';
import Notification from '../../base-components/Notification';
import { NotificationElement } from '../../base-components/Notification';
import { useRef } from 'react';
import Button from '../../base-components/Button';
import Litepicker from "../../base-components/Litepicker";
import { deployVehicle } from '../../services/vehicleService';

const FleetOptimizeViewAndDeploy = () => {
    const [sts, setSts] = useState<any[]>([]);
    const [selectedStsId, setSelectedStsId] = useState<string>('');
    const [routes, setRoutes] = useState<any[]>([]);
    const [selectedRoutes, setSelectedRoutes] = useState<any[]>([]);
    const [selectedRouteIds, setSelectedRouteIds] = useState<string[]>([]);
    const [allSelectedRoutes, setAllSelectedRoutes] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState<string | null>(null);
    const [notificationType, setNotificationType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
    const notificationRef = useRef<NotificationElement>(null);
    const [map, setMap] = useState<L.Map | null>(null);
    const [routeControl, setRouteControl] = useState<L.Routing.Control | null>(null);
    const [stsLocation, setStsLocation] = useState<any | null>(null);
    const [totalDistance, setTotalDistance] = useState<number>(0);
    const [totalWaste, setTotalWaste] = useState<number>(0);
    const [totalVehicles, setTotalVehicles] = useState<number>(0);
    const [totalTrips, setTotalTrips] = useState<number>(0);
    const [totalFuelCost, setTotalFuelCost] = useState<number>(0);
    const [deployTimeRange, setDeployTimeRange] = useState<string>('');
    const navigate = useNavigate();


    const mapRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        getSTS().then((res) => {
            setSts(res.data.sts);
            console.log(res.data.sts);
        });
        getRoutes().then((res) => {
            setRoutes(res.data.routes);
            console.log(res.data.routes);
        });
    }, []);
    

   

    const handleStsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStsId(e.target.value);
        const selectedSts = sts.find((sts) => sts._id === e.target.value);
        if (selectedSts) {
            setStsLocation({
                lat: selectedSts.gpsCoordinates.coordinates[1],
                lng: selectedSts.gpsCoordinates.coordinates[0],
            });
        }
    };

    useEffect(() => {
        if (selectedStsId) {
            const selectedSts = sts.find((sts) => sts._id === selectedStsId);
            if (selectedSts) {
                let selectedRoutes = routes.filter((route) => route?.stsEntryId?.stsId._id === selectedSts._id);
                selectedRoutes = selectedRoutes.map((route) => {
                    return {
                        ...route,
                        stsEntryId: {
                            ...route.stsEntryId,
                            volume: parseFloat(route.stsEntryId.volume),
                        },
                        selected: false,
                    };
                });

                // 1. Each truck can have at most 3 trips.
                // 2. Trucks should be chosen to first ensure minimum fuel
                // consumption cost, second to ensure minimum number of
                // trucks.
                // 3. The distance from STS to Landfill should be considered
                // constant as the paths are pre-selected.

                // sort by 
                //first priority: minimum distance from STS to Landfill
                //second priority: minimum cost per ton of waste
                selectedRoutes.sort((a, b) => {
                    const costPerTonOfWasteA = parseFloat(a.cost) / parseFloat(a.stsEntryId.volume);
                    const costPerTonOfWasteB = parseFloat(b.cost) / parseFloat(b.stsEntryId.volume);
                    if (costPerTonOfWasteA === costPerTonOfWasteB) {
                        return a.distance - b.distance;
                    }
                    return costPerTonOfWasteA - costPerTonOfWasteB;
                });

                //sts capacity

                // mark selected routes if sum of volume of selected routes is less than sts capacity
                let totalVolume = 0;
                const selectedRoutesIds: string[] = [];
                for (const route of selectedRoutes) {
                    totalVolume += parseFloat(route.stsEntryId.volume);
                    if (totalVolume <= parseFloat(selectedSts.capacity)) {
                        route.selected = true;
                        selectedRoutesIds.push(route._id);
                    } else {
                        break;
                    }
                }
                setAllSelectedRoutes(selectedRoutes);
                setSelectedRouteIds(selectedRoutesIds);
                const selectedRoutesWithTotalWaste = selectedRoutes.filter((route) => selectedRoutesIds.includes(route._id)).map((route) => {
                    const totalWaste = parseFloat(route.stsEntryId.volume) * parseFloat(route.numberOfTrips);
                    return {
                        ...route,
                        totalWaste,
                    };
                });
                setSelectedRoutes(selectedRoutesWithTotalWaste);
            }
        }
    }
        , [selectedStsId, sts, routes]);
    
    const handleDeploy = async () => {
        if (selectedRoutes.length === 0 || !selectedStsId || !deployTimeRange || selectedRouteIds.length === 0) {
            setNotificationMessage('Please select a STS and routes to deploy');
            setNotificationType('error');
            notificationRef.current?.showToast();
            return;
        }
        setLoading(true);
        try {
            const response = await deployVehicle({
                stsId: selectedStsId,
                routeIds: selectedRouteIds,
                deployTimeRange,
                totalDistance,
                totalWaste,
                totalVehicles,
                totalTrips,
                totalFuelCost,
            });
            setNotificationMessage('Vehicle deployed successfully');
            setNotificationType('success');
            notificationRef.current?.showToast();
            setTimeout(() => {
                navigate('/dashboard');
            }, 3000);
            
        } catch (error) {
            setNotificationMessage(error.response.data.message);
            setNotificationType('error');
            notificationRef.current?.hideToast();
            setLoading(false);
        }
    }

 

    useEffect(() => {
        if (mapRef.current) {
            const map = L.map(mapRef.current).setView([23.8103, 90.4125], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
            }).addTo(map);
            setMap(map);
        }
    }, [mapRef]);


    useEffect(() => {
        if (map && stsLocation) {
            const marker = L.marker([stsLocation.lat, stsLocation.lng]).addTo(map);
            //mark it Red color
            marker.setIcon(L.icon({
                iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }));
            marker.bindPopup('STS').openPopup();
        }
    }, [map, stsLocation]);
        

    useEffect(() => {
        if (map && selectedRoutes.length > 0 && stsLocation) {
            if (routeControl) {
                map.removeControl(routeControl);
            }
            //add multiple waypoints
            const waypoints = selectedRoutes.map((route) => {
                return L.latLng(route.landfillId.gpsCoordinates.coordinates[1], route.landfillId.gpsCoordinates.coordinates[0]);
            });
            waypoints.unshift(L.latLng(stsLocation.lat, stsLocation.lng));
            waypoints.push(L.latLng(stsLocation.lat, stsLocation.lng));

            //add new route control
            const routeControlR = L.Routing.control({
                waypoints,
                routeWhileDragging: true,
            }).addTo(map);
            setRouteControl(routeControlR);

        }
    }
        , [map, selectedRoutes, stsLocation]);
    
    useEffect(() => {
        if (selectedRoutes.length > 0) {
            let totalDistance = 0;
            let totalWaste = 0;
            let totalVehicles = 0;
            let totalTrips = 0;
            let totalFuelCost = 0;
            for (const route of selectedRoutes) {
                totalDistance += route.distance;
                totalWaste += route.totalWaste;
                totalVehicles += 1;
                totalTrips += route.numberOfTrips;
                totalFuelCost += route.cost;
            }
            setTotalDistance(totalDistance);
            setTotalWaste(totalWaste);
            setTotalVehicles(totalVehicles);
            setTotalTrips(totalTrips);
            setTotalFuelCost(totalFuelCost);
        }
    }
        , [selectedRoutes]);
    
    const handleRouteSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const routeId = e.target.value;
        if (e.target.checked) {
            setSelectedRouteIds([...selectedRouteIds, routeId]);
            let selectedRoute = allSelectedRoutes.find((route) => route._id === routeId);
            if (selectedRoute) {
                const selectedRoutesWithTotalWaste = selectedRoutes.concat({
                    ...selectedRoute,
                    totalWaste: parseFloat(selectedRoute.stsEntryId.volume) * parseFloat(selectedRoute.numberOfTrips),
                });
                setSelectedRoutes(selectedRoutesWithTotalWaste);
            }

        } else {
            setSelectedRouteIds(selectedRouteIds.filter((id) => id !== routeId));
            setSelectedRoutes(selectedRoutes.filter((route) => route._id !== routeId));

        }
    }





    

  


    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold text-center">Fleet Optimization View and Deploy</h1>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <label htmlFor="sts" className="block font-semibold">Select STS</label>
                        <select
                            name="sts"
                            id="sts"
                            className="w-full p-2 border border-gray-300 rounded"
                            onChange={handleStsChange}
                        >
                            <option value="">Select STS</option>
                            {sts.map((sts) => (
                                <option key={sts._id} value={sts._id}>
                                   Ward No {sts.wardNumber + ' - ' + sts.capacity + ' ton'}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="routes" className="block font-semibold">Select Routes</label>
                        <div className="grid grid-cols-2 gap-2">
                            {allSelectedRoutes.map((route) => (
                                <div key={route._id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="routes"
                                        id={route._id}
                                        value={route._id}
                                        onChange={handleRouteSelect}
                                        checked={selectedRouteIds.includes(route._id)}
                                    />
                                    <label htmlFor={route._id} className="ml-2">{route.landfillId.name + ' - ' + route?.stsEntryId?.vehicleId?.vehicleNumber + ' - ' + route?.stsEntryId?.volume + ' ton'}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <table className="w-full">
                        <thead className="bg-gray-200 border-b">
                            <tr>
                                <th>Landfill</th>
                                <th>Distance</th>
                                <th>Cost</th>
                                <th>Number of Trips</th>
                                <th>Total Waste</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {selectedRoutes.map((route) => (
                                <tr key={route._id}>
                                    <td className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="routes"
                                            id={route._id}
                                            value={route._id}
                                            onChange={handleRouteSelect}
                                            checked={selectedRouteIds.includes(route._id)}
                                        />
                                        <label htmlFor={route._id} className="ml-2">{route.landfillId.name + ' - ' + route?.stsEntryId?.vehicleId?.vehicleNumber + ' - ' + route?.stsEntryId?.volume + ' ton'}</label>
                                    </td>
                                    <td className="text-center">{route.distance} km</td>
                                    <td className="text-center">{route.cost} BDT</td>
                                    <td className="text-center">{route.numberOfTrips}</td>
                                    <td className="text-center">{route.totalWaste} ton</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4">
                    <label htmlFor="statistics" className="block font-semibold">Dashboard Statistics View</label>
                </div>
                <div className="mt-4">
                    Your selected STS is {selectedStsId ? sts.find((sts) => sts._id === selectedStsId)?.wardNumber : ''} and selected routes are {selectedRouteIds.map((id) => routes.find((route) => route._id === id)?.landfillId.name).join(', ')}
                </div>
                <div className="mt-4">
                    Capacity of STS: {selectedStsId ? sts.find((sts) => sts._id === selectedStsId)?.capacity : ''} ton
                </div>

                <div className="mt-4">
                    <table className="w-full">
                        <thead className="bg-gray-200 border-b">
                            <tr>
                                <th>Total Distance</th>
                                <th>Total Waste</th>
                                <th>Total Vehicles</th>
                                <th>Total Trips</th>
                                <th>Total Fuel Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{totalDistance} km</td>
                                <td>{totalWaste} ton</td>
                                <td>{totalVehicles}</td>
                                <td>{totalTrips}</td>
                                <td>{totalFuelCost} BDT</td>
                            </tr>
                        </tbody>
                    </table>
                </div>


                <div className="mt-4">
                    <label htmlFor="deployTimeRange" className="block font-semibold">Deploy Time Range</label>
                    <Litepicker
                      value={deployTimeRange}
                      onChange={(value) => setDeployTimeRange(value)}
                      options={{
                        autoApply: false,
                        singleMode: false,
                        numberOfColumns: 2,
                        numberOfMonths: 2,
                        showWeekNumbers: true,
                        dropdowns: {
                          minYear: 1990,
                          maxYear: null,
                          months: true,
                          years: true,
                        },
                      }}
                      className="w-full p-2 border border-gray-300 rounded mt-2"
                    />
                    
                </div>





                <div className="mt-4">
                    <label htmlFor="map" className="block font-semibold">Map</label>
                </div>



                <div className="mt-4">
                    <div ref={mapRef} style={{ height: '400px' }}></div>
                </div>
                <div className="mt-4">
                    <Button
                        onClick={handleDeploy}
                        value={loading ? 'Deploying...' : 'Deploy'}
                        variant="primary"
                        disabled={loading}
                    >
                        Deploy
                    </Button>
                </div>
            </div>
            <Notification getRef={(ref) => notificationRef.current = ref} className='mb-4 p-2' options={{ duration: 3000 }} type={notificationType}>
                {notificationMessage}
            </Notification>
        </>
    );
}

export default FleetOptimizeViewAndDeploy;