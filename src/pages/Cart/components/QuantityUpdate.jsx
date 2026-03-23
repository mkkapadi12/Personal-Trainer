import React from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantity } from '@/Store/features/cart/cart.slice';
import { PAGE_ICONS } from '@/lib/icons/pageicons';

const QuantityUpdate = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <div className=" md:relative top-1/2 right-0 md:top-0 md:right-0 flex border w-fit">
      <button
        className="px-3"
        onClick={() =>
          dispatch(
            updateQuantity({ id: item._id, quantity: item.quantity - 1 }),
          )
        }
      >
        <PAGE_ICONS.MINUS className="size-5" />
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
        <PAGE_ICONS.PLUS className="size-5" />
      </button>
    </div>
  );
};

export default QuantityUpdate;
