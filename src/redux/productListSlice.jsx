import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productListApi } from '../services/authService';
import { getAuthHeader } from '../constant';


export const fetchProductData = createAsyncThunk(
  'productDataList/fetchProductData',
  async ({ searchQuery, page, limit, token,minPrice,maxPrice }, { rejectWithValue }) => {
    try {

      const response = await productListApi({ searchQuery, page, limit, token:getAuthHeader(token),minPrice,maxPrice})
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productListSlice = createSlice({
  name: 'productList',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
    totalPage: 0,
    totalCount:0,
    currentCount:0
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        console.log('action ProductList', action)
        state.status = 'succeeded';
        state.data = action.payload.data; 
        state.totalPage = action.payload.totalPage; 
        state.totalCount = action.payload.totalCount; 
        state.currentCount = action.payload.currentCount; 

      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const ProductData=(state)=>state.productList

export default productListSlice.reducer;
