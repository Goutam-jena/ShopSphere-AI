import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SellersTable from '../admin/pages/sellers/SellersTable';
import Coupon from '../admin/pages/Coupon/Coupon';
import CreateCouponForm from '../admin/pages/Coupon/CreateCouponForm';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<SellersTable />} />
      <Route path='/coupon' element={<Coupon />} />
      <Route path='/add-coupon' element={<CreateCouponForm />} />
    </Routes>
  );
}
export default AdminRoutes;