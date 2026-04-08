import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createOrderAPI,
  getAdminOrders,
  getUserOrders,
  patchOrderStatus,
} from './order.api';

const initialState = {
  adminOrders: [],
  userOrders: [],
  loading: false,
  error: null,
  totalOrders: null,
  currentPage: null,
  totalPages: null,
};

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const result = await createOrderAPI(orderData);
      return result;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const fetchAdminOrders = createAsyncThunk(
  'orders/fetchAdminOrders',
  async (
    { status, search, sort = 'latest', page = 1, limit = 5 },
    { rejectWithValue },
  ) => {
    try {
      const result = await getAdminOrders(status, search, sort, page, limit);
      return result;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const result = await getUserOrders();
      return result;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const result = await patchOrderStatus(id, status);
      return result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update status',
      );
    }
  },
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.adminOrders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchAdminOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.adminOrders = [];
        state.totalOrders = 0;
        state.currentPage = 1;
        state.totalPages = 0;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload.orders;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updated = action.payload.order;
        const index = state.adminOrders.findIndex((o) => o._id === updated._id);
        if (index !== -1) {
          state.adminOrders[index].status = updated.status;
        }
      });
  },
});

export default orderSlice.reducer;
