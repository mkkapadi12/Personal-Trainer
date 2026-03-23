import React from 'react';
import CartItem from './CartItem';

const CartTable = ({ cart }) => {
  return (
    <div>
      {/* Header */}
      <div className="hidden md:grid grid-cols-5 text-sm font-semibold border-b pb-3">
        <p>IMAGE</p>
        <p>NAME</p>
        <p>PRICE</p>
        <p className="text-center">QUANTITY</p>
        <p className="text-end">TOTAL</p>
      </div>

      {/* Items */}
      <div className="space-y-10 md:space-y-6 mt-6">
        {cart.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CartTable;
