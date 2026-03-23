import React from 'react';
import { useDispatch } from 'react-redux';
import { Trash } from 'lucide-react';
import {
  removeFromCart,
  updateQuantity,
} from '@/Store/features/cart/cart.slice';
import { Link } from 'react-router-dom';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="relative grid md:grid-cols-5 gap-4 items-center border-b pb-10 md:pb-6">
      {/* Image */}
      <Link to={`/products/${item._id}`}>
        <img
          src={item.mainImage}
          className="md:w-20 md:h-20 object-contain w-24 h-24"
        />
      </Link>

      {/* Name */}
      <div className="absolute md:relative top-2 right-2 md:top-0 md:right-0">
        <p className="text-sm font-semibold">{item.brand}</p>
        <p className="text-sm">{item.name}</p>
      </div>

      {/* Price */}
      <p className="absolute md:relative bottom-0 left-0">
        Rs. {item.price.toLocaleString()} INR
      </p>

      {/* Quantity */}
      <div className="absolute md:relative top-1/2 right-0 md:top-0 md:right-0 flex border w-fit">
        <button
          className="px-3"
          onClick={() =>
            dispatch(
              updateQuantity({ id: item._id, quantity: item.quantity - 1 }),
            )
          }
        >
          -
        </button>
        <span className="px-4">{item.quantity}</span>
        <button
          className="px-3"
          onClick={() =>
            dispatch(
              updateQuantity({ id: item._id, quantity: item.quantity + 1 }),
            )
          }
        >
          +
        </button>
      </div>

      {/* Total */}
      <div className="absolute md:relative bottom-2 right-2 md:top-0 md:right-0 flex items-center gap-3">
        <p className="font-medium">
          Rs. {(item.price * item.quantity).toLocaleString()} INR
        </p>

        <Trash
          size={18}
          className="text-red-500 cursor-pointer"
          onClick={() => dispatch(removeFromCart(item._id))}
        />
      </div>
    </div>
  );
};

export default CartItem;
