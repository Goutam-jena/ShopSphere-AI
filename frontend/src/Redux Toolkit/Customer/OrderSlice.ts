import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Order, OrderState } from "../../types/orderTypes";
import { Address } from "../../types/userTypes";
import { api } from "../../Config/Api";
import { ApiResponse } from "../../types/authTypes";

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  paymentOrder: null,
  loading: false,
  error: null,
  orderCanceled: false,
};

const API_URL = "/api/orders";

export const fetchUserOrderHistory = createAsyncThunk<Order[], string>(
  "orders/fetchUserOrderHistory",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get<Order[]>(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch order history");
    }
  }
);

export const createOrder = createAsyncThunk<any, { address: Address; jwt: string; navigate: any }>(
    "orders/createOrder",
    async ({ address, jwt, navigate }, { rejectWithValue }) => {
    try {
        const response = await api.post<any>(
            API_URL,
            { shippingAddress: address },
            { headers: { Authorization: `Bearer ${jwt}` } }
        );
        
        if (response.data.payment_link_url) {
            window.location.href = response.data.payment_link_url;
        }

        return response.data;
    } catch (error: any) {
        return rejectWithValue("Failed to create order");
    }
});

export const paymentSuccess = createAsyncThunk<ApiResponse, { paymentId: string; jwt: string; paymentLinkId: string }, { rejectValue: string }>(
    "orders/paymentSuccess",
    async ({ paymentId, jwt, paymentLinkId }, { rejectWithValue }) => {
    try {
        const response = await api.get(`/api/payment/success`, {
            headers: { Authorization: `Bearer ${jwt}` },
            params: { razorpay_payment_link_id: paymentLinkId, paymentId: paymentId },
        });
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data.message || "Failed to process payment");
    }
});

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrderHistory.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchUserOrderHistory.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createOrder.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<any>) => {
        state.paymentOrder = action.payload;
        state.loading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(paymentSuccess.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(paymentSuccess.fulfilled, (state) => { state.loading = false; })
      .addCase(paymentSuccess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;