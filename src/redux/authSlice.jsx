import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi } from '../services/authService';

// Async thunk for login
export const login = createAsyncThunk(
    'auth/login',
    async (payload, { rejectWithValue }) => {
      try {
        const data = await loginApi(payload);
        localStorage.setItem('token', data.accessToken); // Save token to localStorage
        return data;
      } catch (error) {
        
        console.error('error1612199', error.message)
        return rejectWithValue(error.message);
      }
    }
  );


  const authSlice = createSlice({
    name: 'auth',
    initialState: {
      user: null,
      token: localStorage.getItem('token') || null,
      loading: false,
      error: null,
    },
    reducers: {
      logout: (state) => {
        console.log('logout call thay chhe')
        state.user = null;
        state.token = null;
        localStorage.removeItem('token'); // Remove token from localStorag
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(login.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            console.log('action', action)
          state.loading = false;
          state.user = action.payload.userData;
          state.token = action.payload.accessToken;
        })
        .addCase(login.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });

export const { logout } = authSlice.actions;
export const UserData=(state) => state.auth
export default authSlice.reducer;