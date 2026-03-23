import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getArticleAPI } from './articleAPI';

const initialState = {
  articles: [],
  loading: false,
  error: null,
};

//get all articles

export const getallArticles = createAsyncThunk(
  'artcle/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const result = await getArticleAPI();
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getallArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getallArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.articles = action.payload.articles;
      })
      .addCase(getallArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = articleSlice.actions;
export default articleSlice.reducer;
