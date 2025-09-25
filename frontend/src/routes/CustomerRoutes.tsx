import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../customer/pages/Home/Home.tsx';
import Auth from '../customer/pages/Auth/Auth.tsx';
import Products from '../customer/pages/Products/Products.tsx';
import ProductDetails from '../customer/pages/Products/ProductDetails/ProductDetails.tsx';
import Cart from '../customer/pages/Cart/Cart.tsx'; // Added this line
import AddressPage from '../customer/pages/Checkout/AddressPage';
import Profile from '../customer/pages/Account/Profile';


const CustomerRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Auth />} />
      <Route path='/products/:categoryId' element={<Products />} />
      <Route path='/product-details/:categoryId/:name/:productId' element={<ProductDetails />} />
      <Route path='/cart' element={<Cart />} /> 

      <Route path='/checkout/address' element={<AddressPage />} /> 
      <Route path='/account/*' element={<Profile />} /> 

    </Routes>
  );
}

export default CustomerRoutes;