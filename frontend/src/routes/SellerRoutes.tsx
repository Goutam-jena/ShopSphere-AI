import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../seller/pages/SellerDashboard/HomePage'
import Products from '../seller/pages/Products/Products'
import AddProductForm from '../seller/pages/Products/AddProductForm'

const SellerRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/products' element={<Products />} />
      <Route path='/add-product' element={<AddProductForm />} />
    </Routes>
  )
}
export default SellerRoutes;