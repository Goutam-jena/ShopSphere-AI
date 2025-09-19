// The correct version for Day 3
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../customer/pages/Home/Home.tsx';
import Products from '../customer/pages/Products/Products';
import ProductDetails from '../customer/pages/Products/ProductDetails/ProductDetails';

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Auth />} />
      <Route path='/products/:categoryId' element={<Products />} /> {/* Add this line */}
      <Route path='/product-details/:categoryId/:name/:productId' element={<ProductDetails />} />

   
    </Routes>
  );
}

export default CustomerRoutes;