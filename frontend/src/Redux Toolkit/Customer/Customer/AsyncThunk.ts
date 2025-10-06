import { createAsyncThunk } from '@reduxjs/toolkit';
import { HomeCategory, HomeData } from '../../../types/homeDataTypes';
import { api } from '../../../Config/Api';

// Async thunk to fetch home page data
export const fetchHomePageData = createAsyncThunk<HomeData>(
  'home/fetchHomePageData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/home');
      console.log("home page data fetched", response.data);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch home page data';
      return rejectWithValue(errorMessage);
    }
  }
);