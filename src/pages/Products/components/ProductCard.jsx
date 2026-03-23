import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { addToCart } from '@/Store/features/cart/cart.slice';
import { useDispatch } from 'react-redux';
import {
  addToWishList,
  removeFromWishList,
} from '@/Store/features/wishlist/wishlist.slice';
import { PAGE_ICONS } from '@/lib/icons/pageicons';
import { useSelector } from 'react-redux';
import QuickView from './QuickView';

const ProductCard = ({ product }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const {
    _id,
    name,
    category,
    mainImage,
    price,
    description,
    rating = 4,
    discountPrice = '4800',
  } = product;

  const isWishlisted = wishlist.some((item) => item._id === _id);

  // ⭐ Render stars
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <PAGE_ICONS.STAR
            key={i}
            size={16}
            className="text-brand fill-brand"
          />,
        );
      } else {
        stars.push(
          <PAGE_ICONS.STAR key={i} size={16} className="text-brand" />,
        );
      }
    }
    return stars;
  };

  return (
    <div className="group border p-3 bg-white relative overflow-hidden">
      {/* Image */}
      <div className="relative overflow-hidden">
        <Link to={`/products/${_id}`}>
          <img
            src={mainImage}
            alt={name}
            className="w-full h-[260px] object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Overlay Icons */}
        <div className="absolute left-2 top-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
          <Button className="bg-[#d7fb00] p-2">
            <PAGE_ICONS.SHUFFLE size={16} />
          </Button>

          <Button className="bg-[#d7fb00] p-2" onClick={() => setOpen(true)}>
            <PAGE_ICONS.EYE size={16} />
          </Button>
        </div>

        <QuickView open={open} setOpen={setOpen} product={product} />

        {/* Countdown */}
        <div className="absolute top-1/2 left-0 right-0 bg-[#d7fb00] text-black text-center py-2 text-sm font-medium">
          ⏱ 10:08:06:03
        </div>
      </div>

      {/* Content */}
      <div className="mt-4 space-y-2">
        {/* Category */}
        <p className="text-sm text-gray-500 capitalize">{category}</p>

        {/* Title */}
        <Link to={`/products/${_id}`}>
          <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
        </Link>

        {/* Rating */}
        <div className="flex gap-1">{renderStars()}</div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold">
            Rs. {price.toLocaleString()} INR
          </span>

          {discountPrice && (
            <span className="text-sm text-gray-400 line-through">
              Rs. {discountPrice.toLocaleString()} INR
            </span>
          )}
        </div>

        {/* Button */}
        <Button
          variant="primary"
          onClick={() => dispatch(addToCart({ product, quantity: 1 }))}
          className="w-full mt-3 bg-[#d7fb00] text-black py-3 font-medium uppercase hover:bg-black hover:text-white transition"
        >
          ADD TO CART →
        </Button>
      </div>

      {/* Wishlist Button */}
      {isWishlisted ? (
        <button
          onClick={() => dispatch(removeFromWishList(_id))}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-sm hover:bg-gray-100 transition"
        >
          <PAGE_ICONS.HEART size={16} className="text-brand fill-brand" />
        </button>
      ) : (
        <button
          onClick={() => dispatch(addToWishList({ product }))}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-sm hover:bg-gray-100 transition"
        >
          <PAGE_ICONS.HEART size={16} className="text-gray-500" />
        </button>
      )}
    </div>
  );
};

export default ProductCard;
