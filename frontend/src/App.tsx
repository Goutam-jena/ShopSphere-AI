// import React, { useEffect } from "react";
// import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
// import CustomerRoutes from "./routes/CustomerRoutes";
// import { useAppDispatch, useAppSelector } from "./Redux Toolkit/Store";
// import { fetchUserProfile } from "./Redux Toolkit/Customer/UserSlice";
// import { fetchUserCart } from "./Redux Toolkit/Customer/CartSlice";
// import SellerDashboard from "./seller/pages/SellerDashboard/SellerDashboard";
// import AdminDashboard from "./admin/pages/Dashboard/Dashboard";
// import BecomeSeller from "./customer/pages/BecomeSeller/BecomeSeller";
// import { ThemeProvider } from "@mui/material";
// import customeTheme from "./Theme/customeTheme";

// function App() {
//   const { auth, user } = useAppSelector((store) => store);
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const jwt = localStorage.getItem("jwt");
//     if (jwt) {
//       dispatch(fetchUserProfile({ jwt, navigate: null }));
//       dispatch(fetchUserCart(jwt));
//     }
//   }, [auth.jwt, dispatch]);

//   const isAdmin = user.user?.role === "ROLE_ADMIN";
//   const isSeller = user.user?.role === "ROLE_SELLER";
  
//   const isSellerOrAdminRoute = location.pathname.startsWith("/seller") || location.pathname.startsWith("/admin");

//   if (isSellerOrAdminRoute) {
//     if (isSeller) {
//       return <ThemeProvider theme={customeTheme}><SellerDashboard /></ThemeProvider>;
//     }
//     if (isAdmin) {
//       return <ThemeProvider theme={customeTheme}><AdminDashboard /></ThemeProvider>;
//     }
    
//   }

//   return (
//     <ThemeProvider theme={customeTheme}>
//       <Routes>
//         <Route path="/become-seller" element={<BecomeSeller />} />
        
//         <Route path="/*" element={<CustomerRoutes />} />
//       </Routes>
//     </ThemeProvider>
//   );
// }

// export default App;















import './App.css';
import { ThemeProvider } from '@emotion/react';
import customeTheme from './Theme/customeTheme';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'; // --- ADDED useLocation ---
import CustomerRoutes from './routes/CustomerRoutes';
import SellerDashboard from './seller/pages/SellerDashboard/SellerDashboard';
import AdminDashboard from './admin/pages/Dashboard/Dashboard';
import SellerAccountVerification from './seller/pages/SellerAccountVerification';
import SellerAccountVerified from './seller/pages/SellerAccountVerified';
import BecomeSeller from './customer/pages/BecomeSeller/BecomeSeller';
import AdminAuth from './admin/pages/Auth/AdminAuth';
import { useAppDispatch, useAppSelector } from './Redux Toolkit/Store';
import { useEffect } from 'react';
import { fetchSellerProfile } from './Redux Toolkit/Seller/sellerSlice';
import { fetchUserProfile } from './Redux Toolkit/Customer/UserSlice';
import { createHomeCategories } from './Redux Toolkit/Customer/Customer/AsyncThunk';
import { homeCategories } from './data/homeCategories';

function App() {
  const dispatch = useAppDispatch();
  const { auth, sellerAuth, sellers, user } = useAppSelector(store => store);
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
    
      dispatch(fetchUserProfile({ jwt }));
      
      dispatch(fetchSellerProfile(jwt || sellerAuth.jwt));
    }
  }, [auth.jwt, sellerAuth.jwt, dispatch]);

  useEffect(() => {
    dispatch(createHomeCategories(homeCategories));
  }, [dispatch]);


  useEffect(() => {
    if (user.user && location.pathname.startsWith("/login")) {
  
      navigate("/");
    }
  }, [user.user, location, navigate]);

  return (
    <ThemeProvider theme={customeTheme}>
      <div className='App' >
        {/* --- KEPT YOUR ORIGINAL ROUTES --- */}
        <Routes>
          {sellers.profile && <Route path='/seller/*' element={<SellerDashboard />} />}
          {user.user?.role === "ROLE_ADMIN" && <Route path='/admin/*' element={<AdminDashboard />} />}
          <Route path='/verify-seller/:otp' element={<SellerAccountVerification />} />
          <Route path='/seller-account-verified' element={<SellerAccountVerified />} />
          <Route path='/become-seller' element={<BecomeSeller />} />
          <Route path='/admin-login' element={<AdminAuth />} />
          
          <Route path='/*' element={<CustomerRoutes />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;

































