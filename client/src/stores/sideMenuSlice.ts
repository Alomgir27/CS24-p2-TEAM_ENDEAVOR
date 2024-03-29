import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { icons } from '../base-components/Lucide';


export interface Menu {
  icon: keyof typeof icons;
  title: string;
  pathname?: string;
  subMenu?: Menu[];
  ignore?: boolean;
}

export interface SideMenuState {
  menu: Array<Menu | 'divider'>;
}

const initialState: SideMenuState = {
  menu: [
    {
      icon: 'Home',
      title: 'Dashboard',
      pathname: '/', // this is the path to the dashboard
    },
    {
      icon: 'Truck',
      title: 'Vehicles',
      subMenu: [
        {
          pathname: '/vehicle/add',
          title: 'Add Vehicle',
          icon: 'Plus',
        },
        {
          pathname: '/vehicles',
          title: 'Vehicles',
          icon: 'Truck',
        },
      ],
      title: 'Users Management',
      subMenu: [{
        icon: "Users",
        pathname: "/users",
        title: "Users",
      },
      {
        icon: "UserPlus",
        pathname: "/users/add",
        title: "Add User",
      },
      {
        pathname: '/update-profile',
        title: 'Update profile',
        icon: 'UserCheck',
      },
      {
        icon: "Lock",
        pathname: "/change-password",
        title: "Change Password",
      },
      {
        pathname: '/roles',
        title: 'Roles',
        icon: 'UserCheck',
      },
      {
        pathname: '/add-role',
        title: 'Add role',
        icon: 'UserPlus',
      },
      {
        pathname: '/permissions',
        title: 'Permissions',
        icon: 'Shield',
      },
      {
        pathname: '/add-permission',
        title: 'Add Permission',
        icon: 'ShieldCheck',
      },
      ],
    },
    {
      pathname: '/vehicle/add',
      title: 'Add Vehicle',
      icon: 'Truck',
    },
    {
      pathname: '/sts/add',
      title: 'Add STS',
      icon: 'Grid',
    },
    {
      pathname: '/sts/add-entry',
      title: 'Add STS Entry',
      icon: 'Plus',
    },
    {
      pathname: 'landfill/add',
      title: 'Add Landfill',
      icon: 'MapPin',
    },
    {
      pathname: '/landfill/add-entry',
      title: 'Add Landfill Entry',
      icon: 'Plus',
    },
    {
      pathname: 'route/optimize',
      title: 'Optimize Route',
      icon: 'Map',
    },
    {
      pathname: '/billing',
      title: 'Billing',
      icon: 'DollarSign',
    },
    {
      pathname: 'fleet/optimize',
      title: 'Fleet Optimize and Vehicle Deployment',
      icon: 'Framer',
    }
  ],
}

export const sideMenuSlice = createSlice({
  name: 'sideMenu',
  initialState,
  reducers: {},
});

export const selectSideMenu = (state: RootState) => state.sideMenu.menu;

export default sideMenuSlice.reducer;
