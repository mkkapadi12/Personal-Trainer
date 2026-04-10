import React from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantity } from '@/Store/features/cart/cart.slice';
import { PAGE_ICONS } from '@/lib/icons/page.icons';

const QuantityUpdate = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex bg-zinc-900 border border-zinc-800 rounded-sm h-10 w-32 shrink-0">
      <button
        className="flex-1 flex justify-center items-center text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors disabled:opacity-50"
        onClick={() =>
          dispatch(
            updateQuantity({ id: item._id, quantity: item.quantity - 1 }),
          )
        }
        disabled={item.quantity <= 1}
      >
        <PAGE_ICONS.MINUS size={14} />
      </button>
      <span className="w-10 flex justify-center items-center text-sm font-medium text-zinc-100 border-x border-zinc-800 tabular-nums">
        {item.quantity}
      </span>
      <button
        className="flex-1 flex justify-center items-center text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
        onClick={() =>
          dispatch(
            updateQuantity({ id: item._id, quantity: item.quantity + 1 }),
          )
        }
      >
        <PAGE_ICONS.PLUS size={14} />
      </button>
    </div>
  );
};

export default QuantityUpdate;
