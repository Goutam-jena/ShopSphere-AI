

import * as React from "react";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../Redux Toolkit/Store";
import { performLogout } from "../../../Redux Toolkit/Customer/AuthSlice";

export interface Menu {
  name: string;
  path: string;
  icon: React.ReactElement<any>;
  activeIcon: React.ReactElement<any>;
  end?: boolean;
}

interface DrawerListProps {
  toggleDrawer?: any;
  menu: Menu[];
  menu2: Menu[];
}

const DrawerList = ({ toggleDrawer, menu = [], menu2 = [] }: DrawerListProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(performLogout());
    navigate("/");
  };

  const renderMenuItems = (items: Menu[]) => {
    return items.map((item) => {
      if (item.name === "Logout") {
        return (
          <div key={item.name} onClick={handleLogout} className="pr-9 cursor-pointer">
            <div className="text-primary-color flex items-center px-5 py-3 rounded-r-full hover:bg-gray-100">
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </div>
          </div>
        );
      }
      return (
        <NavLink
          to={item.path}
          key={item.name}
          end={item.end !== false}
          onClick={toggleDrawer ? toggleDrawer(false) : undefined}
          style={{ textDecoration: 'none' }}
          className={({ isActive }) =>
            `flex items-center px-5 py-3 rounded-r-full cursor-pointer pr-9 ${
              isActive 
                ? 'active-sidebar-link' // Style for the ACTIVE link
                : 'text-primary-color hover:bg-gray-100' // Style for INACTIVE links
            }`
          }
        >
          {({ isActive }) => (
            <>
              <ListItemIcon>{isActive ? item.activeIcon : item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </>
          )}
        </NavLink>
      );
    });
  };

  return (
    <div className="h-full">
      <div className="flex flex-col justify-between h-full w-[300px] border-r py-5">
        <div>
          <div className="space-y-2">{renderMenuItems(menu)}</div>
        </div>
        <div className="space-y-4">
          <Divider />
          <div className="space-y-2">{renderMenuItems(menu2)}</div>
        </div>
      </div>
    </div>
  );
};

export default DrawerList;