import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../Redux Toolkit/Store';
import { performLogout } from '../../../Redux Toolkit/Customer/AuthSlice';

const DrawerList = ({ menu, menu2, toggleDrawer }: any) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(performLogout());
        navigate("/");
    };

    return (
        <div className='h-full flex flex-col justify-between'>
            <List>
                {menu.map((item: any) => (
                    <ListItem key={item.name} disablePadding onClick={toggleDrawer}>
                        <ListItemButton component={NavLink} to={item.path} end={item.end}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <List>
                <Divider />
                {menu2.map((item: any) => (
                    <ListItem key={item.name} disablePadding onClick={toggleDrawer}>
                         {item.name === "Logout" ? (
                            <ListItemButton onClick={handleLogout}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        ) : (
                            <ListItemButton component={NavLink} to={item.path} end={item.end}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        )}
                    </ListItem>
                ))}
            </List>
        </div>
    );
};
export default DrawerList;