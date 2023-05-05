import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/slices/auth";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import CategoryIcon from "@mui/icons-material/Category";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import MenuIcon from "@mui/icons-material/Menu";
import CommuteIcon from "@mui/icons-material/Commute";
import FactoryIcon from "@mui/icons-material/Factory";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NewspaperIcon from '@mui/icons-material/Newspaper';
import GroupIcon from "@mui/icons-material/Group";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import { Button, IconButton } from "@mui/material";
import { FC, ReactNode, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useWindowSize } from "usehooks-ts";

const NavSide: FC<{ children: ReactNode }> = ({ children }) => {
  const { width, height } = useWindowSize();
  const [open, setOpen] = useState(width >= 768);
  useEffect(() => {
    setOpen(width >= 768);
  }, [width]);

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="overflow-hidden h-screen">
      <div className="flex relative h-full">
        <aside
          id="default-sidebar"
          className={`top-0 left-0 bottom-0 z-40 ${open ? "w-64" : "hidden"} ${
            width >= 768 ? "block" : "absolute"
          } flex-shrink-0`}
          aria-label="Sidebar"
        >
          <div className="flex flex-col h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 flex-grow">
              <li>
                <NavLink
                  to="/"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <DashboardIcon className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

                  <span className="ml-3">Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/companies"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <EmojiTransportationIcon className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Companies
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/category"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <CategoryIcon className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Category
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/users"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <GroupIcon className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

                  <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/make"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FactoryIcon className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

                  <span className="flex-1 ml-3 whitespace-nowrap">Make</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/gearBox"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <CarCrashIcon className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ml-3 whitespace-nowrap">GearBox</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/vehicleType"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <CommuteIcon className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

                  <span className="flex-1 ml-3 whitespace-nowrap">
                    VehicleType
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blog"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <NewspaperIcon className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

                  <span className="flex-1 ml-3 whitespace-nowrap">Blog</span>
                </NavLink>
              </li>
            </ul>
            <Button type="button" variant="contained" onClick={handleLogout}>
              Exit
            </Button>
          </div>
        </aside>
        <div className="flex-grow overflow-y-auto">
          <div
            className={`flex w-full bg-blue-700 ${
              open ? "ml-64" : "ml-0"
            } md:hidden`}
          >
            <IconButton
              aria-label="open"
              onClick={() => setOpen((prev) => !prev)}
            >
              <MenuIcon className="text-white" />
            </IconButton>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default NavSide;
