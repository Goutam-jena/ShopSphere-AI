import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/productTypes";
import { api } from "../../Config/Api";

interface ProductState {
  product: Product | null;
  products: Product[];
  paginatedProducts: any;
  totalPages: number;
  loading: boolean;
  error: string | null;
  searchProduct: Product[];
}

const initialState: ProductState = {
  product: null,
  products: [],
  paginatedProducts: null,
  totalPages: 1,
  loading: false,
  error: null,
  searchProduct: [],
};

const API_URL = "/products";

export const fetchProductById = createAsyncThunk<Product, string>(
  "products/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get<Product>(`${API_URL}/${productId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllProducts = createAsyncThunk<any, {
    category?: string; color?: string; minPrice?: number; maxPrice?: number;
    minDiscount?: number; sort?: string; pageNumber?: number;
}>("products/getAllProducts", async (params, { rejectWithValue }) => {
  try {
    const response = await api.get<any>(API_URL, {
      params: {
        
        categoryId: params.category, 
        color: params.color,
        minPrice: params.minPrice,
        maxPrice: params.maxPrice,
        minDiscount: params.minDiscount,
        sort: params.sort,
        pageNumber: params.pageNumber || 0,
      },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.product = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch product";
      })
      .addCase(getAllProducts.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getAllProducts.fulfilled, (state, action: PayloadAction<any>) => {
        state.paginatedProducts = action.payload;
        state.products = action.payload.content;
        state.totalPages = action.payload.totalPages;
        state.loading = false;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export default productSlice.reducer;