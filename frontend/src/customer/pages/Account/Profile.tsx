import React from 'react';
import { Divider, Button } from '@mui/material';
import { Route, Routes, useNavigate, NavLink } from 'react-router-dom';
import Order from './Order';
import UserDetails from './UserDetails';
import Addresses from './Adresses';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { performLogout } from '../../../Redux Toolkit/Customer/AuthSlice';

const menu = [
    { name: "Orders", path: "/account/orders" },
    { name: "Profile", path: "/account/profile" },
    { name: "Addresses", path: "/account/addresses" },
    { name: "Logout", path: "/" }
];

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((store: any) => store);

    const handleLogout = () => {
        dispatch(performLogout());
        navigate("/");
    };

    return (
        <div className="px-5 lg:px-20 min-h-screen mt-10">
            <div>
                <h1 className="text-xl font-bold pb-5">{user.user?.fullName}</h1>
            </div>
            <Divider />
            <div className="grid grid-cols-1 lg:grid-cols-4 lg:min-h-[78vh]">
                <div className="col-span-1 lg:border-r lg:pr-5 py-5 h-full">
                    {menu.map((item) => (
                        item.name === "Logout" ? (
                            <Button key={item.name} onClick={handleLogout} fullWidth variant="text" sx={{ justifyContent: 'flex-start' }}>{item.name}</Button>
                        ) : (
                            <Button component={NavLink} to={item.path} key={item.name} fullWidth variant="text" sx={{ justifyContent: 'flex-start' }}>{item.name}</Button>
                        )
                    ))}
                </div>
                <div className="lg:col-span-3 lg:pl-5 py-5 space-y-5">
                    <Routes>
                        <Route path="/profile" element={<UserDetails />} />
                        <Route path="/orders" element={<Order />} />
                        <Route path="/addresses" element={<Addresses />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Profile;