import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchHomePageData } from './AsyncThunk';
import { HomeData } from '../../../types/homeDataTypes';

interface HomeState {
  homePageData: HomeData | null;
  loading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  homePageData: null,
  loading: false,
  error: null,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomePageData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomePageData.fulfilled, (state, action: PayloadAction<HomeData>) => {
        state.loading = false;
        state.homePageData = action.payload;
      })
      .addCase(fetchHomePageData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to load home page data';
      });
  },
});

export default homeSlice.reducer;