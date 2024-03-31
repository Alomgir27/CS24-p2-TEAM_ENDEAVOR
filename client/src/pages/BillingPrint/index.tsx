import _ from "lodash";
import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";
import { Menu } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import { useParams } from "react-router-dom";
import { getRoute } from "../../services/routeService";
import { useEffect, useState } from "react";

//pdf download
import jsPDF from "jspdf";
import html2canvas from "html2canvas";



function Main() {
  const { id } = useParams();
  const [route, setRoute] = useState<any>({});



  useEffect(() => {
    const fetchRoute = async () => {
      const { data } = await getRoute(id as string);
      setRoute(data.route);
      console.log(data.route);
    };

    fetchRoute();
  }, [id]);

  const handleDownloadPrint =  async () => {
    //print this page
    try {
      await window.print();
    }
    catch (error) {
      console.error(error);
    }
  }

  const handleDownloadPdf = async () => {
    //download this page as pdf
    try {
      const input = document.getElementById("print") as HTMLElement;
      const canvas = await html2canvas(input);
      console.log(canvas);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("download.pdf");
    }
    catch (error) {
      console.error(error);
    }
  }


  return (
    <>
    <div id="print">
      <div className="flex flex-col items-center mt-8 intro-y sm:flex-row">
        <h2 className="mr-auto text-lg font-medium">Billing</h2>
        <div className="flex w-full mt-4 sm:w-auto sm:mt-0">
          <Button variant="primary" className="mr-2 shadow-md" onClick={handleDownloadPrint}>
            Print
          </Button>
          <Menu className="ml-auto sm:ml-0">
            <Menu.Button as={Button} className="px-2 !box">
              <span className="flex items-center justify-center w-5 h-5">
                <Lucide icon="Plus" className="w-4 h-4" />
              </span>
            </Menu.Button>
            <Menu.Items className="w-40">
              <Menu.Item as="button" className="flex items-center w-full h-10 px-4" onClick={handleDownloadPdf}>
                <Lucide icon="File" className="w-4 h-4 mr-2" /> Export PDF
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>

        <div className="mt-5 overflow-hidden intro-y box">
          <div className="text-center border-b border-slate-200/60 dark:border-darkmode-400 sm:text-left">
            <div className="px-5 py-10 sm:px-20 sm:py-20">
              <div className="text-3xl font-semibold text-primary">Billing Info</div>
              <div className="mt-2">
                Receipt <span className="font-medium">#{route._id}</span>
              </div>
              <div className="mt-1">{new Date(route.createdAt).toDateString()}</div>
            </div>
            <div className="flex flex-col px-5 pt-10 pb-10 lg:flex-row sm:px-20 sm:pb-20">
              <div>
                <div className="text-base text-slate-500">Client Details</div>
                <div className="mt-2 text-lg font-medium text-primary">
                  {route.stsEntryId?.stsId?.wardNumber}
                </div>
                <div className="mt-1">{route.stsEntryId?.stsId?.details}</div>
                <div className="mt-1">
                  {route.stsEntryId?.stsId?.gpsCoordinates.coordinates[1]},{" "}
                  {route.stsEntryId?.stsId?.gpsCoordinates.coordinates[0]}
                </div>
              </div>
              <div className="mt-10 lg:text-right lg:mt-0 lg:ml-auto">
                <div className="text-base text-slate-500">Payment to</div>
                <div className="mt-2 text-lg font-medium text-primary">
                  {route.landfillId?.name}
                </div>
                <div className="mt-1">{route.landfillId?.details}</div>
                <div className="mt-1">
                  {route.landfillId?.gpsCoordinates.coordinates[1]},{" "}
                  {route.landfillId?.gpsCoordinates.coordinates[0]}
                </div>
              </div>
            </div>
          </div>
          <div className="px-5 py-10 sm:px-16 sm:py-20">
            <div className="overflow-x-auto">
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th className="border-b-2 dark:border-darkmode-400 whitespace-nowrap">
                  Distance
                    </Table.Th>
                <Table.Th className="text-right border-b-2 dark:border-darkmode-400 whitespace-nowrap">
                  Cost
                    </Table.Th>
                    <Table.Th className="text-right border-b-2 dark:border-darkmode-400 whitespace-nowrap">
                      Weight of Waste
                    </Table.Th>
                <Table.Th className="text-right border-b-2 dark:border-darkmode-400 whitespace-nowrap">
                  Number of Trips
                </Table.Th>
                <Table.Th className="text-right border-b-2 dark:border-darkmode-400 whitespace-nowrap">
                  Arrival Time
                </Table.Th>
                <Table.Th className="text-right border-b-2 dark:border-darkmode-400 whitespace-nowrap">
                  Departure Time
                </Table.Th>
                <Table.Th className="text-right border-b-2 dark:border-darkmode-400 whitespace-nowrap">
                  Details
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td className="border-b dark:border-darkmode-400">
                  {route?.distance}
                </Table.Td>
                <Table.Td className="w-32 text-right border-b dark:border-darkmode-400">
                  {route?.cost}
                    </Table.Td>
                    <Table.Td className="w-32 text-right border-b dark:border-darkmode-400">
                      {route.stsEntryId?.volume}
                    </Table.Td>
                <Table.Td className="w-32 text-right border-b dark:border-darkmode-400">
                  {route?.numberOfTrips}
                </Table.Td>
                <Table.Td className="w-32 font-medium text-right border-b dark:border-darkmode-400">
                  {route?.stsEntryId?.timeOfArrival}
                </Table.Td>
                <Table.Td className="w-32 font-medium text-right border-b dark:border-darkmode-400">
                  {route?.stsEntryId?.timeOfDeparture}
                </Table.Td>
                <Table.Td className="w-32 font-medium text-right border-b dark:border-darkmode-400">
                  {route?.details}
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </div>
      </div>
      <div className="flex flex-col-reverse px-5 pb-10 sm:px-20 sm:pb-20 sm:flex-row">
        <div className="mt-10 text-center sm:text-left sm:mt-0">
          <div className="text-base text-slate-500">Bank Transfer</div>
          <div className="mt-2 text-lg font-medium text-primary">
            {route.landfillId?.landfillManager?.length > 0 ? route.landfillId?.landfillManager[0].username : ""}
          </div>
          <div className="mt-1">{route.landfillId?.landfillManager?.length > 0 ? route.landfillId?.landfillManager[0].email : ""}</div>
        </div>
        <div className="text-center sm:text-right sm:ml-auto">
          <div className="text-base text-slate-500">Total Amount</div>
          <div className="mt-2 text-xl font-medium text-primary">
            {route?.cost}
          </div>
          <div className="mt-1">Paid</div>
        </div>
      </div>
        </div>
      </div>
    </>
  );

}

export default Main;
      



    