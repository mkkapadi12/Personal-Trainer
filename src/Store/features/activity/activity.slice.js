import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRecentActivity } from './activity.api';

export const fetchRecentActivity = createAsyncThunk(
  'activity/fetchRecentActivity',
  async ({ limit }, { rejectWithValue }) => {
    try {
      const result = await getRecentActivity({ limit });
      return result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch recent activity',
      );
    }
  },
);

const activitySlice = createSlice({
  name: 'activity',
  initialState: {
    recentActivity: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentActivity.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecentActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.recentActivity = action.payload.data;
      })
      .addCase(fetchRecentActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default activitySlice.reducer;
