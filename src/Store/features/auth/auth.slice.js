import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserAPI,
  loginUserAPI,
  getProfileAPI,
  updateProfileAPI,
} from './authAPI';

const initialState = {
  user: null,
  token: localStorage.getItem('workDo') || null,
  loading: false,
  error: null,
  isAuthChecked: false,
};

// REGISTER
export const registerUser = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const result = await registerUserAPI(data);
      console.log('API response :', result);
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

// LOGIN
export const loginUser = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const result = await loginUserAPI(data);

      // Save token
      localStorage.setItem('workDo', result.token);

      // Fetch profile after login
      await dispatch(getProfile());

      return result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg ||
          error.response?.data?.message ||
          'Login failed',
      );
    }
  },
);

// GET PROFILE
export const getProfile = createAsyncThunk(
  'auth/profile',
  async (_, { rejectWithValue }) => {
    try {
      return await getProfileAPI();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg ||
          error.response?.data?.message ||
          'Failed to fetch profile',
      );
    }
  },
);

// UPDATE PROFILE
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const result = await updateProfileAPI(data);

      //fetch getUser after update
      await dispatch(getProfile());

      return result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg ||
          error.response?.data?.message ||
          'Failed to update profile',
      );
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state, { payload }) => {
      state.user = null;
      state.token = null;
      state.isAuthChecked = false;
      localStorage.removeItem('workDo');
      payload.navigate('/account/login');
    },
  },
  extraReducers: (builder) => {
    builder

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // PROFILE
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        state.error = action.payload;
        state.isAuthChecked = false;
      })

      //update profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
