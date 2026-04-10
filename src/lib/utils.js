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
  return date.toLocaleDateString('en-IN', options);
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

export const timeAgo = (dateStr) => {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60) return `${Math.floor(diff)}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
  if (diff < 2592000) return `${Math.floor(diff / 604800)} weeks ago`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)} months ago`;
  return `${Math.floor(diff / 31536000)} years ago`;
};
