import { useState, Fragment } from "react";
import Lucide from "../../base-components/Lucide";
import Breadcrumb from "../../base-components/Breadcrumb";
import { FormInput } from "../../base-components/Form";
import { Menu, Popover } from "../../base-components/Headless";
import _ from "lodash";
import clsx from "clsx";
import { Transition } from "@headlessui/react";
import { logout } from "../../stores/authSlice";
import { logout as logoutService } from "../../services/authService";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";


function Main() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [searchDropdown, setSearchDropdown] = useState(false);
  const dispatch = useDispatch();
  const showSearchDropdown = () => {
    setSearchDropdown(true);
  };
  const hideSearchDropdown = () => {
    setSearchDropdown(false);
  };

  return (
    <>
      {/* BEGIN: Top Bar */}
      <div className="h-[67px] z-[51] flex items-center relative border-b border-slate-200">
        {/* BEGIN: Breadcrumb */}
        <Breadcrumb className="hidden mr-auto -intro-x sm:flex">
          {/* <Breadcrumb.Link to="/">Application</Breadcrumb.Link> */}
          {/* <Breadcrumb.Link to="/" active={true}>
            Dashboard
          </Breadcrumb.Link> */}
        </Breadcrumb>
        {/* END: Breadcrumb */}
        {/* BEGIN: Search */}
        <div className="relative mr-3 intro-x sm:mr-6">
          <div className="relative hidden sm:block">
            <FormInput
              type="text"
              className="border-transparent w-56 shadow-none rounded-full bg-slate-300/50 pr-8 transition-[width] duration-300 ease-in-out focus:border-transparent focus:w-72 dark:bg-darkmode-400/70"
              placeholder="Search..."
              onFocus={showSearchDropdown}
              onBlur={hideSearchDropdown}
            />
            <Lucide
              icon="Search"
              className="absolute inset-y-0 right-0 w-5 h-5 my-auto mr-3 text-slate-600 dark:text-slate-500"
            />
          </div>
          <a className="relative text-slate-600 sm:hidden" href="">
            <Lucide icon="Search" className="w-5 h-5 dark:text-slate-500" />
          </a>
          <Transition
            as={Fragment}
            show={searchDropdown}
            enter="transition-all ease-linear duration-150"
            enterFrom="mt-5 invisible opacity-0 translate-y-1"
            enterTo="mt-[3px] visible opacity-100 translate-y-0"
            leave="transition-all ease-linear duration-150"
            leaveFrom="mt-[3px] visible opacity-100 translate-y-0"
            leaveTo="mt-5 invisible opacity-0 translate-y-1"
          >
            <div className="absolute right-0 z-10 mt-[3px]">
              <div className="w-[450px] p-5 box">
                {/* <div className="mb-2 font-medium">Pages</div> */}
                <div className="mb-5">
                  <a href="/billing" className="flex items-center mt-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 text-primary/80">
                      <Lucide icon="CreditCard" className="w-4 h-4" />
                    </div>
                    <div className="ml-3">Billing</div>
                  </a>
                  <a href="/users" className="flex items-center mt-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 text-primary/80">
                      <Lucide icon="Users" className="w-4 h-4" />
                    </div>
                    <div className="ml-3">Profile</div>
                  </a>
                  {/*vehicles*/}
                  <a href="/vehicles" className="flex items-center mt-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 text-primary/80">
                      <Lucide icon="Truck" className="w-4 h-4" />
                    </div>
                    <div className="ml-3">Vehicles</div>
                  </a>
                </div>


              </div>
            </div>
          </Transition>
        </div>
        {/* END: Search  */}
        {/* BEGIN: Notifications */}
        <Popover className="mr-auto intro-x sm:mr-6">
          <Popover.Button
            className="
              relative text-slate-600 outline-none block
              before:content-[''] before:w-[8px] before:h-[8px] before:rounded-full before:absolute before:top-[-2px] before:right-0 before:bg-danger
            "
          >
            <Lucide icon="Bell" className="w-5 h-5 dark:text-slate-500" />
          </Popover.Button>
          <Popover.Panel className="w-[280px] sm:w-[350px] p-5 mt-2">
            <div className="mb-5 font-medium">Notifications</div>

          </Popover.Panel>
        </Popover>
        {/* END: Notifications  */}
        {/* BEGIN: Account Menu */}
        <Menu>
          <Menu.Button className="block w-8 h-8 overflow-hidden rounded-full shadow-lg image-fit zoom-in intro-x">
            <div className="justify-center flex items-center w-8 h-8 rounded-full bg-primary/20 dark:bg-darkmode-400">
              <Lucide icon="User" className="w-4 h-4 dark:text-slate-500" />
            </div>
          </Menu.Button>
          <Menu.Items className="w-56 mt-px text-white bg-primary">
            <Menu.Header className="font-normal">
              <div className="font-medium">{user?.username}</div>
              <div className="text-xs text-white/70 mt-0.5 dark:text-slate-500">
                {user?.role}
              </div>
            </Menu.Header>
            <Menu.Divider className="bg-white/[0.08]" />
            <Menu.Item className="hover:bg-white/5" onClick={() => navigate(`/profile/${user._id}`)}>
              <Lucide icon="User" className="w-4 h-4 mr-2" /> Profile
            </Menu.Item>
            {user?.role === "System Admin" && (
              <Menu.Item className="hover:bg-white/5" onClick={() => navigate("/users/add")}>
                <Lucide icon="Edit" className="w-4 h-4 mr-2" /> Add Account
              </Menu.Item>
            )}
            <Menu.Item className="hover:bg-white/5" onClick={() => navigate("/change-password")}>
              <Lucide icon="Lock" className="w-4 h-4 mr-2" /> Change Password
            </Menu.Item>
            <Menu.Item className="hover:bg-white/5">
              <Lucide icon="HelpCircle" className="w-4 h-4 mr-2" /> Help
            </Menu.Item>
            <Menu.Divider className="bg-white/[0.08]" />
            <Menu.Item className="hover:bg-white/5" onClick={() => {
              dispatch(logout());
              logoutService();
            }
            }>
              <Lucide icon="ToggleRight" className="w-4 h-4 mr-2" /> Logout
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
      {/* END: Top Bar */}
    </>
  );
}

export default Main;
