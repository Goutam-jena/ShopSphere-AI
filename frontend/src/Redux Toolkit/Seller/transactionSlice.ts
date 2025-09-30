import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Transaction } from '../../types/Transaction';
import { api } from '../../Config/Api';

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
};

export const fetchTransactionsBySeller = createAsyncThunk<Transaction[], string>(
    'transactions/fetchTransactionsBySeller',
    async (jwt, { rejectWithValue }) => {
        try {
            const response = await api.get('/api/transactions/seller', {
                headers: { Authorization: `Bearer ${jwt}` },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue('Failed to fetch transactions');
        }
    }
);

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactionsBySeller.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTransactionsBySeller.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload;
            })
            .addCase(fetchTransactionsBySeller.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default transactionSlice.reducer;