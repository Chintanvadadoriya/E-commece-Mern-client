import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api'; // Adjust the path to your API setup
import { adminListApi } from '../services/authService';
import { getAuthHeader } from '../constant';

// Thunk to fetch admin data
export const fetchAdmins = createAsyncThunk(
  'adminList/fetchAdmins',
  async ({ searchQuery, page, limit, name, token }, { rejectWithValue }) => {
    try {

      const response = await adminListApi({ searchQuery, page, limit, name, token:getAuthHeader(token)})
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: 'adminList',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
    totalPages: 0,
    totalCount:0,
    currentCount:0
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmins.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        console.log('action', action)
        state.status = 'succeeded';
        state.data = action.payload.data; 
        state.totalPages = action.payload.totalPage; 
        state.totalCount = action.payload.totalCount; 
        state.currentCount = action.payload.currentCount; 

      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const AdminDetails=(state)=>state.adminList

export default adminSlice.reducer;
