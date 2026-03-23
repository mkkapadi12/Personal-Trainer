import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { addToCart } from '@/Store/features/cart/cart.slice';
import { useDispatch } from 'react-redux';
import { removeFromWishList } from '@/Store/features/wishlist/wishlist.slice';

const WishlistItem = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-4 py-6 border-b">
      {/* Product Image */}
      <div className="flex justify-center md:justify-start">
        <img
          src={item.mainImage}
          alt={item.name}
          className="w-[75%] h-[75%] object-contain"
        />
      </div>

      {/* Details */}
      <div className="text-left">
        <p className="text-sm text-gray-500">{item.category}</p>
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-sm mt-1">${item.price}</p>
      </div>

      {/* Add to Cart */}
      <div className="flex justify-center">
        <Button
          onClick={() => dispatch(addToCart({ product: item, quantity: 1 }))}
          className="bg-black text-white px-6 py-2 text-sm font-medium hover:opacity-80 transition"
        >
          ADD TO CART
        </Button>
      </div>

      {/* Delete */}
      <div className="flex justify-start sm:justify-center">
        <button onClick={() => dispatch(removeFromWishList(item._id))}>
          <Trash2 className="text-red-500 cursor-pointer hover:scale-110 transition" />
        </button>
      </div>
    </div>
  );
};

export default WishlistItem;
