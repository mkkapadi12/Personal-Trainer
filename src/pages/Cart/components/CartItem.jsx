import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '@/Store/features/cart/cart.slice';
import { Link } from 'react-router-dom';
import QuantityUpdate from './QuantityUpdate';
import { PAGE_ICONS } from '@/lib/icons/page.icons';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="relative grid md:grid-cols-5 gap-4 items-center border-b border-zinc-800/50 pb-8 md:pb-6 group">
      {/* Image & Name combined for grid-cols-2 */}
      <div className="col-span-2 flex items-center gap-4">
        <Link to={`/products/${item._id}`} className="shrink-0">
          <div className="w-24 h-24 md:w-20 md:h-20 bg-zinc-900 border border-zinc-800 rounded-sm p-2 flex items-center justify-center group-hover:border-zinc-700 transition-colors">
            <img
              src={item.mainImage}
              className="w-full h-full object-contain"
              alt={item.name}
            />
          </div>
        </Link>

        {/* Name */}
        <div className="flex-1">
          <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest mb-1.5">{item.brand}</p>
          <Link to={`/products/${item._id}`} className="hover:text-[#d7fb00] transition-colors">
            <p className="text-sm font-semibold text-zinc-100 line-clamp-2 md:line-clamp-none">{item.name}</p>
          </Link>
        </div>
      </div>

      {/* Price */}
      <p className="absolute md:relative top-2 right-2 md:top-auto md:right-auto text-sm font-medium text-zinc-400">
        ₹{item.price.toLocaleString()}
      </p>

      {/* Quantity */}
      <div className="mt-4 md:mt-0 flex justify-center w-fit md:w-full">
         <QuantityUpdate item={item} />
      </div>

      {/* Total & Action */}
      <div className="absolute md:relative bottom-6 right-0 md:bottom-0 flex items-center justify-end gap-4 md:gap-6">
        <p className="font-bold text-zinc-100 tabular-nums">
          ₹{(item.price * item.quantity).toLocaleString()}
        </p>

        <button 
          onClick={() => dispatch(removeFromCart(item._id))}
          className="text-zinc-600 hover:text-red-500 transition-colors"
          title="Remove item"
        >
          <PAGE_ICONS.TRASH size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
