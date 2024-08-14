import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  allUnreadMessagesCountAdmin,
  getUserProfileDataApi,
} from '../services/authService';

const initialState = {
  profile: null,
  loading: false,
  error: null,
  unread_messages: 0,
};

// Async thunk for fetching user profile
export const fetchUserProfile = createAsyncThunk(
  'userProfile/fetchUserProfile',
  async (token, { getState, rejectWithValue }) => {
    try {
      const response = await getUserProfileDataApi(token);
      return response.data;
    } catch (error) {
      console.error('Fetch User Profile error:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const getAllUnreadMessages = createAsyncThunk(
  'userProfile/getAllUnreadMessages',
  async (token, { getState, rejectWithValue }) => {
    try {
      const response = await allUnreadMessagesCountAdmin(token);
      return response?.data;
    } catch (error) {
      console.error(
        'Fetch User Profile error getAllUnreadMessages:',
        error.message
      );
      return rejectWithValue(error.message);
    }
  }
);

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    clearUserProfile: (state) => {
      state.profile = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllUnreadMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUnreadMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.unread_messages = action?.payload[0]?.count || 0;
      })
      .addCase(getAllUnreadMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserProfile } = userProfileSlice.actions;
export const selectUserProfile = (state) => state?.userProfile?.profile;
export const unReadCountMessages = (state) => state?.userProfile;

export default userProfileSlice.reducer;
