import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addCommentAPI, deleteCommentAPI, getCommentsAPI } from './commentAPI';

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

//get all comments
export const getComments = createAsyncThunk(
  'comments/fetchAll',
  async (articleId, { rejectWithValue }) => {
    try {
      const result = await getCommentsAPI(articleId);
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

//add comment

export const addComment = createAsyncThunk(
  'comments/add',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const result = await addCommentAPI(data);
      dispatch(getComments(data.articleId));
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async ({ commentId, articleId }, { rejectWithValue, dispatch }) => {
    try {
      const result = await deleteCommentAPI({ commentId, articleId });
      dispatch(getComments(articleId));
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.comments = action.payload.comments;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const {} = commentSlice.actions;
export default commentSlice.reducer;
