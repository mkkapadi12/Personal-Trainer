import { getCartItem, setCartItem } from '@/lib/utils';
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';

const initialState = {
  cart: getCartItem(), // load from localStorage
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const token = localStorage.getItem('workDo');
      if (!token) {
        toast.error('Please login to add items to cart');
        return;
      }
      const { product, quantity } = action.payload;

      const existingItem = state.cart.find((item) => item._id === product._id);

      if (existingItem) {
        if (existingItem.quantity + quantity > existingItem.stock) {
          toast.error('Out of stock');
          return;
        }
        existingItem.quantity += quantity;
        toast.info('Item quantity updated');
      } else {
        if (quantity > product.stock) {
          toast.error('Out of stock');
          return;
        }
        state.cart.push({ ...product, quantity });
        toast.success('Item added to cart');
      }

      // 🔥 sync full cart
      setCartItem(state.cart);
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((i) => i._id !== action.payload);
      setCartItem(state.cart);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cart.find((i) => i._id === id);
      if (item) {
        if (quantity > item.stock) {
          toast.error('Out of stock');
          return;
        }
        item.quantity = quantity;
        setCartItem(state.cart);
      }
      if (quantity === 0) {
        state.cart = state.cart.filter((i) => i._id !== id);
        setCartItem(state.cart);
      }
    },

    clearCart: (state) => {
      state.cart = [];
      setCartItem([]);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
