import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../Config/Api';
import { Product } from '../../types/productTypes';

const API_URL = '/api/sellers/product';

export const fetchSellerProducts = createAsyncThunk<Product[], any>(
    'sellerProduct/fetchSellerProducts',
    async (jwt, { rejectWithValue }) => {
        try {
            const response = await api.get<Product[]>(API_URL, {
                headers: { Authorization: `Bearer ${jwt}` },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createProduct = createAsyncThunk<Product, { request: any; jwt: string | null }>(
    'sellerProduct/createProduct',
    async ({ request, jwt }, { rejectWithValue }) => {
        try {
            const response = await api.post<Product>(API_URL, request, {
                headers: { Authorization: `Bearer ${jwt}` },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateProduct = createAsyncThunk<Product, { productId: string; product: any }>(
    'sellerProduct/updateProduct',
    async ({ productId, product }, { rejectWithValue }) => {
        try {
            const response = await api.patch<Product>(`${API_URL}/${productId}`, product, {
                 headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteProduct = createAsyncThunk<string, string>(
    'sellerProduct/deleteProduct',
    async (productId, { rejectWithValue }) => {
        try {
            await api.delete(`${API_URL}/${productId}`,{
                headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
            });
            return productId;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

interface SellerProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
    productCreated: boolean;
}

const initialState: SellerProductState = {
    products: [],
    loading: false,
    error: null,
    productCreated: false,
};

const sellerProductSlice = createSlice({
    name: 'sellerProduct',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSellerProducts.pending, (state) => {
                state.loading = true; state.error = null;
            })
            .addCase(fetchSellerProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.products = action.payload; state.loading = false;
            })
            .addCase(fetchSellerProducts.rejected, (state, action) => {
                state.loading = false; state.error = action.error.message || 'Failed to fetch products';
            })
            .addCase(createProduct.pending, (state) => {
                state.loading = true; state.error = null; state.productCreated = false;
            })
            .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
                state.products.push(action.payload); state.loading = false; state.productCreated = true;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false; state.error = action.error.message || 'Failed to create product';
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true; state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
                const index = state.products.findIndex(product => product._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false; state.error = action.error.message || 'Failed to update product';
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true; state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
                state.products = state.products.filter(product => product._id !== action.payload);
                state.loading = false;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false; state.error = action.error.message || 'Failed to delete product';
            });
    },
});

export default sellerProductSlice.reducer;