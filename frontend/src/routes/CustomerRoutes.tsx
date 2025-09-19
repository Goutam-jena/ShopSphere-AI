// The correct version for Day 3
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../customer/pages/Home/Home.tsx';

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
   
    </Routes>
  );
}

export default CustomerRoutes;