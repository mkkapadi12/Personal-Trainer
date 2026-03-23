import { getWishListItem, setWishListItem } from '@/lib/utils';
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';

const initialState = {
  wishlist: getWishListItem(),
};

const wishListSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      const token = localStorage.getItem('workDo');
      if (!token) {
        toast.error('Please login to add items to wishlist');
        return;
      }
      const { product } = action.payload;

      const existingItem = state.wishlist.find(
        (item) => item._id === product._id,
      );

      if (existingItem) {
        toast.info('Item already in wishlist');
        return;
      }

      state.wishlist.push({ ...product });
      toast.success('Item added to wishlist');

      // 🔥 sync full wishlist
      setWishListItem(state.wishlist);
    },

    removeFromWishList: (state, action) => {
      state.wishlist = state.wishlist.filter((i) => i._id !== action.payload);
      toast.success('Item removed from wishlist');
      setWishListItem(state.wishlist);
    },

    clearWishList: (state) => {
      state.wishlist = [];
      setWishListItem([]);
    },
  },
});

export const { addToWishList, removeFromWishList, clearWishList } =
  wishListSlice.actions;
export default wishListSlice.reducer;
