import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString, format = 'long') => {
  const date = new Date(dateString);
  const options = {
    ...(format === 'long' && {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    ...(format === 'dd-mm-yyyy' && {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
  };
  return date.toLocaleDateString('en-US', options);
};
export const setCartItem = (cart) => {
  localStorage.setItem('workDoCart', JSON.stringify(cart));
};

export const getCartItem = () => {
  return JSON.parse(localStorage.getItem('workDoCart')) || [];
};

export const setWishListItem = (wishlist) => {
  localStorage.setItem('workDoWishList', JSON.stringify(wishlist));
};

export const getWishListItem = () => {
  return JSON.parse(localStorage.getItem('workDoWishList')) || [];
};
