import React from 'react';
import { Route, Routes } from 'react-router-dom';
import OrderHistory from './Order';

const Profile = () => {
 
  return (
    <div>
      <h1 className='text-2xl font-bold p-5'>My Account</h1>
    
      <Routes>
        <Route path="orders" element={<OrderHistory />} />
      </Routes>
    </div>
  );
};

export default Profile;