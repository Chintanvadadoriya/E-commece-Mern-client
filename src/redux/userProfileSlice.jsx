import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserProfileDataApi } from '../services/authService';

const initialState = {
  profile: null,
  loading: false,
  error: null,
};

// Async thunk for fetching user profile
export const fetchUserProfile = createAsyncThunk(
  'userProfile/fetchUserProfile',
  async (token, { getState, rejectWithValue }) => {
    try {
      const response = await getUserProfileDataApi(token);
      console.log('response fetchUserProfile', response);
      return response.data;
    } catch (error) {
      console.error('Fetch User Profile error:', error.message);
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
      });
  },
});

export const { clearUserProfile } = userProfileSlice.actions;
export const selectUserProfile = (state) => state?.userProfile?.profile;
export default userProfileSlice.reducer;
