import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createAppointment, getAllAppointments } from './appointmentAPI';

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

const initialState = {
  appointment: [],
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
      });
  },
});

export default appointmentSlice.reducer;
