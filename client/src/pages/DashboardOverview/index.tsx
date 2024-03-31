import _ from "lodash";
import clsx from "clsx";
import { useRef, useState } from "react";
import fakerData from "../../utils/faker";
import Button from "../../base-components/Button";
import Pagination from "../../base-components/Pagination";
import { FormInput, FormSelect } from "../../base-components/Form";
import TinySlider, {
  TinySliderElement,
} from "../../base-components/TinySlider";
import Lucide from "../../base-components/Lucide";
import Tippy from "../../base-components/Tippy";
import Litepicker from "../../base-components/Litepicker";
import ReportDonutChart from "../../components/ReportDonutChart";
import ReportLineChart from "../../components/ReportLineChart";
import ReportPieChart from "../../components/ReportPieChart";
import ReportDonutChart1 from "../../components/ReportDonutChart1";
import SimpleLineChart1 from "../../components/SimpleLineChart1";
import LeafletMap from "../../components/LeafletMap";
import { Menu } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import Alert from "../../base-components/Alert";
import { Tab } from "../../base-components/Headless";
import ReportBarChart1 from "../../components/ReportBarChart1";
import ReportDonutChart2 from "../../components/ReportDonutChart2";
import SimpleLineChart3 from "../../components/SimpleLineChart3";
import SimpleLineChart2 from "../../components/SimpleLineChart2";
import SimpleLineChart4 from "../../components/SimpleLineChart4";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardData } from "../../services/dashboardService";
import { useSelector } from "react-redux";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";


// {
//   "dashboard": [
//       {
//           "_id": "6605a7ee4305c7c8d54d5989",
//           "numOfUsers": 10,
//           "numOfVehicles": 10,
//           "numOfSTS": 3,
//           "numOfLandfills": 3,
//           "numOfRoutes": 11,
//           "allLandfillsLocations": [
//               {
//                   "gpsCoordinates": {
//                       "type": "Point",
//                       "coordinates": [
//                           90.3912198117311,
//                           23.810475327766568
//                       ]
//                   },
//                   "_id": "66044145b9e7825b7ab1e746"
//               },
//               {
//                   "gpsCoordinates": {
//                       "type": "Point",
//                       "coordinates": [
//                           90.36323356431927,
//                           23.763351613249508
//                       ]
//                   },
//                   "_id": "66065c9519ff5c78cb35edc6"
//               },
//               {
//                   "gpsCoordinates": {
//                       "type": "Point",
//                       "coordinates": [
//                           90.33166320246272,
//                           23.78471648062244
//                       ]
//                   },
//                   "_id": "66065cd919ff5c78cb35edc9"
//               }
//           ],
//           "allStsLocations": [
//               {
//                   "gpsCoordinates": {
//                       "type": "Point",
//                       "coordinates": [
//                           90.40700912475587,
//                           23.815814937298633
//                       ]
//                   },
//                   "_id": "660534e426a268366b461ee8"
//               },
//               {
//                   "gpsCoordinates": {
//                       "type": "Point",
//                       "coordinates": [
//                           90.36357879638672,
//                           23.814401532618618
//                       ]
//                   },
//                   "_id": "660538a3f15343059b53767a"
//               },
//               {
//                   "gpsCoordinates": {
//                       "type": "Point",
//                       "coordinates": [
//                           90.36101242489761,
//                           23.78094646493779
//                       ]
//                   },
//                   "_id": "660650d25355f4d2ae018a8b"
//               }
//           ],
//           "allVehicleMovements": [
//               {
//                   "_id": "660652493ddbea0eedeef3f6",
//                   "timeOfArrival": "00:00",
//                   "timeOfDeparture": "16:30"
//               },
//               {
//                   "_id": "660658c239435484ac64a0f4",
//                   "timeOfArrival": "00:59",
//                   "timeOfDeparture": "04:59"
//               },
//               {
//                   "_id": "6606590d39435484ac64a11c",
//                   "timeOfArrival": "12:00",
//                   "timeOfDeparture": "15:00"
//               },
//               {
//                   "_id": "6606592639435484ac64a126",
//                   "timeOfArrival": "12:01",
//                   "timeOfDeparture": "12:06"
//               },
//               {
//                   "_id": "6606594339435484ac64a130",
//                   "timeOfArrival": "12:04",
//                   "timeOfDeparture": "12:07"
//               },
//               {
//                   "_id": "6606596939435484ac64a13a",
//                   "timeOfArrival": "12:03",
//                   "timeOfDeparture": "12:07"
//               },
//               {
//                   "_id": "6606598139435484ac64a144",
//                   "timeOfArrival": "16:02",
//                   "timeOfDeparture": "12:07"
//               },
//               {
//                   "_id": "6606599539435484ac64a14e",
//                   "timeOfArrival": "12:06",
//                   "timeOfDeparture": "16:02"
//               },
//               {
//                   "_id": "660659ac39435484ac64a158",
//                   "timeOfArrival": "12:07",
//                   "timeOfDeparture": "12:09"
//               },
//               {
//                   "_id": "660659cb39435484ac64a162",
//                   "timeOfArrival": "12:07",
//                   "timeOfDeparture": "12:08"
//               },
//               {
//                   "_id": "660659e439435484ac64a16c",
//                   "timeOfArrival": "12:08",
//                   "timeOfDeparture": "17:04"
//               }
//           ],
//           "allCostData": [
//               {
//                   "_id": "6606793862d1a1a52c888b2c",
//                   "cost": 480.48
//               },
//               {
//                   "_id": "660679a762d1a1a52c888b4b",
//                   "cost": 388.66857142857145
//               },
//               {
//                   "_id": "660679c662d1a1a52c888b6f",
//                   "cost": 1893.5172000000002
//               },
//               {
//                   "_id": "660679e462d1a1a52c888b8e",
//                   "cost": 672.672
//               },
//               {
//                   "_id": "66067a0262d1a1a52c888ba3",
//                   "cost": 203.604
//               },
//               {
//                   "_id": "66067a1762d1a1a52c888bb8",
//                   "cost": 320.32
//               },
//               {
//                   "_id": "66067a3362d1a1a52c888bcd",
//                   "cost": 277.78371428571427
//               },
//               {
//                   "_id": "66067a6f62d1a1a52c888bec",
//                   "cost": 794.0556
//               },
//               {
//                   "_id": "66067a8f62d1a1a52c888c0b",
//                   "cost": 691.8911999999999
//               },
//               {
//                   "_id": "66067aa362d1a1a52c888c20",
//                   "cost": 1032.258
//               },
//               {
//                   "_id": "66067ab562d1a1a52c888c35",
//                   "cost": 768.7679999999999
//               }
//           ],
//           "allDistanceData": [
//               {
//                   "_id": "6606793862d1a1a52c888b2c",
//                   "distance": 3.2032
//               },
//               {
//                   "_id": "660679a762d1a1a52c888b4b",
//                   "distance": 4.001
//               },
//               {
//                   "_id": "660679c662d1a1a52c888b6f",
//                   "distance": 10.180200000000001
//               },
//               {
//                   "_id": "660679e462d1a1a52c888b8e",
//                   "distance": 3.2032
//               },
//               {
//                   "_id": "66067a0262d1a1a52c888ba3",
//                   "distance": 10.180200000000001
//               },
//               {
//                   "_id": "66067a1762d1a1a52c888bb8",
//                   "distance": 3.2032
//               },
//               {
//                   "_id": "66067a3362d1a1a52c888bcd",
//                   "distance": 4.001
//               },
//               {
//                   "_id": "66067a6f62d1a1a52c888bec",
//                   "distance": 10.180200000000001
//               },
//               {
//                   "_id": "66067a8f62d1a1a52c888c0b",
//                   "distance": 3.2032
//               },
//               {
//                   "_id": "66067aa362d1a1a52c888c20",
//                   "distance": 4.001
//               },
//               {
//                   "_id": "66067ab562d1a1a52c888c35",
//                   "distance": 3.2032
//               }
//           ],
//           "allVolumeData": [
//               {
//                   "_id": "660652493ddbea0eedeef3f6",
//                   "volume": 5
//               },
//               {
//                   "_id": "660658c239435484ac64a0f4",
//                   "volume": 5
//               },
//               {
//                   "_id": "6606590d39435484ac64a11c",
//                   "volume": 4
//               },
//               {
//                   "_id": "6606592639435484ac64a126",
//                   "volume": 7
//               },
//               {
//                   "_id": "6606594339435484ac64a130",
//                   "volume": 7
//               },
//               {
//                   "_id": "6606596939435484ac64a13a",
//                   "volume": 7
//               },
//               {
//                   "_id": "6606598139435484ac64a144",
//                   "volume": 15
//               },
//               {
//                   "_id": "6606599539435484ac64a14e",
//                   "volume": 2
//               },
//               {
//                   "_id": "660659ac39435484ac64a158",
//                   "volume": 13
//               },
//               {
//                   "_id": "660659cb39435484ac64a162",
//                   "volume": 6
//               },
//               {
//                   "_id": "660659e439435484ac64a16c",
//                   "volume": 4
//               }
//           ],
//           "allTimeData": [
//               {
//                   "_id": "660652493ddbea0eedeef3f6",
//                   "timeOfArrival": "00:00",
//                   "timeOfDeparture": "16:30"
//               },
//               {
//                   "_id": "660658c239435484ac64a0f4",
//                   "timeOfArrival": "00:59",
//                   "timeOfDeparture": "04:59"
//               },
//               {
//                   "_id": "6606590d39435484ac64a11c",
//                   "timeOfArrival": "12:00",
//                   "timeOfDeparture": "15:00"
//               },
//               {
//                   "_id": "6606592639435484ac64a126",
//                   "timeOfArrival": "12:01",
//                   "timeOfDeparture": "12:06"
//               },
//               {
//                   "_id": "6606594339435484ac64a130",
//                   "timeOfArrival": "12:04",
//                   "timeOfDeparture": "12:07"
//               },
//               {
//                   "_id": "6606596939435484ac64a13a",
//                   "timeOfArrival": "12:03",
//                   "timeOfDeparture": "12:07"
//               },
//               {
//                   "_id": "6606598139435484ac64a144",
//                   "timeOfArrival": "16:02",
//                   "timeOfDeparture": "12:07"
//               },
//               {
//                   "_id": "6606599539435484ac64a14e",
//                   "timeOfArrival": "12:06",
//                   "timeOfDeparture": "16:02"
//               },
//               {
//                   "_id": "660659ac39435484ac64a158",
//                   "timeOfArrival": "12:07",
//                   "timeOfDeparture": "12:09"
//               },
//               {
//                   "_id": "660659cb39435484ac64a162",
//                   "timeOfArrival": "12:07",
//                   "timeOfDeparture": "12:08"
//               },
//               {
//                   "_id": "660659e439435484ac64a16c",
//                   "timeOfArrival": "12:08",
//                   "timeOfDeparture": "17:04"
//               }
//           ],
//           "createdAt": "2024-03-28T17:25:02.062Z",
//           "updatedAt": "2024-03-29T08:25:02.396Z",
//           "__v": 7
//       }
//   ],
//   "stsEntryCount": 11,
//   "stsTotalVolume": 75,
//   "landfillEntryCount": 2,
//   "landfillTotalVolume": 190,
//   "dailyFuelCost": 852,
//   "fleetAndVehicleDeployment": [
//       {
//           "_id": "6606a8db943300a4aae9742a",
//           "routeIds": [
//               "66067a0262d1a1a52c888ba3",
//               "66067a1762d1a1a52c888bb8"
//           ],
//           "stsId": "660650d25355f4d2ae018a8b",
//           "deployTimeRange": "29 Mar, 2024 - 29 Apr, 2024",
//           "totalDistance": 13.383400000000002,
//           "totalWaste": 29,
//           "totalVehicles": 2,
//           "totalTrips": 3,
//           "totalFuelCost": 523.924,
//           "createdAt": "2024-03-29T11:41:15.138Z",
//           "updatedAt": "2024-03-29T11:41:15.138Z",
//           "__v": 0
//       }
//   ]
// }

function Main() {
  const [salesReportFilter, setSalesReportFilter] = useState<string>();
  const importantNotesRef = useRef<TinySliderElement>();
  const { user } = useSelector((state: any) => state.auth);
  const prevImportantNotes = () => {
    importantNotesRef.current?.tns.goTo("prev");
  };
  const nextImportantNotes = () => {
    importantNotesRef.current?.tns.goTo("next");
  };


  const [dashboardData, setDashboardData] = useState<any>({});
  const [showTime, setShowTime] = useState<Date>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const { data } = await getDashboardData();
      setDashboardData(data);
      console.log(data);
    };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 2xl:col-span-12">
        <div className="grid grid-cols-12 gap-6">

            {/* start from here */}
         <div className="relative col-span-12 mt-6">
          <div className="grid grid-cols-12 gap-6">
          <div className="z-20 col-span-12 xl:col-span-9 2xl:col-span-12">
            <div className="mt-6 -mb-6 intro-y">
              <Alert
                variant="primary"
                dismissible
                className="flex items-center mb-6 box dark:border-darkmode-600"
              >
                {({ dismiss }) => (
                      <>
                    <marquee>
                        Cleanliness starts with you, be the solution, not the pollution.  Report any illegal dumping activities to the authorities.  Let's keep our environment clean and safe.
                    </marquee>
                    <Alert.DismissButton
                      className="text-white"
                      onClick={dismiss}
                    >
                      <Lucide icon="X" className="w-4 h-4" />
                    </Alert.DismissButton>
                  </>
                )}
              </Alert>
            </div>
            <div className="grid grid-cols-12 mb-3 mt-14 sm:gap-10 intro-y">
              <div className="relative col-span-12 py-6 text-center sm:col-span-6 md:col-span-4 sm:pl-5 md:pl-0 lg:pl-5 sm:text-left">
                <Menu className="absolute pt-0.5 2xl:pt-0 mt-5 2xl:mt-6 top-0 right-0">
                  <Menu.Button as="a" className="block" href="#">
                    <Lucide
                      icon="MoreVertical"
                      className="w-5 h-5 text-slate-500"
                    />
                  </Menu.Button>
                  <Menu.Items className="w-40">
                    <Menu.Item>
                      <Lucide icon="FileText" className="w-4 h-4 mr-2" />
                      Monthly Report
                    </Menu.Item>
                    <Menu.Item>
                      <Lucide icon="FileText" className="w-4 h-4 mr-2" />
                      Annual Report
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
                <div className="-mb-1 text-sm font-medium 2xl:text-base h-6 2xl:h-7">
                      Hi {user?.username},
                      
                </div>
                <div className="flex items-center justify-center text-base leading-3 2xl:text-lg sm:justify-start text-slate-600 dark:text-slate-300 mt-14 2xl:mt-24">
                      <span className="font-medium">Good {new Date().getHours() < 12 ? "Morning" : new Date().getHours() < 18 ? "Afternoon" : "Evening"},</span> it's a
                      brand new day!
                  <Tippy
                    as="div"
                    content={`This is a dashboard overview page. You can view the summary of your business here.`}
                  >
                    <Lucide
                      icon="AlertCircle"
                      className="w-5 h-5 ml-1.5 mt-0.5"
                    />
                  </Tippy>
                </div>
                <div className="mt-5 mb-3 2xl:flex">
                      <div className="flex items-center justify-center sm:justify-start">
                        <Lucide
                          icon="MapPin"
                          className="w-4 h-4 text-primary mr-1.5"
                        />
                        <span className="text-sm text-slate-500 dark:text-slate-300">
                          Dhaka, Bangladesh
                        </span>
                      </div>
                      <div className="flex items-center justify-center mt-2 sm:mt-0 sm:ml-auto">
                        <Lucide
                          icon="Clock"
                          className="w-4 h-4 text-primary mr-1.5"
                        />
                        <span className="text-sm text-slate-500 dark:text-slate-300">
                          {showTime?.toLocaleTimeString()}
                        </span>
                      </div>
                </div>
                <div className="mt-6 -mb-1 2xl:text-base text-slate-600 dark:text-slate-300">
                  Today total fuel cost is{" "}
                  <a
                    href=""
                    className="underline decoration-dotted underline-offset-4 text-primary dark:text-slate-400"
                  >
                    {dashboardData?.dailyFuelCost} BDT
                  </a>
                </div>
                <Menu className="mt-14 2xl:mt-24 w-44 2xl:w-52">
                  <Menu.Button
                    as={Button}
                    variant="primary"
                    rounded
                    className="relative justify-start w-full px-4"
                  >
                    Download Reports
                    <span className="absolute top-0 bottom-0 right-0 flex items-center justify-center w-8 h-8 my-auto ml-auto mr-1">
                      <Lucide icon="ChevronDown" className="w-4 h-4" />
                    </span>
                  </Menu.Button>
                  <Menu.Items
                    placement="bottom-start"
                    className="w-44 2xl:w-52"
                  >
                    <Menu.Item>
                      <Lucide icon="FileText" className="w-4 h-4 mr-2" />
                      Monthly Report
                    </Menu.Item>
                    <Menu.Item>
                      <Lucide icon="FileText" className="w-4 h-4 mr-2" />
                      Annual Report
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>
              <div className="col-span-12 row-start-2 px-10 py-6 -mx-5 border-t border-black border-dashed md:row-start-auto md:col-span-4 border-opacity-10 md:border-t-0 md:border-l md:border-r sm:px-28 md:px-5">
                <div className="mt-6">
                  <ReportBarChart1 height={500} data={dashboardData?.dashboard?.length && dashboardData?.dashboard[0]?.allCostData} dataKey="cost" data1={dashboardData?.dashboard?.length && dashboardData?.dashboard[0]?.allDistanceData} dataKey1="distance" />
                </div>
              </div>
              <Tab.Group className="col-span-12 py-6 pl-4 -ml-4 border-t border-l border-black border-dashed sm:col-span-6 md:col-span-4 border-opacity-10 sm:border-t-0 md:border-l-0 md:ml-0 md:pl-0 h-56">
                
                <Tab.Panels className="mt-6">
                  <Tab.Panel>
                    <div className="relative mt-8">
                      <ReportDonutChart2 height={215} />
                      <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full">
                        <div className="text-xl font-medium 2xl:text-2xl">
                          {dashboardData?.dashboard?.length && dashboardData?.dashboard[0]?.numOfUsers}
                        </div>
                        <div className="text-slate-500 mt-0.5">
                          Total Users
                        </div>
                      </div>
                    </div>
                    <div className="w-10/12 mx-auto mt-8 2xl:w-2/3">
                          <div className="flex items-center">
                            <Lucide icon="User" className="w-6 h-6 text-primary" />
                            <div className="ml-2">
                              <div className="text-lg font-medium">
                                {dashboardData?.dashboard?.length && dashboardData?.dashboard[0]?.numOfUsers}
                              </div>
                              <div className="text-slate-500">Total Users</div>
                            </div>
                          </div>
                          <div className="flex items-center mt-6">
                            <Lucide icon="Truck" className="w-6 h-6 text-primary" />
                            <div className="ml-2">
                              <div className="text-lg font-medium">
                                {dashboardData?.dashboard?.length && dashboardData?.dashboard[0]?.numOfVehicles}
                              </div>
                              <div className="text-slate-500">Total Vehicles</div>
                            </div>
                          </div>
                          <div className="flex items-center mt-6">
                            <Lucide icon="MapPin" className="w-6 h-6 text-primary" />
                            <div className="ml-2">
                              <div className="text-lg font-medium">
                                {dashboardData?.dashboard?.length && dashboardData?.dashboard[0]?.numOfSTS}
                              </div>
                              <div className="text-slate-500">Total STS</div>
                            </div>
                          </div>
                          <div className="flex items-center mt-6">
                            <Lucide icon="MapPin" className="w-6 h-6 text-primary" />
                            <div className="ml-2">
                              <div className="text-lg font-medium">
                                {dashboardData?.dashboard?.length && dashboardData?.dashboard[0]?.numOfLandfills}
                              </div>
                              <div className="text-slate-500">Total Landfills</div>
                            </div>
                          </div>
                          <div className="flex items-center mt-6">
                            <Lucide icon="MapPin" className="w-6 h-6 text-primary" />
                            <div className="ml-2">
                              <div className="text-lg font-medium">
                                {dashboardData?.dashboard?.length && dashboardData?.dashboard[0]?.numOfRoutes}
                              </div>
                              <div className="text-slate-500">Total Routes</div>
                            </div>  
                          </div>
                        </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
           </div>
          </div>

         
          


          {/* BEGIN: General Report */}
          <div className="col-span-12 mt-8">
            <div className="flex items-center h-10 intro-y">
              <a href="" className="flex items-center ml-auto text-primary">
                <Lucide icon="RefreshCcw" className="w-4 h-4 mr-3" /> Reload
                Data
              </a>
            </div>
            <div className="grid grid-cols-12 gap-6 mt-5">
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div
                  className={clsx([
                    "relative zoom-in",
                    "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
                  ])}
                >
                  <div className="p-5 box">
                    <div className="flex">
                      <Lucide
                        icon="Users"
                        className="w-[28px] h-[28px] text-primary"
                      />
                      <div className="ml-auto">
                        <Tippy
                          as="div"
                          className="cursor-pointer bg-success py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                          content="33% Higher than last month"
                        >
                          33%
                          <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                        </Tippy>
                      </div>
                    </div>
                    <div className="mt-6 text-3xl font-medium leading-8">
                      {dashboardData?.dashboard?.length && dashboardData?.dashboard[0]?.numOfUsers}
                    </div>
                    <div className="mt-1 text-base text-slate-500">
                      Total Users
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div
                  className={clsx([
                    "relative zoom-in",
                    "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
                  ])}
                >
                  <div className="p-5 box">
                    <div className="flex">
                      <Lucide
                        icon="Truck"
                        className="w-[28px] h-[28px] text-pending"
                      />
                      <div className="ml-auto">
                        <Tippy
                          as="div"
                          className="cursor-pointer bg-danger py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                          content="2% Lower than last month"
                        >
                          2%
                          <Lucide
                            icon="ChevronDown"
                            className="w-4 h-4 ml-0.5"
                          />
                        </Tippy>
                      </div>
                    </div>
                    <div className="mt-6 text-3xl font-medium leading-8">
                      {dashboardData?.dashboard?.length && dashboardData?.dashboard[0]?.numOfVehicles}
                    </div>
                    <div className="mt-1 text-base text-slate-500">
                      Total Vehicles
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div
                  className={clsx([
                    "relative zoom-in",
                    "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
                  ])}
                >
                  <div className="p-5 box">
                    <div className="flex">
                      <Lucide
                        icon="MapPin"
                        className="w-[28px] h-[28px] text-warning"
                      />
                      <div className="ml-auto">
                        <Tippy
                          as="div"
                          className="cursor-pointer bg-success py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                          content="12% Higher than last month"
                        >
                          12%{" "}
                          <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                        </Tippy>
                      </div>
                    </div>
                    <div className="mt-6 text-3xl font-medium leading-8">
                      {dashboardData?.dashboard?.length && dashboardData?.dashboard[0]?.numOfSTS}
                    </div>
                    <div className="mt-1 text-base text-slate-500">
                      Total STS
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div
                  className={clsx([
                    "relative zoom-in",
                    "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
                  ])}
                >
                  <div className="p-5 box">
                    <div className="flex">
                      <Lucide
                        icon="MapPin"
                        className="w-[28px] h-[28px] text-success"
                      />
                      <div className="ml-auto">
                        <Tippy
                          as="div"
                          className="cursor-pointer bg-success py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                          content="22% Higher than last month"
                        >
                          22%{" "}
                          <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                        </Tippy>
                      </div>
                    </div>
                    <div className="mt-6 text-3xl font-medium leading-8">
                      {dashboardData?.dashboard?.length && dashboardData?.dashboard[0]?.numOfLandfills}
                    </div>
                    <div className="mt-1 text-base text-slate-500">
                      Total Landfills
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* BEGIN: Official Store */}
          <div className="col-span-12 mt-6 xl:col-span-12">
            <div className="items-center block h-10 intro-y sm:flex">
              <h2 className="mr-5 text-lg font-medium truncate">
                STS STATIONS
              </h2>
              <div className="relative mt-3 sm:ml-auto sm:mt-0 text-slate-500">
                <Lucide
                  icon="MapPin"
                  className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3"
                />
                <FormInput
                  type="text"
                  className="pl-10 sm:w-56 !box"
                  placeholder="Filter by city"
                />
              </div>
            </div>
            <div className="p-5 mt-12 intro-y box sm:mt-5">
              <MapContainer center={[23.8103, 90.4125]} zoom={11} style={{ height: "310px" }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {dashboardData?.dashboard?.length &&
                  dashboardData?.dashboard[0]?.allStsLocations?.map(
                    (sts: any) => (
                      <Marker
                        position={[
                          sts.gpsCoordinates.coordinates[1],
                          sts.gpsCoordinates.coordinates[0],
                        ]}
                        key={sts._id}
                      >
                        <Popup>
                          <div className="text-base font-medium">
                            STS Station
                          </div>
                          <div className="text-sm text-slate-500">
                            {sts._id}
                          </div>
                        </Popup>
                      </Marker>
                    )
                  )}
              </MapContainer>

            </div>
          </div>
          


          {/* BEGIN: Sales Report */}
          <div className="col-span-12 mt-8 lg:col-span-6">              
            <div className="p-5 mt-12 intro-y box sm:mt-5">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="flex">
                  <div>
                    <div className="text-lg font-medium text-primary dark:text-slate-300 xl:text-xl">
                      {dashboardData?.dashboard?.length && dashboardData?.dashboard[0]?.allCostData.reduce((a: any, b: any) => a + b.cost, 0)}
                    </div>
                    <div className="mt-0.5 text-slate-500">This Month</div>
                  </div>
                  <div className="w-px h-12 mx-4 border border-r border-dashed border-slate-200 dark:border-darkmode-300 xl:mx-5"></div>
                </div>
              </div>
              <div
                className={clsx([
                  "relative",
                  "before:content-[''] before:block before:absolute before:w-16 before:left-0 before:top-0 before:bottom-0 before:ml-10 before:mb-7 before:bg-gradient-to-r before:from-white before:via-white/80 before:to-transparent before:dark:from-darkmode-600",
                  "after:content-[''] after:block after:absolute after:w-16 after:right-0 after:top-0 after:bottom-0 after:mb-7 after:bg-gradient-to-l after:from-white after:via-white/80 after:to-transparent after:dark:from-darkmode-600",
                ])}
              >
                <ReportLineChart height={275} className="mt-6 -mb-6" data={dashboardData?.dashboard?.length && dashboardData?.dashboard[0]?.allCostData?.map((item: any) => item.cost)} dataKey="cost" />
              </div>
            </div>
          </div>

        
          
      
          {/* BEGIN: Official Store */}
          <div className="col-span-12 mt-6 xl:col-span-6">
            <div className="p-5 mt-12 intro-y box sm:mt-5">
              <MapContainer center={[23.8103, 90.4125]} zoom={12} style={{ height: "360px" }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {dashboardData?.dashboard?.length &&
                  dashboardData?.dashboard[0]?.allLandfillsLocations?.map(
                    (landfill: any) => (
                      <Marker
                        position={[
                          landfill.gpsCoordinates.coordinates[1],
                          landfill.gpsCoordinates.coordinates[0],
                        ]}
                        key={landfill._id}
                        
                      >
                        <Popup>
                          <div className="text-base font-medium">
                            Landfill
                          </div>
                          <div className="text-sm text-slate-500">
                            {landfill._id}
                          </div>
                        </Popup>
                      </Marker>
                    )
                  )}
              </MapContainer>
              
            </div>
          </div>
          
          <div className="col-span-12 mt-8 lg:col-span-12">
            <div className="p-5 mt-12 intro-y box sm:mt-5">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="flex">
                  <div>
                    <div className="text-lg font-medium text-primary dark:text-slate-300 xl:text-xl">
                      {dashboardData?.dashboard?.length && dashboardData?.dashboard[0]?.allVolumeData.reduce((a: any, b: any) => a + b.volume, 0)}
                    </div>
                    <div className="mt-0.5 text-slate-500">This Month</div>
                  </div>
                  <div className="w-px h-12 mx-4 border border-r border-dashed border-slate-200 dark:border-darkmode-300 xl:mx-5"></div>
                 
                </div>
               
              </div>
              <div
                className={clsx([
                  "relative",
                  "before:content-[''] before:block before:absolute before:w-16 before:left-0 before:top-0 before:bottom-0 before:ml-10 before:mb-7 before:bg-gradient-to-r before:from-white before:via-white/80 before:to-transparent before:dark:from-darkmode-600",
                  "after:content-[''] after:block after:absolute after:w-16 after:right-0 after:top-0 after:bottom-0 after:mb-7 after:bg-gradient-to-l after:from-white after:via-white/80 after:to-transparent after:dark:from-darkmode-600",
                ])}
              >
                <ReportLineChart
                  height={275}
                  data={dashboardData?.dashboard?.length && dashboardData?.dashboard[0]?.allVolumeData?.map((item: any) => item.volume)} dataKey="volume"
                />
              </div>
            </div>
          </div>


          <div
            className={clsx([
              "z-10 col-span-12 px-5 pt-8 -mx-[16px] md:-mx-[22px] relative pb-14",
              "before:content-[''] before:rounded-[30px_30px_0px_0px] before:w-full before:h-full before:bg-slate-200/70 before:dark:bg-opacity-50 before:absolute before:top-0 before:left-0 before:right-0 before:dark:bg-darkmode-500",
            ])}
          >
            <div className="relative grid grid-cols-12 gap-6 intro-y">
              <div className="col-span-12 xl:col-span-6 2xl:col-span-4">
                <div className="p-5 box">
                  <div className="flex items-center">
                    <Lucide
                      icon="MapPin"
                      className="w-8 h-8 text-primary dark:text-primary"
                    />
                    <div className="ml-4">
                      <div className="text-lg font-medium text-primary dark:text-primary">
                        {dashboardData?.stsEntryCount}
                      </div>
                      <div className="text-slate-500 dark:text-slate-500">
                        STS Entry Count
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center mt-5">
                    <Lucide
                      icon="MapPin"
                      className="w-8 h-8 text-warning dark:text-warning"
                    />
                    <div className="ml-4">
                      <div className="text-lg font-medium text-warning dark:text-warning">
                        {dashboardData?.stsTotalVolume}
                      </div>
                      <div className="text-slate-500 dark:text-slate-500">
                        STS Total Volume
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 xl:col-span-6 2xl:col-span-4">
                <div className="p-5 box">
                  <div className="flex items-center">
                    <Lucide
                      icon="MapPin"
                      className="w-8 h-8 text-danger dark:text-danger"
                    />
                    <div className="ml-4">
                      <div className="text-lg font-medium text-danger dark:text-danger">
                        {dashboardData?.landfillEntryCount}
                      </div>
                      <div className="text-slate-500 dark:text-slate-500">
                        Landfill Entry Count
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center mt-5">
                    <Lucide
                      icon="MapPin"
                      className="w-8 h-8 text-success dark:text-success"
                    />
                    <div className="ml-4">
                      <div className="text-lg font-medium text-success dark:text-success">
                        {dashboardData?.landfillTotalVolume}
                      </div>
                      <div className="text-slate-500 dark:text-slate-500">
                        Landfill Total Volume
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 xl:col-span-12 2xl:col-span-4">
                <div className="p-5 box">
                  <div className="flex items-center">
                    <Lucide
                      icon="MapPin"
                      className="w-8 h-8 text-info dark:text-info"
                    />
                    <div className="ml-4">
                      <div className="text-lg font-medium text-info dark:text-info">
                        {dashboardData?.fleetAndVehicleDeployment?.length}
                      </div>
                      <div className="text-slate-500 dark:text-slate-500">
                        Fleet & Vehicle Deployment
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center mt-5">
                    <Lucide
                      icon="MapPin"
                      className="w-8 h-8 text-primary dark:text-primary"
                    />
                    <div className="ml-4">
                      <div className="text-lg font-medium text-primary dark:text-primary">
                        {dashboardData?.fleetAndVehicleDeployment?.length}
                      </div>
                      <div className="text-slate-500 dark:text-slate-500">
                        Total Trips
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
          <div className="col-span-12 mt-8">
            <div className="items-center block h-10 intro-y">
              <h2 className="text-lg font-medium truncate">Vehicle Movements</h2>
            </div>
            <div className="p-5 mt-12 intro-y box sm:mt-5">
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead className="text-center">
                    <tr>
                      <th>Time of Arrival</th>
                      <th>Time of Departure</th>
                    </tr>
                  </thead>
                  <tbody className="text-center dark:text-slate-300 text-slate-500 dark:border-darkmode-300 border-spacing-0">
                    {dashboardData?.dashboard?.length && dashboardData?.dashboard[0]?.allVehicleMovements?.length &&
                      dashboardData?.dashboard[0]?.allVehicleMovements?.map(
                        (vehicle: any) => (
                          <tr key={vehicle._id}>
                            <td>{vehicle.timeOfArrival}</td>
                            <td>{vehicle.timeOfDeparture}</td>
                          </tr>
                        )
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>


          <div className="col-span-12 mt-8">
            <div className="items-center block h-10 intro-y">
              <h2 className="text-lg font-medium truncate">
                Fleet & Vehicle Deployment
              </h2>
            </div>
            <div className="p-5 mt-12 intro-y box sm:mt-5">
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr className="text-left">
                      <th>Deploy Time Range</th>
                      <th>Total Distance</th>
                      <th>Total Waste</th>
                      <th>Total Vehicles</th>
                      <th>Total Trips</th>
                      <th>Total Fuel Cost</th>
                    </tr>
                  </thead>
                  <tbody className="text-left">
                    {dashboardData?.fleetAndVehicleDeployment?.length &&
                      dashboardData?.fleetAndVehicleDeployment?.map(
                        (fleet: any) => (
                          <tr key={fleet._id} className="border-b border-t border-slate-200 dark:border-darkmode-300">
                            <td>{fleet.deployTimeRange}</td>
                            <td>{fleet.totalDistance}</td>
                            <td>{fleet.totalWaste}</td>
                            <td>{fleet.totalVehicles}</td>
                            <td>{fleet.totalTrips}</td>
                            <td>{fleet.totalFuelCost}</td>
                          </tr>
                        )
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
    