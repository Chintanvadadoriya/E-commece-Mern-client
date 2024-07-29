import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuthHeader } from '../constant';
import { orderListApi } from '../services/authService';


export const fetchOrderList = createAsyncThunk(
    'orderDataList/fetchOrderList',
    async ({ page, limit, token }, { rejectWithValue }) => {
        try {

            const response = await orderListApi({ page, limit, token: getAuthHeader(token) })
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response);
        }
    }
);

const orderListSlice = createSlice({
    name: 'orderList',
    initialState: {
        orders: [],
        status: 'idle',
        error: null,
        totalPage: 0,
        totalOrders: 0,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrderList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrderList.fulfilled, (state, action) => {
                console.log('action order list', action)
                state.status = 'succeeded';
                state.orders = action.payload.orders;
                state.totalPage = action.payload.totalPage;
                state.totalOrders = action.payload.totalOrders;

            })
            .addCase(fetchOrderList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const OrderListData = (state) => state.orderList

export default orderListSlice.reducer;
