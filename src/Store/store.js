import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/auth.slice';
import addressSlice from './features/address/address.slice';
import articleSlice from './features/article/article.slice';
import commentSlice from './features/comments/comment.slice';
import appointmentSlice from './features/appointment/appointment.slice';
import productSlice from './features/product/product.slice';
import cartSlice from './features/cart/cart.slice';
import wishListSlice from './features/wishlist/wishlist.slice';

const store = configureStore({
  reducer: {
    user: authSlice,
    address: addressSlice,
    article: articleSlice,
    comment: commentSlice,
    appointment: appointmentSlice,
    products: productSlice,
    cart: cartSlice,
    wishlist: wishListSlice,
  },
});
export default store;
