import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createAddressAPI,
  deleteAddressAPI,
  editAddressAPI,
  getAddressesAPI,
} from './addressAPI';
import { toast } from 'sonner';
const initialState = {
  addresses: [],
  loading: false,
  error: null,
};

//Add Address

export const createAddress = createAsyncThunk(
  'address/create',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const result = await createAddressAPI(data);
      dispatch(fetchAddresses());
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

//get all addresses for user

export const fetchAddresses = createAsyncThunk(
  'address/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const result = await getAddressesAPI();
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

//delete address

export const deleteAddress = createAsyncThunk(
  'address/delete',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const result = await deleteAddressAPI(id);
      dispatch(fetchAddresses());
      toast.success(result.msg || 'Address deleted successfully!');
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

//edit address
export const editAddress = createAsyncThunk(
  'address/edit',
  async ({ id, data }, { rejectWithValue, dispatch }) => {
    try {
      const result = await editAddressAPI(id, data);
      dispatch(fetchAddresses());
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    clearAddresses: (state) => {
      state.addresses = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload.addresses;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(editAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { clearAddresses } = addressSlice.actions;
export default addressSlice.reducer;
