import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi } from '../services/authService';
import { decodeToken } from '../utils/helpers';

// Decode the token from local storage if it exists
const token = localStorage.getItem('token');
const decodedUser = token ? decodeToken(token) : null;

const initialState = {
  user: decodedUser ? {
    userType: decodedUser.userType,
    name: decodedUser.name,
    email: decodedUser.email,
  } : null,
  token: token || null,
  loading: false,
  error: null,
};

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await loginApi(payload);
      localStorage.setItem('token', data.accessToken); // Save token to localStorage
      return data;
    } catch (error) {
      console.error('Login error:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token'); // Remove token from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const token = action.payload.accessToken;
        const decoded = decodeToken(token);

        state.loading = false;
        state.user = {
          userType: decoded.userType,
          name: decoded.name,
          email: decoded.email,
        };
        state.token = token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export const UserData = (state) => state.auth;
export default authSlice.reducer;
