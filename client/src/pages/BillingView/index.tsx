import React, { useState, useEffect } from 'react';
import { getRoutes } from '../../services/routeService';
import { IRoute } from '../../types';
import { useNavigate } from 'react-router';
import { useRef } from 'react';
import LineChart from "../../components/LineChart";
import Button from '../../base-components/Button';


const Index = () => {
    const [routes, setRoutes] = useState<any[]>([]);
    const [data, setData] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoutes = async () => {
            const { data } = await getRoutes();
            console.log(data.routes);
            setRoutes(data.routes);
        };

        fetchRoutes();
    }, []);

    useEffect(() => {
        let data: any[] = new Array(12).fill(0);
        routes.forEach((route) => {
            const month = new Date(route.createdAt).getMonth();
            console.log(month);
            data[month] += parseInt(route.cost);
        });
        console.log(data);
        setData(data);
        console.log(data);
    }, [routes]);

   

  

  
    return (
        <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Routes</h1>
                <button
                    onClick={() => navigate('/route/optimize')}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    Add Route
                </button>
            </div>
            <div className="mt-4">
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">STS Ward</th>
                            <th className="border px-4 py-2">Landfill</th>
                            <th className="border px-4 py-2">Vehicle</th>
                            <th className='border px-4 py-2'>Vehicle Type</th>
                            <th className="border px-4 py-2">Distance</th>
                            <th className="border px-4 py-2">Waste Volume(tons)</th>
                            <th className="border px-4 py-2">Fuel Cost</th>
                            <th className="border px-4 py-2">Number of Trips</th>
                            <th className="border px-4 py-2">Arrival Time</th>
                            <th className="border px-4 py-2">Departure Time</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {routes.map((route) => (
                            <tr key={route._id} className="text-center">
                                <td className="border px-4 py-2">{route?.stsEntryId?.stsId?.wardNumber}</td>
                                <td className="border px-4 py-2">{route?.landfillId?.name}</td>
                                <td className="border px-4 py-2">{route?.stsEntryId?.vehicleId?.vehicleNumber}</td>
                                <td className="border px-4 py-2">{route?.stsEntryId?.vehicleId?.type}</td>
                                <td className="border px-4 py-2">{(route?.distance).toFixed(2)}</td>
                                <td className="border px-4 py-2">{route?.stsEntryId?.volume}</td>
                                <td className="border px-4 py-2">{(route?.cost).toFixed(2)}</td>
                                <td className="border px-4 py-2">{route?.numberOfTrips}</td>
                                <td className="border px-4 py-2">{route.stsEntryId?.timeOfArrival}</td>
                                <td className="border px-4 py-2">{route.stsEntryId?.timeOfDeparture}</td>
                                <td className="border px-4 py-2">
                                    <Button
                                        onClick={() => navigate(`/billing/${route._id}`)}
                                        variant="success"
                                    >
                                        View
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4">
                <LineChart
                    height={400}
                    showData={data}
                    labelHorizontal='Distance'
                    labelVertical='Cost'
                    />
            </div>
        </div>
    );
}

export default Index;