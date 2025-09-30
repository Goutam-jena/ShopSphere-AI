import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import AuthSlice from "./Customer/AuthSlice";
import ProductSlice from "./Customer/ProductSlice";
import CartSlice from "./Customer/CartSlice";
import UserSlice from "./Customer/UserSlice";
import OrderSlice from "./Customer/OrderSlice";
import sellerAuthenticationSlice from "./Seller/sellerAuthenticationSlice";
import sellerSlice from "./Seller/sellerSlice";
import revenueChartSlice from "./Seller/revenueChartSlice";
import sellerOrderSlice from "./Seller/sellerOrderSlice";
import AdminCouponSlice from "./Admin/AdminCouponSlice";





const rootReducer = combineReducers({
  auth: AuthSlice,
  products: ProductSlice,
  cart: CartSlice,
  user: UserSlice,
  orders: OrderSlice,

  adminCoupons: AdminCouponSlice,




 
  sellerAuth: sellerAuthenticationSlice,
  sellerOrder: sellerOrderSlice,
  sellers: sellerSlice, 
  revenueChart: revenueChartSlice, 
  
  




});






const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});



export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;