import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createAppointment,
  getAllAppointments,
  getAllAppointmentsAdmin,
  toggleAppointmentStatus,
} from './appointmentAPI';

export const createAppointmentAsync = createAsyncThunk(
  'appointment/createAppointment',
  async (appointmentData, { rejectWithValue, dispatch }) => {
    try {
      const response = await createAppointment(appointmentData);
      dispatch(getAllAppointmentsAsync());
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const getAllAppointmentsAsync = createAsyncThunk(
  'appointment/getAllAppointments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllAppointments();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const getAllAppointmentsAdminAsync = createAsyncThunk(
  'appointment/getAllAppointmentsAdmin',
  async ({ page, limit, sort, search, service }, { rejectWithValue }) => {
    try {
      const response = await getAllAppointmentsAdmin({
        page,
        limit,
        sort,
        search,
        service,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const toggleAppointmentStatusAsync = createAsyncThunk(
  'appointment/toggleAppointmentStatus',
  async ({ id, status }, { rejectWithValue, dispatch }) => {
    try {
      const response = await toggleAppointmentStatus({ id, status });
      dispatch(getAllAppointmentsAdminAsync());
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

const initialState = {
  appointment: [],
  adminAppointment: [],
  totalAppointments: 0,
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAppointmentAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAppointmentAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(createAppointmentAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getAllAppointmentsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAppointmentsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.appointment = action.payload.userAppointment;
      })
      .addCase(getAllAppointmentsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getAllAppointmentsAdminAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAppointmentsAdminAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.adminAppointment = action.payload.adminAppointment;
        state.totalAppointments = action.payload.totalAppointments;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getAllAppointmentsAdminAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(toggleAppointmentStatusAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleAppointmentStatusAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(toggleAppointmentStatusAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default appointmentSlice.reducer;
