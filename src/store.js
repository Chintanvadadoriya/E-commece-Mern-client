import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/authSlice';
import adminReducer from './redux/adminSlice';
import productListReducer from './redux/productListSlice';
import orderListListReducer from './redux/orderListSlice';
import userProfileReducer from './redux/userProfileSlice';





const store = configureStore({
  reducer: {
    auth: authReducer,
    adminList: adminReducer,
    productList: productListReducer,
    orderList: orderListListReducer,
    userProfile:userProfileReducer
  },
});

export default store;
