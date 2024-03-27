import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import { getSTS } from '../../services/vehicleService';
import { getAllLandfills } from '../../services/landfillService';
import axios from 'axios';




const DhakaMap = () => {
    const [map, setMap] = useState(null);
    const [routeControl, setRouteControl] = useState<any>(null);
    const [distanceInKm, setDistanceInKm] = useState(0);
    const [sts, setSts] = useState<any[]>([]);
    const [landfills, setLandfills] = useState<any[]>([]);
    const [stsLocation, setStsLocation] = useState<any[]>([]);
    const [landfillLocation, setLandfillLocation] = useState<any[]>([]);
    const [vehicle, setVehicle] = useState<any[]>([]);
    const [selectedVehicle, setSelectedVehicle] = useState<any | null>(null);
    const [C_unloaded, setC_unloaded] = useState<number>(0);
    const [C_loaded, setC_loaded] = useState<number>(0);
    const [C, setC] = useState<number>(0);
    const [fuelAllocation, setFuelAllocation] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);
    const [volume, setVolume] = useState<number>(0);
    const [timeOfArrival, setTimeOfArrival] = useState<string>('');
    const [timeOfDeparture, setTimeOfDeparture] = useState<string>('');
    const [details, setDetails] = useState<string>('')
    


//     3. Billing View: Landfill Manager can generate a slip at the end of each
// transport from STS to the landfill. The slip will contain the
// timestamps, weight of waste, truck details, and a fuel allocation
// stamp. The program must calculate the fuel allocation based on
// automated handling of weight bill data for accountability. Consider
// the following constraints and formulas:
// ○ A vehicle goes to the landfill from STS at most three times every
// day.
// ○ If the vehicle takes less volume than capacity, he’ll get a lower
// fuel bill.
// ○ We assume the cost scales linearly between the unloaded and
// fully loaded states. This is a broad assumption and might not
// reflect reality perfectly, but it gives a basis for estimation.
// Calculate the cost per kilometer based on load: Interpolate the
// fuel cost per kilometer based on the actual load relative to the
// truck's capacity.
// If C_unloaded is the cost per kilometer unloaded, and C_loaded
// is the cost per kilometer fully loaded (at 5 tons), and the truck is
// loaded with 3 tons, the cost per kilometer for the journey could
    // be approximated as:
// C = C_unloaded + (C_loaded - C_unloaded) * (3 / 5)
// ○ Download Slip: Additional option to export/download the slip in
// a PDF format.
// 4. Route Optimization View: The STS manager can view and select
// optimized routes from his or her STS to the designated Landfill site.
// Following parameters can be taken into consideration:
// ○ Efficient use of resources, such as trucks, based on fuel
// consumption cost.
// ○ Traffic load and congestion during the transfer. The routes and
// times should be selected that leads to a time with less traffic
// congestion to ensure quickest waste delivery to landfill.
// ○ You can use Google Map or any other map API for this section.

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
                    vehicles: sts.vehicleEntries,
                    capacity: sts.capacity,
                }
            });
            setSts(await Promise.all(stsData));
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
        fetchSts();
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

  useEffect(() => {
    if (!map) {
      const dhakaCenter = [23.8103, 90.4125];
      const zoomLevel = 12;

     const mapInstance = L.map('map').setView(dhakaCenter as any, zoomLevel);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapInstance);

      setMap(mapInstance as any);
    }
  }, [map]);

  useEffect(() => {
      if (map && sts.length > 0 && landfills.length > 0) {
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
        if (selectedVehicle) {
            const { capacity } = selectedVehicle;
            const volume = parseFloat(capacity) * 1000; // convert tonnes to kg
            setVolume(volume);
            const { fuelCostLoaded, fuelCostUnloaded } = selectedVehicle;
            const C_unloaded = fuelCostUnloaded || 0; // cost per kilometer unloaded
            const C_loaded = fuelCostLoaded || 0; // cost per kilometer fully loaded
            const C = C_unloaded + (C_loaded - C_unloaded) * (volume / 5000);
            setC(C);
        }
    }, [selectedVehicle]);

    //on time just one vehicle can go to landfill and a vehicle is selected which is assigned in STS this vehicle not use again in route optimization
    //after selecting vehicle we can calculate fuel allocation and weight of waste and time of arrival and time of departure in billing view
    //in billing view we can generate a slip at the end of each transport from STS to the landfill
    //always keep updated the vehicle data in STS
    


   

    return (
        <>
            <h1 className='text-2xl font-bold mb-4'>Optimize Route</h1>
            <h2 className='mb-4'>Select STS and Landfill</h2>
            <select onChange={(e) => {
                const stsLocation = sts.find((sts) => sts._id === e.target.value)?.gpsCoordinates;
                if (stsLocation) {
                    setStsLocation(stsLocation);
                }
                const vehicleData = sts.find((sts) => sts._id === e.target.value)?.vehicles;
                if(vehicleData) {
                    setVehicle(vehicleData);
                }
            }}
                className='mb-4 w-full border border-gray-300 rounded-md p-2'
            >
                <option value="">Select STS</option>
                {sts.map((sts) => (
                    <option key={sts._id} value={sts._id}>Ward {sts.wardNumber} - {sts.location}</option>
                ))}
            </select>
                
            <h2 className='mb-4'>Select Landfill</h2>
            <select onChange={(e) => {
                const landfillLocation = landfills.find((landfill) => landfill._id === e.target.value)?.gpsCoordinates;
                if (landfillLocation) {
                    setLandfillLocation(landfillLocation);
                }
            }}
                className='mb-4 w-full border border-gray-300 rounded-md p-2'
            >
                <option value="">Select Landfill</option>
                {landfills.map((landfill) => (
                    <option key={landfill._id} value={landfill._id}>{landfill.name}</option>
                ))}
            </select>

            <h2
                className='w-full border border-gray-300 rounded-md p-2 text-center mt-4 mb-4 text-lg font-bold'
            >
                Total Distance: {distanceInKm} km
            </h2>

            <h2 className='mb-4'>Choose Vehicle</h2>
            
            <div id="map" style={{ height: '100vh', width: '100%' }} />

        </>
  )
};

export default DhakaMap;
