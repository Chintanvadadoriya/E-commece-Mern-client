import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/authSlice';
import adminReducer from './redux/adminSlice';
import productListReducer from './redux/productListSlice';



const store = configureStore({
  reducer: {
    auth: authReducer,
    adminList:adminReducer,
    productList:productListReducer
  },
});

export default store;
