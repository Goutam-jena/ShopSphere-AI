import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../Config/Api';
import { Seller } from '../../types/sellerTypes';

interface SellerAuthState {
  error: string | null;
  loading: boolean;
  sellerCreated: string | null;
}

const initialState: SellerAuthState = {
  error: null,
  loading: false,
  sellerCreated: ""
};

export const createSeller = createAsyncThunk<Seller, Seller>(
  'sellers/createSeller',
  async (seller: Seller, { rejectWithValue }) => {
    try {
      const response = await api.post<Seller>('/sellers', seller);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to create seller');
    }
  }
);

const sellerAuthSlice = createSlice({
    name: 'sellerAuth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(createSeller.pending, (state) => {
              state.loading = true;
              state.error = null;
          })
          .addCase(createSeller.fulfilled, (state) => {
              state.sellerCreated = "Seller registration successful!";
              state.loading = false;
          })
          .addCase(createSeller.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload as string;
          });
    },
});

export default sellerAuthSlice.reducer;