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

function Main() {
  const [salesReportFilter, setSalesReportFilter] = useState<string>();
  const importantNotesRef = useRef<TinySliderElement>();
  const prevImportantNotes = () => {
    importantNotesRef.current?.tns.goTo("prev");
  };
  const nextImportantNotes = () => {
    importantNotesRef.current?.tns.goTo("next");
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 2xl:col-span-9">
        <div className="grid grid-cols-12 gap-6">
          {/* BEGIN: General Report */}
          <div className="col-span-12 mt-8">
            <div className="flex items-center h-10 intro-y">
              <h2 className="mr-5 text-lg font-medium truncate">
                General Report
              </h2>
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
                        icon="ShoppingCart"
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
                      4.710
                    </div>
                    <div className="mt-1 text-base text-slate-500">
                      Item Sales
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
                        icon="CreditCard"
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
                      3.721
                    </div>
                    <div className="mt-1 text-base text-slate-500">
                      New Orders
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
                        icon="Monitor"
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
                      2.149
                    </div>
                    <div className="mt-1 text-base text-slate-500">
                      Total Products
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
                        icon="User"
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
                      152.040
                    </div>
                    <div className="mt-1 text-base text-slate-500">
                      Unique Visitor
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END: General Report */}
          {/* BEGIN: Sales Report */}
          <div className="col-span-12 mt-8 lg:col-span-6">
            <div className="items-center block h-10 intro-y sm:flex">
              <h2 className="mr-5 text-lg font-medium truncate">
                Sales Report
              </h2>
              <div className="relative mt-3 sm:ml-auto sm:mt-0 text-slate-500">
                <Lucide
                  icon="Calendar"
                  className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3"
                />
                <Litepicker
                  value={salesReportFilter}
                  onChange={setSalesReportFilter}
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
                  className="pl-10 sm:w-56 !box"
                />
              </div>
            </div>
            <div className="p-5 mt-12 intro-y box sm:mt-5">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="flex">
                  <div>
                    <div className="text-lg font-medium text-primary dark:text-slate-300 xl:text-xl">
                      $15,000
                    </div>
                    <div className="mt-0.5 text-slate-500">This Month</div>
                  </div>
                  <div className="w-px h-12 mx-4 border border-r border-dashed border-slate-200 dark:border-darkmode-300 xl:mx-5"></div>
                  <div>
                    <div className="text-lg font-medium text-slate-500 xl:text-xl">
                      $10,000
                    </div>
                    <div className="mt-0.5 text-slate-500">Last Month</div>
                  </div>
                </div>
                <Menu className="mt-5 md:ml-auto md:mt-0">
                  <Menu.Button
                    as={Button}
                    variant="outline-secondary"
                    className="font-normal"
                  >
                    Filter by Category
                    <Lucide icon="ChevronDown" className="w-4 h-4 ml-2" />
                  </Menu.Button>
                  <Menu.Items className="w-40 h-32 overflow-y-auto">
                    <Menu.Item>PC & Laptop</Menu.Item>
                    <Menu.Item>Smartphone</Menu.Item>
                    <Menu.Item>Electronic</Menu.Item>
                    <Menu.Item>Photography</Menu.Item>
                    <Menu.Item>Sport</Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>
              <div
                className={clsx([
                  "relative",
                  "before:content-[''] before:block before:absolute before:w-16 before:left-0 before:top-0 before:bottom-0 before:ml-10 before:mb-7 before:bg-gradient-to-r before:from-white before:via-white/80 before:to-transparent before:dark:from-darkmode-600",
                  "after:content-[''] after:block after:absolute after:w-16 after:right-0 after:top-0 after:bottom-0 after:mb-7 after:bg-gradient-to-l after:from-white after:via-white/80 after:to-transparent after:dark:from-darkmode-600",
                ])}
              >
                <ReportLineChart height={275} className="mt-6 -mb-6" />
              </div>
            </div>
          </div>

          
          {/* END: Sales Report */}
          {/* BEGIN: Weekly Top Seller */}
          <div className="col-span-12 mt-8 sm:col-span-6 lg:col-span-3">
            <div className="flex items-center h-10 intro-y">
              <h2 className="mr-5 text-lg font-medium truncate">
                Weekly Top Seller
              </h2>
              <a href="" className="ml-auto truncate text-primary">
                Show More
              </a>
            </div>
            <div className="p-5 mt-5 intro-y box">
              <div className="mt-3">
                <ReportPieChart height={213} />
              </div>
              <div className="mx-auto mt-8 w-52 sm:w-auto">
                <div className="flex items-center">
                  <div className="w-2 h-2 mr-3 rounded-full bg-primary"></div>
                  <span className="truncate">17 - 30 Years old</span>
                  <span className="ml-auto font-medium">62%</span>
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-2 h-2 mr-3 rounded-full bg-pending"></div>
                  <span className="truncate">31 - 50 Years old</span>
                  <span className="ml-auto font-medium">33%</span>
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-2 h-2 mr-3 rounded-full bg-warning"></div>
                  <span className="truncate">&gt;= 50 Years old</span>
                  <span className="ml-auto font-medium">10%</span>
                </div>
              </div>
            </div>
          </div>
          {/* END: Weekly Top Seller */}
          {/* BEGIN: Sales Report */}
          <div className="col-span-12 mt-8 sm:col-span-6 lg:col-span-3">
            <div className="flex items-center h-10 intro-y">
              <h2 className="mr-5 text-lg font-medium truncate">
                Sales Report
              </h2>
              <a href="" className="ml-auto truncate text-primary">
                Show More
              </a>
            </div>
            <div className="p-5 mt-5 intro-y box">
              <div className="mt-3">
                <ReportDonutChart height={213} />
              </div>
              <div className="mx-auto mt-8 w-52 sm:w-auto">
                <div className="flex items-center">
                  <div className="w-2 h-2 mr-3 rounded-full bg-primary"></div>
                  <span className="truncate">17 - 30 Years old</span>
                  <span className="ml-auto font-medium">62%</span>
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-2 h-2 mr-3 rounded-full bg-pending"></div>
                  <span className="truncate">31 - 50 Years old</span>
                  <span className="ml-auto font-medium">33%</span>
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-2 h-2 mr-3 rounded-full bg-warning"></div>
                  <span className="truncate">&gt;= 50 Years old</span>
                  <span className="ml-auto font-medium">10%</span>
                </div>
              </div>
            </div>
          </div>
          {/* END: Sales Report */}
          {/* BEGIN: Official Store */}
          <div className="col-span-12 mt-6 xl:col-span-8">
            <div className="items-center block h-10 intro-y sm:flex">
              <h2 className="mr-5 text-lg font-medium truncate">
                Official Store
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
              <div>
                250 Official stores in 21 countries, click the marker to see
                location details.
              </div>
              <LeafletMap className="h-[310px] mt-5 rounded-md bg-slate-200" />
            </div>
          </div>
          {/* END: Official Store */}
          {/* BEGIN: Weekly Best Sellers */}
          <div className="col-span-12 mt-6 xl:col-span-4">
            <div className="flex items-center h-10 intro-y">
              <h2 className="mr-5 text-lg font-medium truncate">
                Weekly Best Sellers
              </h2>
            </div>
            <div className="mt-5">
              {_.take(fakerData, 4).map((faker, fakerKey) => (
                <div key={fakerKey} className="intro-y">
                  <div className="flex items-center px-4 py-4 mb-3 box zoom-in">
                    <div className="flex-none w-10 h-10 overflow-hidden rounded-md image-fit">
                      <img
                        alt="image"
                        src={faker.photos[0]}
                      />
                    </div>
                    <div className="ml-4 mr-auto">
                      <div className="font-medium">{faker.users[0].name}</div>
                      <div className="text-slate-500 text-xs mt-0.5">
                        {faker.dates[0]}
                      </div>
                    </div>
                    <div className="px-2 py-1 text-xs font-medium text-white rounded-full cursor-pointer bg-success">
                      137 Sales
                    </div>
                  </div>
                </div>
              ))}
              <a
                href=""
                className="block w-full py-4 text-center border border-dotted rounded-md intro-y border-slate-400 dark:border-darkmode-300 text-slate-500"
              >
                View More
              </a>
            </div>
          </div>

          {/* start from here */}
          <div className="relative col-span-12 mt-6">
          <div className="grid grid-cols-12 gap-6">
          <div className="z-20 col-span-12 xl:col-span-9 2xl:col-span-9">
            <div className="mt-6 -mb-6 intro-y">
              <Alert
                variant="primary"
                dismissible
                className="flex items-center mb-6 box dark:border-darkmode-600"
              >
                {({ dismiss }) => (
                  <>
                    <span>
                      Introducing new dashboard! Download now at
                      <a
                        href="https://themeforest.net/item/midone-jquery-tailwindcss-html-admin-template/26366820"
                        className="ml-1 underline"
                        target="blank"
                      >
                        themeforest.net
                      </a>
                      .
                      <button className="rounded-md bg-white bg-opacity-20 dark:bg-darkmode-300 hover:bg-opacity-30 py-0.5 px-2 -my-3 ml-2">
                        Live Preview
                      </button>
                    </span>
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
                <div className="-mb-1 text-sm font-medium 2xl:text-base">
                  Hi Angelina,{" "}
                  <span className="font-normal text-slate-600 dark:text-slate-300">
                    welcome back!
                  </span>
                </div>
                <div className="flex items-center justify-center text-base leading-3 2xl:text-lg sm:justify-start text-slate-600 dark:text-slate-300 mt-14 2xl:mt-24">
                  My Total Assets
                  <Tippy
                    as="div"
                    content="Total value of your sales: $158.409.416"
                  >
                    <Lucide
                      icon="AlertCircle"
                      className="w-5 h-5 ml-1.5 mt-0.5"
                    />
                  </Tippy>
                </div>
                <div className="mt-5 mb-3 2xl:flex">
                  <div className="flex items-center justify-center sm:justify-start">
                    <div className="relative pl-3 text-2xl font-medium leading-6 2xl:text-3xl 2xl:pl-4">
                      <span className="absolute top-0 left-0 -mt-1 text-xl 2xl:text-2xl 2xl:mt-0">
                        $
                      </span>
                      142,402,210
                    </div>
                    <a className="ml-4 text-slate-500 2xl:ml-16" href="">
                      <Lucide icon="RefreshCcw" className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="mt-5 2xl:flex 2xl:justify-center 2xl:mt-0 2xl:-ml-20 2xl:w-14 2xl:flex-none 2xl:pl-2.5">
                    <Tippy
                      as="div"
                      className="inline-flex items-center px-2 py-1 text-xs font-medium text-white rounded-full cursor-pointer bg-success 2xl:text-sm 2xl:p-0 2xl:text-success 2xl:bg-transparent 2xl:flex 2xl:justify-center"
                      content="49% Higher than last month"
                    >
                      49%
                      <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                    </Tippy>
                  </div>
                </div>
                <div className="text-slate-500">Last updated 1 hour ago</div>
                <div className="mt-6 -mb-1 2xl:text-base text-slate-600 dark:text-slate-300">
                  Total net margin{" "}
                  <a
                    href=""
                    className="underline decoration-dotted underline-offset-4 text-primary dark:text-slate-400"
                  >
                    $12,921,050
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
                <div className="flex flex-wrap items-center">
                  <div className="flex items-center justify-center w-full mb-5 mr-auto sm:w-auto sm:justify-start 2xl:mb-0">
                    <div className="w-2 h-2 -mt-4 rounded-full bg-primary"></div>
                    <div className="ml-3.5">
                      <div className="relative text-xl 2xl:text-2xl font-medium leading-6 2xl:leading-5 pl-3.5 2xl:pl-4">
                        <span className="absolute text-base 2xl:text-xl top-0 left-0 2xl:-mt-1.5">
                          $
                        </span>
                        47,578.77
                      </div>
                      <div className="mt-2 text-slate-500">Yearly budget</div>
                    </div>
                  </div>
                  <FormSelect className="bg-transparent border-black border-opacity-10 dark:border-darkmode-400 dark:bg-transparent mx-auto sm:mx-0 py-1.5 px-3 w-auto -mt-2">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    <option value="custom-date">Custom Date</option>
                  </FormSelect>
                </div>
                <div className="mt-10 text-slate-600 dark:text-slate-300">
                  You have spent about 35% of your annual budget.
                </div>
                <div className="mt-6">
                  <ReportBarChart1 height={290} />
                </div>
              </div>
              <Tab.Group className="col-span-12 py-6 pl-4 -ml-4 border-t border-l border-black border-dashed sm:col-span-6 md:col-span-4 border-opacity-10 sm:border-t-0 md:border-l-0 md:ml-0 md:pl-0">
                <Tab.List
                  variant="pills"
                  className="w-3/4 p-1 mx-auto rounded-md 2xl:w-4/6 bg-slate-200 dark:bg-black/10"
                >
                  <Tab>
                    <Tab.Button as="button" className="w-full py-1.5 px-2">
                      Active
                    </Tab.Button>
                  </Tab>
                  <Tab>
                    <Tab.Button as="button" className="w-full py-1.5 px-2">
                      Inactive
                    </Tab.Button>
                  </Tab>
                </Tab.List>
                <Tab.Panels className="mt-6">
                  <Tab.Panel>
                    <div className="relative mt-8">
                      <ReportDonutChart2 height={215} />
                      <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full">
                        <div className="text-xl font-medium 2xl:text-2xl">
                          2.501
                        </div>
                        <div className="text-slate-500 mt-0.5">
                          Active Users
                        </div>
                      </div>
                    </div>
                    <div className="w-10/12 mx-auto mt-8 2xl:w-2/3">
                      <div className="flex items-center">
                        <div className="w-2 h-2 mr-3 rounded-full bg-primary"></div>
                        <span className="truncate">17 - 30 Years old</span>
                        <span className="font-medium xl:ml-auto">62%</span>
                      </div>
                      <div className="flex items-center mt-4">
                        <div className="w-2 h-2 mr-3 rounded-full bg-pending"></div>
                        <span className="truncate">31 - 50 Years old</span>
                        <span className="font-medium xl:ml-auto">33%</span>
                      </div>
                      <div className="flex items-center mt-4">
                        <div className="w-2 h-2 mr-3 rounded-full bg-warning"></div>
                        <span className="truncate">&gt;= 50 Years old</span>
                        <span className="font-medium xl:ml-auto">10%</span>
                      </div>
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
          <div
            className={clsx([
              "z-10 col-span-12 px-5 pt-8 -mx-[16px] md:-mx-[22px] relative pb-14",
              "before:content-[''] before:rounded-[30px_30px_0px_0px] before:w-full before:h-full before:bg-slate-200/70 before:dark:bg-opacity-50 before:absolute before:top-0 before:left-0 before:right-0 before:dark:bg-darkmode-500",
            ])}
          >
            <div className="relative grid grid-cols-12 gap-6 intro-y">
              <div className="col-span-12 px-0 sm:col-span-4 xl:col-span-3 lg:px-6 xl:px-0 2xl:px-6">
                <div className="flex flex-wrap items-center gap-3 lg:flex-nowrap">
                  <div className="mr-auto text-lg font-medium truncate sm:w-full lg:w-auto">
                    Summary Report
                  </div>
                  <div className="py-1 px-2.5 rounded-full text-xs bg-slate-300/50 dark:bg-darkmode-400 text-slate-600 dark:text-slate-300 cursor-pointer truncate">
                    180 Campaign
                  </div>
                </div>
                <div className="px-10 sm:px-0">
                  <SimpleLineChart3 height={110} className="mt-8 -ml-1 -mb-7" />
                </div>
              </div>
              <div className="col-span-12 px-0 sm:col-span-4 xl:col-span-3 lg:px-6 xl:px-0 2xl:px-6">
                <div className="flex flex-wrap items-center gap-3 lg:flex-nowrap">
                  <div className="mr-auto text-lg font-medium truncate sm:w-full lg:w-auto">
                    Social Media
                  </div>
                  <a href="" className="flex items-center text-primary">
                    <div className="truncate 2xl:mr-auto">View Details</div>
                    <Lucide icon="ArrowRight" className="w-4 h-4 ml-3" />
                  </a>
                </div>
                <div className="flex items-center justify-center mt-10">
                  <div className="text-right">
                    <div className="text-3xl font-medium">149</div>
                    <div className="mt-1 truncate text-slate-500">
                      Active Lenders
                    </div>
                  </div>
                  <div className="w-px h-16 mx-4 border border-r border-dashed border-slate-300 dark:border-darkmode-400 xl:mx-6"></div>
                  <div>
                    <div className="text-3xl font-medium">135</div>
                    <div className="mt-1 truncate text-slate-500">
                      Total Lenders
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 px-0 sm:col-span-4 xl:col-span-3 lg:px-6 xl:px-0 2xl:px-6">
                <div className="flex flex-wrap items-center gap-3 lg:flex-nowrap">
                  <div className="mr-auto text-lg font-medium truncate sm:w-full lg:w-auto">
                    Posted Ads
                  </div>
                  <div className="py-1 px-2.5 rounded-full text-xs bg-slate-300/50 dark:bg-darkmode-400 text-slate-600 dark:text-slate-300 cursor-pointer truncate">
                    320 Followers
                  </div>
                </div>
                <div className="px-10 sm:px-0">
                  <SimpleLineChart4 height={110} className="mt-8 -ml-1 -mb-7" />
                </div>
              </div>
            </div>
          </div>
            </div>
          </div>
          
          {/* END: Weekly Best Sellers */}
          {/* BEGIN: General Report */}
          <div className="grid grid-cols-12 col-span-12 gap-6 mt-8">
            <div className="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y">
              <div className="p-5 box zoom-in">
                <div className="flex items-center">
                  <div className="flex-none w-2/4">
                    <div className="text-lg font-medium truncate">
                      Target Sales
                    </div>
                    <div className="mt-1 text-slate-500">300 Sales</div>
                  </div>
                  <div className="relative flex-none ml-auto">
                    <ReportDonutChart1 width={90} height={90} />
                    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full font-medium">
                      20%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y">
              <div className="p-5 box zoom-in">
                <div className="flex">
                  <div className="mr-3 text-lg font-medium truncate">
                    Social Media
                  </div>
                  <div className="flex items-center px-2 py-1 ml-auto text-xs truncate rounded-full cursor-pointer bg-slate-100 dark:bg-darkmode-400 text-slate-500">
                    320 Followers
                  </div>
                </div>
                <div className="mt-1">
                  <SimpleLineChart1 height={58} className="-ml-1" />
                </div>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y">
              <div className="p-5 box zoom-in">
                <div className="flex items-center">
                  <div className="flex-none w-2/4">
                    <div className="text-lg font-medium truncate">
                      New Products
                    </div>
                    <div className="mt-1 text-slate-500">1450 Products</div>
                  </div>
                  <div className="relative flex-none ml-auto">
                    <ReportDonutChart1 width={90} height={90} />
                    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full font-medium">
                      45%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y">
              <div className="p-5 box zoom-in">
                <div className="flex">
                  <div className="mr-3 text-lg font-medium truncate">
                    Posted Ads
                  </div>
                  <div className="flex items-center px-2 py-1 ml-auto text-xs truncate rounded-full cursor-pointer bg-slate-100 dark:bg-darkmode-400 text-slate-500">
                    180 Campaign
                  </div>
                </div>
                <div className="mt-1">
                  <SimpleLineChart1 height={58} className="-ml-1" />
                </div>
              </div>
            </div>
          </div>
          {/* END: General Report */}
          {/* BEGIN: Weekly Top Products */}
          <div className="col-span-12 mt-6">
            <div className="items-center block h-10 intro-y sm:flex">
              <h2 className="mr-5 text-lg font-medium truncate">
                Weekly Top Products
              </h2>
              <div className="flex items-center mt-3 sm:ml-auto sm:mt-0">
                <Button className="flex items-center !box text-slate-600 dark:text-slate-300">
                  <Lucide
                    icon="FileText"
                    className="hidden w-4 h-4 mr-2 sm:block"
                  />
                  Export to Excel
                </Button>
                <Button className="flex items-center ml-3 !box text-slate-600 dark:text-slate-300">
                  <Lucide
                    icon="FileText"
                    className="hidden w-4 h-4 mr-2 sm:block"
                  />
                  Export to PDF
                </Button>
              </div>
            </div>
            <div className="mt-8 overflow-auto intro-y lg:overflow-visible sm:mt-0">
              <Table className="border-spacing-y-[10px] border-separate sm:mt-2">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th className="border-b-0 whitespace-nowrap">
                      IMAGES
                    </Table.Th>
                    <Table.Th className="border-b-0 whitespace-nowrap">
                      PRODUCT NAME
                    </Table.Th>
                    <Table.Th className="text-center border-b-0 whitespace-nowrap">
                      STOCK
                    </Table.Th>
                    <Table.Th className="text-center border-b-0 whitespace-nowrap">
                      STATUS
                    </Table.Th>
                    <Table.Th className="text-center border-b-0 whitespace-nowrap">
                      ACTIONS
                    </Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {_.take(fakerData, 4).map((faker, fakerKey) => (
                    <Table.Tr key={fakerKey} className="intro-x">
                      <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                        <div className="flex">
                          <div className="w-10 h-10 image-fit zoom-in">
                            <Tippy
                              as="img"
                              alt="image"
                              className="rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                              src={faker.images[0]}
                              content={`Uploaded at ${faker.dates[0]}`}
                            />
                          </div>
                          <div className="w-10 h-10 -ml-5 image-fit zoom-in">
                            <Tippy
                              as="img"
                              alt="image"
                              className="rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                              src={faker.images[1]}
                              content={`Uploaded at ${faker.dates[1]}`}
                            />
                          </div>
                          <div className="w-10 h-10 -ml-5 image-fit zoom-in">
                            <Tippy
                              as="img"
                              alt="image"
                              className="rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                              src={faker.images[2]}
                              content={`Uploaded at ${faker.dates[2]}`}
                            />
                          </div>
                        </div>
                      </Table.Td>
                      <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                        <a href="" className="font-medium whitespace-nowrap">
                          {faker.products[0].name}
                        </a>
                        <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                          {faker.products[0].category}
                        </div>
                      </Table.Td>
                      <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                        {faker.stocks[0]}
                      </Table.Td>
                      <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                        <div
                          className={clsx([
                            "flex items-center justify-center",
                            { "text-success": faker.trueFalse[0] },
                            { "text-danger": !faker.trueFalse[0] },
                          ])}
                        >
                          <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
                          {faker.trueFalse[0] ? "Active" : "Inactive"}
                        </div>
                      </Table.Td>
                      <Table.Td className="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                        <div className="flex items-center justify-center">
                          <a className="flex items-center mr-3" href="">
                            <Lucide
                              icon="CheckSquare"
                              className="w-4 h-4 mr-1"
                            />
                            Edit
                          </a>
                          <a className="flex items-center text-danger" href="">
                            <Lucide icon="Trash2" className="w-4 h-4 mr-1" />{" "}
                            Delete
                          </a>
                        </div>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </div>
            <div className="flex flex-wrap items-center mt-3 intro-y sm:flex-row sm:flex-nowrap">
              <Pagination className="w-full sm:w-auto sm:mr-auto">
                <Pagination.Link>
                  <Lucide icon="ChevronsLeft" className="w-4 h-4" />
                </Pagination.Link>
                <Pagination.Link>
                  <Lucide icon="ChevronLeft" className="w-4 h-4" />
                </Pagination.Link>
                <Pagination.Link>...</Pagination.Link>
                <Pagination.Link>1</Pagination.Link>
                <Pagination.Link active>2</Pagination.Link>
                <Pagination.Link>3</Pagination.Link>
                <Pagination.Link>...</Pagination.Link>
                <Pagination.Link>
                  <Lucide icon="ChevronRight" className="w-4 h-4" />
                </Pagination.Link>
                <Pagination.Link>
                  <Lucide icon="ChevronsRight" className="w-4 h-4" />
                </Pagination.Link>
              </Pagination>
              <FormSelect className="w-20 mt-3 !box sm:mt-0">
                <option>10</option>
                <option>25</option>
                <option>35</option>
                <option>50</option>
              </FormSelect>
            </div>
          </div>
          {/* END: Weekly Top Products */}
        </div>
      </div>
      <div className="col-span-12 2xl:col-span-3">
        <div className="pb-10 -mb-10 2xl:border-l">
          <div className="grid grid-cols-12 2xl:pl-6 gap-x-6 2xl:gap-x-0 gap-y-6">
            {/* BEGIN: Transactions */}
            <div className="col-span-12 mt-3 md:col-span-6 xl:col-span-4 2xl:col-span-12 2xl:mt-8">
              <div className="flex items-center h-10 intro-x">
                <h2 className="mr-5 text-lg font-medium truncate">
                  Transactions
                </h2>
              </div>
              <div className="mt-5">
                {_.take(fakerData, 5).map((faker, fakerKey) => (
                  <div key={fakerKey} className="intro-x">
                    <div className="flex items-center px-5 py-3 mb-3 box zoom-in">
                      <div className="flex-none w-10 h-10 overflow-hidden rounded-full image-fit">
                        <img
                          alt="image"
                          src={faker.photos[0]}
                        />
                      </div>
                      <div className="ml-4 mr-auto">
                        <div className="font-medium">{faker.users[0].name}</div>
                        <div className="text-slate-500 text-xs mt-0.5">
                          {faker.dates[0]}
                        </div>
                      </div>
                      <div
                        className={clsx({
                          "text-success": faker.trueFalse[0],
                          "text-danger": !faker.trueFalse[0],
                        })}
                      >
                        {faker.trueFalse[0] ? "+" : "-"}${faker.totals[0]}
                      </div>
                    </div>
                  </div>
                ))}
                <a
                  href=""
                  className="block w-full py-3 text-center border border-dotted rounded-md intro-x border-slate-400 dark:border-darkmode-300 text-slate-500"
                >
                  View More
                </a>
              </div>
            </div>
            {/* END: Transactions */}
            {/* BEGIN: Recent Activities */}
            <div className="col-span-12 mt-3 md:col-span-6 xl:col-span-4 2xl:col-span-12">
              <div className="flex items-center h-10 intro-x">
                <h2 className="mr-5 text-lg font-medium truncate">
                  Recent Activities
                </h2>
                <a href="" className="ml-auto truncate text-primary">
                  Show More
                </a>
              </div>
              <div className="mt-5 relative before:block before:absolute before:w-px before:h-[85%] before:bg-slate-200 before:dark:bg-darkmode-400 before:ml-5 before:mt-5">
                <div className="relative flex items-center mb-3 intro-x">
                  <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                    <div className="flex-none w-10 h-10 overflow-hidden rounded-full image-fit">
                      <img
                        alt="image"
                        src={fakerData[9].photos[0]}
                      />
                    </div>
                  </div>
                  <div className="flex-1 px-5 py-3 ml-4 box zoom-in">
                    <div className="flex items-center">
                      <div className="font-medium">
                        {fakerData[9].users[0].name}
                      </div>
                      <div className="ml-auto text-xs text-slate-500">
                        07:00 PM
                      </div>
                    </div>
                    <div className="mt-1 text-slate-500">
                      Has joined the team
                    </div>
                  </div>
                </div>
                <div className="relative flex items-center mb-3 intro-x">
                  <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                    <div className="flex-none w-10 h-10 overflow-hidden rounded-full image-fit">
                      <img
                        alt="image"
                        src={fakerData[8].photos[0]}
                      />
                    </div>
                  </div>
                  <div className="flex-1 px-5 py-3 ml-4 box zoom-in">
                    <div className="flex items-center">
                      <div className="font-medium">
                        {fakerData[8].users[0].name}
                      </div>
                      <div className="ml-auto text-xs text-slate-500">
                        07:00 PM
                      </div>
                    </div>
                    <div className="text-slate-500">
                      <div className="mt-1">Added 3 new photos</div>
                      <div className="flex mt-2">
                        <Tippy
                          as="div"
                          className="w-8 h-8 mr-1 image-fit zoom-in"
                          content={fakerData[0].products[0].name}
                        >
                          <img
                            alt="image"
                            className="border border-white rounded-md"
                            src={fakerData[8].images[0]}
                          />
                        </Tippy>
                        <Tippy
                          as="div"
                          className="w-8 h-8 mr-1 image-fit zoom-in"
                          content={fakerData[1].products[0].name}
                        >
                          <img
                            alt="image"
                            className="border border-white rounded-md"
                            src={fakerData[8].images[1]}
                          />
                        </Tippy>
                        <Tippy
                          as="div"
                          className="w-8 h-8 mr-1 image-fit zoom-in"
                          content={fakerData[2].products[0].name}
                        >
                          <img
                            alt="image"
                            className="border border-white rounded-md"
                            src={fakerData[8].images[2]}
                          />
                        </Tippy>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-4 text-xs text-center intro-x text-slate-500">
                  12 November
                </div>
                <div className="relative flex items-center mb-3 intro-x">
                  <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                    <div className="flex-none w-10 h-10 overflow-hidden rounded-full image-fit">
                      <img
                        alt="image"
                        src={fakerData[7].photos[0]}
                      />
                    </div>
                  </div>
                  <div className="flex-1 px-5 py-3 ml-4 box zoom-in">
                    <div className="flex items-center">
                      <div className="font-medium">
                        {fakerData[7].users[0].name}
                      </div>
                      <div className="ml-auto text-xs text-slate-500">
                        07:00 PM
                      </div>
                    </div>
                    <div className="mt-1 text-slate-500">
                      Has changed{" "}
                      <a className="text-primary" href="">
                        {fakerData[7].products[0].name}
                      </a>{" "}
                      price and description
                    </div>
                  </div>
                </div>
                <div className="relative flex items-center mb-3 intro-x">
                  <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                    <div className="flex-none w-10 h-10 overflow-hidden rounded-full image-fit">
                      <img
                        alt="image"
                        src={fakerData[6].photos[0]}
                      />
                    </div>
                  </div>
                  <div className="flex-1 px-5 py-3 ml-4 box zoom-in">
                    <div className="flex items-center">
                      <div className="font-medium">
                        {fakerData[6].users[0].name}
                      </div>
                      <div className="ml-auto text-xs text-slate-500">
                        07:00 PM
                      </div>
                    </div>
                    <div className="mt-1 text-slate-500">
                      Has changed{" "}
                      <a className="text-primary" href="">
                        {fakerData[6].products[0].name}
                      </a>{" "}
                      description
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* END: Recent Activities */}
            {/* BEGIN: Important Notes */}
            <div className="col-span-12 mt-3 md:col-span-6 xl:col-span-12 xl:col-start-1 xl:row-start-1 2xl:col-start-auto 2xl:row-start-auto">
              <div className="flex items-center h-10 intro-x">
                <h2 className="mr-auto text-lg font-medium truncate">
                  Important Notes
                </h2>
                <Button
                  data-carousel="important-notes"
                  data-target="prev"
                  className="px-2 mr-2 border-slate-300 text-slate-600 dark:text-slate-300"
                  onClick={prevImportantNotes}
                >
                  <Lucide icon="ChevronLeft" className="w-4 h-4" />
                </Button>
                <Button
                  data-carousel="important-notes"
                  data-target="next"
                  className="px-2 mr-2 border-slate-300 text-slate-600 dark:text-slate-300"
                  onClick={nextImportantNotes}
                >
                  <Lucide icon="ChevronRight" className="w-4 h-4" />
                </Button>
              </div>
              <div className="mt-5 intro-x">
                <div className="box zoom-in">
                  <TinySlider
                    getRef={(el) => {
                      importantNotesRef.current = el;
                    }}
                  >
                    <div className="p-5">
                      <div className="text-base font-medium truncate">
                        Lorem Ipsum is simply dummy text
                      </div>
                      <div className="mt-1 text-slate-400">20 Hours ago</div>
                      <div className="mt-1 text-justify text-slate-500">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s.
                      </div>
                      <div className="flex mt-5 font-medium">
                        <Button
                          variant="secondary"
                          type="button"
                          className="px-2 py-1"
                        >
                          View Notes
                        </Button>
                        <Button
                          variant="outline-secondary"
                          type="button"
                          className="px-2 py-1 ml-auto"
                        >
                          Dismiss
                        </Button>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="text-base font-medium truncate">
                        Lorem Ipsum is simply dummy text
                      </div>
                      <div className="mt-1 text-slate-400">20 Hours ago</div>
                      <div className="mt-1 text-justify text-slate-500">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s.
                      </div>
                      <div className="flex mt-5 font-medium">
                        <Button
                          variant="secondary"
                          type="button"
                          className="px-2 py-1"
                        >
                          View Notes
                        </Button>
                        <Button
                          variant="outline-secondary"
                          type="button"
                          className="px-2 py-1 ml-auto"
                        >
                          Dismiss
                        </Button>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="text-base font-medium truncate">
                        Lorem Ipsum is simply dummy text
                      </div>
                      <div className="mt-1 text-slate-400">20 Hours ago</div>
                      <div className="mt-1 text-justify text-slate-500">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s.
                      </div>
                      <div className="flex mt-5 font-medium">
                        <Button
                          variant="secondary"
                          type="button"
                          className="px-2 py-1"
                        >
                          View Notes
                        </Button>
                        <Button
                          variant="outline-secondary"
                          type="button"
                          className="px-2 py-1 ml-auto"
                        >
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </TinySlider>
                </div>
              </div>
            </div>
            {/* END: Important Notes */}
            {/* BEGIN: Schedules */}
            <div className="col-span-12 mt-3 md:col-span-6 xl:col-span-4 2xl:col-span-12 xl:col-start-1 xl:row-start-2 2xl:col-start-auto 2xl:row-start-auto">
              <div className="flex items-center h-10 intro-x">
                <h2 className="mr-5 text-lg font-medium truncate">Schedules</h2>
                <a
                  href=""
                  className="flex items-center ml-auto truncate text-primary"
                >
                  <Lucide icon="Plus" className="w-4 h-4 mr-1" /> Add New
                  Schedules
                </a>
              </div>
              <div className="mt-5">
                <div className="intro-x box">
                  <div className="p-5">
                    <div className="flex">
                      <Lucide
                        icon="ChevronLeft"
                        className="w-5 h-5 text-slate-500"
                      />
                      <div className="mx-auto text-base font-medium">April</div>
                      <Lucide
                        icon="ChevronRight"
                        className="w-5 h-5 text-slate-500"
                      />
                    </div>
                    <div className="grid grid-cols-7 gap-4 mt-5 text-center">
                      <div className="font-medium">Su</div>
                      <div className="font-medium">Mo</div>
                      <div className="font-medium">Tu</div>
                      <div className="font-medium">We</div>
                      <div className="font-medium">Th</div>
                      <div className="font-medium">Fr</div>
                      <div className="font-medium">Sa</div>
                      <div className="py-0.5 rounded relative text-slate-500">
                        29
                      </div>
                      <div className="py-0.5 rounded relative text-slate-500">
                        30
                      </div>
                      <div className="py-0.5 rounded relative text-slate-500">
                        31
                      </div>
                      <div className="py-0.5 rounded relative">1</div>
                      <div className="py-0.5 rounded relative">2</div>
                      <div className="py-0.5 rounded relative">3</div>
                      <div className="py-0.5 rounded relative">4</div>
                      <div className="py-0.5 rounded relative">5</div>
                      <div className="py-0.5 bg-success/20 dark:bg-success/30 rounded relative">
                        6
                      </div>
                      <div className="py-0.5 rounded relative">7</div>
                      <div className="py-0.5 bg-primary text-white rounded relative">
                        8
                      </div>
                      <div className="py-0.5 rounded relative">9</div>
                      <div className="py-0.5 rounded relative">10</div>
                      <div className="py-0.5 rounded relative">11</div>
                      <div className="py-0.5 rounded relative">12</div>
                      <div className="py-0.5 rounded relative">13</div>
                      <div className="py-0.5 rounded relative">14</div>
                      <div className="py-0.5 rounded relative">15</div>
                      <div className="py-0.5 rounded relative">16</div>
                      <div className="py-0.5 rounded relative">17</div>
                      <div className="py-0.5 rounded relative">18</div>
                      <div className="py-0.5 rounded relative">19</div>
                      <div className="py-0.5 rounded relative">20</div>
                      <div className="py-0.5 rounded relative">21</div>
                      <div className="py-0.5 rounded relative">22</div>
                      <div className="py-0.5 bg-pending/20 dark:bg-pending/30 rounded relative">
                        23
                      </div>
                      <div className="py-0.5 rounded relative">24</div>
                      <div className="py-0.5 rounded relative">25</div>
                      <div className="py-0.5 rounded relative">26</div>
                      <div className="py-0.5 bg-primary/10 dark:bg-primary/50 rounded relative">
                        27
                      </div>
                      <div className="py-0.5 rounded relative">28</div>
                      <div className="py-0.5 rounded relative">29</div>
                      <div className="py-0.5 rounded relative">30</div>
                      <div className="py-0.5 rounded relative text-slate-500">
                        1
                      </div>
                      <div className="py-0.5 rounded relative text-slate-500">
                        2
                      </div>
                      <div className="py-0.5 rounded relative text-slate-500">
                        3
                      </div>
                      <div className="py-0.5 rounded relative text-slate-500">
                        4
                      </div>
                      <div className="py-0.5 rounded relative text-slate-500">
                        5
                      </div>
                      <div className="py-0.5 rounded relative text-slate-500">
                        6
                      </div>
                      <div className="py-0.5 rounded relative text-slate-500">
                        7
                      </div>
                      <div className="py-0.5 rounded relative text-slate-500">
                        8
                      </div>
                      <div className="py-0.5 rounded relative text-slate-500">
                        9
                      </div>
                    </div>
                  </div>
                  <div className="p-5 border-t border-slate-200/60">
                    <div className="flex items-center">
                      <div className="w-2 h-2 mr-3 rounded-full bg-pending"></div>
                      <span className="truncate">UI/UX Workshop</span>
                      <span className="font-medium xl:ml-auto">23th</span>
                    </div>
                    <div className="flex items-center mt-4">
                      <div className="w-2 h-2 mr-3 rounded-full bg-primary"></div>
                      <span className="truncate">
                        VueJs Frontend Development
                      </span>
                      <span className="font-medium xl:ml-auto">10th</span>
                    </div>
                    <div className="flex items-center mt-4">
                      <div className="w-2 h-2 mr-3 rounded-full bg-warning"></div>
                      <span className="truncate">Laravel Rest API</span>
                      <span className="font-medium xl:ml-auto">31th</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* END: Schedules */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
