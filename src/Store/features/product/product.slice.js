import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProductsAPI, getProductByIdAPI } from './productAPI';

const initialState = {
  products: [],
  singleProduct: null,
  loading: false,
  totalProducts: null,
  currentPage: null,
  totalPages: null,
  error: null,
};

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async ({ category, sort = 'latest', page = 1 }, { rejectWithValue }) => {
    try {
      const result = await getProductsAPI(category, sort, page);
      return result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Something went wrong',
      );
    }
  },
);

export const getProductById = createAsyncThunk(
  'products/getProductById',
  async (id, { rejectWithValue }) => {
    try {
      const result = await getProductByIdAPI(id);
      return result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Something went wrong',
      );
    }
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.totalProducts = action.payload?.totalProducts;
        state.currentPage = action.payload?.currentPage;
        state.totalPages = action.payload?.totalPages;
        state.products = action.payload?.products;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload.product;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = productSlice.actions;
export default productSlice.reducer;
