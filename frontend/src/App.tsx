import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import CustomerRoutes from "./routes/CustomerRoutes";
import { useAppDispatch, useAppSelector } from "./Redux Toolkit/Store";
import { fetchUserProfile } from "./Redux Toolkit/Customer/UserSlice";
import { fetchUserCart } from "./Redux Toolkit/Customer/CartSlice";
import SellerDashboard from "./seller/pages/SellerDashboard/SellerDashboard";
import AdminDashboard from "./admin/pages/Dashboard/Dashboard";
import BecomeSeller from "./customer/pages/BecomeSeller/BecomeSeller";
import { ThemeProvider } from "@mui/material";
import customeTheme from "./Theme/customeTheme";

function App() {
  const { auth, user } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(fetchUserProfile({ jwt, navigate: null }));
      dispatch(fetchUserCart(jwt));
    }
  }, [auth.jwt, dispatch]);

  const isAdmin = user.user?.role === "ROLE_ADMIN";
  const isSeller = user.user?.role === "ROLE_SELLER";
  
  const isSellerOrAdminRoute = location.pathname.startsWith("/seller") || location.pathname.startsWith("/admin");

  if (isSellerOrAdminRoute) {
    if (isSeller) {
      return <ThemeProvider theme={customeTheme}><SellerDashboard /></ThemeProvider>;
    }
    if (isAdmin) {
      return <ThemeProvider theme={customeTheme}><AdminDashboard /></ThemeProvider>;
    }
    
  }

  return (
    <ThemeProvider theme={customeTheme}>
      <Routes>
        <Route path="/become-seller" element={<BecomeSeller />} />
        
        <Route path="/*" element={<CustomerRoutes />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;