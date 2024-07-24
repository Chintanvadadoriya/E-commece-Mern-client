import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/authSlice';
import adminReducer from './redux/adminSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    adminList:adminReducer
  },
});

export default store;
