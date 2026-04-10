import React from 'react';
import CartItem from './CartItem';

const CartTable = ({ cart }) => {
  return (
    <div>
      {/* Header */}
      <div className="hidden md:grid grid-cols-5 text-xs text-zinc-500 font-semibold border-b border-zinc-800 pb-4 tracking-wider">
        <p className="col-span-2">PRODUCT</p>
        <p>PRICE</p>
        <p className="text-center">QUANTITY</p>
        <p className="text-end">TOTAL</p>
      </div>

      {/* Items */}
      <div className="space-y-6 mt-6">
        {cart.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CartTable;
