import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  adminLoginAPI,
  adminProfileAPI,
  adminRegisterAPI,
  getAllUsersAPI,
  updateAdminProfileAPI,
} from './admin.auth.api';

const initialState = {
  admin: null,
  users: [],
  totalUsers: 0,
  totalPages: 1,
  currentPage: 1,
  token: localStorage.getItem('workDoAdminToken') || null,
  loading: false,
  error: null,
  isAdminChecked: false,
};

// REGISTER
export const registerAdmin = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const result = await adminRegisterAPI(data);
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

// LOGIN
export const loginAdmin = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const result = await adminLoginAPI(data);

      // Save token
      localStorage.setItem('workDoAdminToken', result.token);

      // Fetch profile after login
      await dispatch(adminProfile());

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'login failed!');
    }
  },
);

// GET PROFILE
export const adminProfile = createAsyncThunk(
  'auth/profile',
  async (_, { rejectWithValue }) => {
    try {
      return await adminProfileAPI();
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
export const updateAdminProfile = createAsyncThunk(
  'auth/updateProfile',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const result = await updateAdminProfileAPI(data);

      //fetch getUser after update
      await dispatch(adminProfile());

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

// GET ALL USERS
export const getAllUsers = createAsyncThunk(
  'auth/getAllUsers',
  async ({ page, limit, search, sort }, { rejectWithValue }) => {
    try {
      return await getAllUsersAPI({ page, limit, search, sort });
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg ||
          error.response?.data?.message ||
          'Failed to fetch users',
      );
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.admin = null;
      state.token = null;
      state.isAdminChecked = false;
      localStorage.removeItem('workDoAdminToken');
    },
  },
  extraReducers: (builder) => {
    builder

      // REGISTER
      .addCase(registerAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.token = action.payload.token;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // PROFILE
      .addCase(adminProfile.fulfilled, (state, action) => {
        state.admin = action.payload.admin;
        state.isAdminChecked = true;
      })
      .addCase(adminProfile.rejected, (state, action) => {
        state.admin = null;
        state.token = null;
        state.error = action.payload;
        state.isAdminChecked = false;
      })

      //update profile
      .addCase(updateAdminProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAdminProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload.admin;
      })
      .addCase(updateAdminProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //get all users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.totalUsers = action.payload.totalUsers;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
