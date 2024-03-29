import { useRoutes } from "react-router-dom";
import SideMenu from "../layouts/SideMenu";
import DashboardOverview from "../pages/DashboardOverview";
import Users from "../pages/Users";
import Login from "../pages/Login";
import ErrorPage from "../pages/ErrorPage";
import ChangePassword from "../pages/ChangePassword";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Profile from "../pages/Profile";
import AddUser from "../pages/AddUser";
import UserUpdate from "../pages/UserUpdate";
import UpdateProfile from "../pages/UpdateProfile";
import Roles from '../pages/Roles';
import AddRole from '../pages/AddRole';
import UpdateRole from '../pages/UpdateRole';
import Permissions from '../pages/Permissions';
import AddPermission from '../pages/AddPermission';

import AddVehicle from '../pages/AddVehicle';
import Vehicles from '../pages/Vehicles';
import UpdateVehicle from '../pages/UpdateVehicle';
import AddSTS from '../pages/AddSTS';
import AddSTSEntry from '../pages/AddSTSEntry';
import AddLandFill from '../pages/AddLandFill';
import AddLandFillEntry from '../pages/AddLandFillEntry';
import OptimizeRouteViewAndSelect from '../pages/OptimizeRouteViewAndSelect';
import BillingView from '../pages/BillingView';
import BillingPrint from '../pages/BillingPrint';
import FleetOptimizeViewAndDeploy from "../pages/FleetOptimizeViewAndDeploy";

//do basic imports
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";


function Router() {

  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
       if (location.pathname === "/forgot-password") {
        navigate("/forgot-password");
       } else if (location.pathname.includes("/reset-password/")) {
      }
       else {
        navigate("/login");
       }
    }
  }, [isAuthenticated]);


  const routes = [
    {
      path: "/",
      element: <SideMenu />,
      children: [
        {
          path: "/dashboard",
          element: <DashboardOverview />,
        },
        {
          path: '/add-user',
          element: <AddUser />
        },
        {
          path: '/roles',
          element: <Roles />
        },
        {
          path: '/add-role',
          element: <AddRole />
        },
        {
          path: '/roles/:id/edit',
          element: <UpdateRole />
        },
        {
          path: '/permissions',
          element: <Permissions />
        },
        {
          path: '/add-permission',
          element: <AddPermission />
        },
        {
          path: "/",
          element: <DashboardOverview />,
        },
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "profile/:id",
          element: <Profile />,
        },
        {
          path: "/users/add",
          element: <AddUser />,
        },
        {
          path: "/users/:userId/edit",
          element: <UserUpdate />,
        },
        {
          path: "update-profile",
          element: <UpdateProfile />,
        },
        {
          path: "change-password",
          element: <ChangePassword />,
        },
        // == Vehicle Management Start
        {
          path: "/vehicle/add",
          element: <AddVehicle />,
        },
        {
          path: "/vehicles",
          element: <Vehicles />,
        },
        {
          path: "vehicle/:id/edit",
          element: <UpdateVehicle />,
        },
        // == Vehicle Management End
        {
          path: "sts/add",
          element: <AddSTS />,
        },
        {
          path: "sts/add-entry",
          element: <AddSTSEntry />,
        },
        {
          path: "landfill/add",
          element: <AddLandFill />,
        },
        {
          path: "landfill/add-entry",
          element: <AddLandFillEntry />,
        },
        {
          path: "route/optimize",
          element: <OptimizeRouteViewAndSelect />,
        },
        {
          path: "billing",
          element: <BillingView />,
        },
        {
          path: "billing/:id",
          element: <BillingPrint />,
        },
        {
          path: "fleet/optimize",
          element: <FleetOptimizeViewAndDeploy />,
        }
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/error-page",
      element: <ErrorPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/reset-password/:token",
      element: <ResetPassword />,
    },
  ];

  return useRoutes(routes);
}

export default Router;
