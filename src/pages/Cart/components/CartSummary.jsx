import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CartSummary = ({ cart }) => {
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="border p-6 space-y-4">
      <textarea
        placeholder="Order special instructions"
        className="w-full border p-3 h-28"
        id="order-special-instructions"
        name="order-special-instructions"
      />

      <div className="text-center space-y-3">
        <p className="text-lg font-semibold">Subtotal</p>

        <p className="text-2xl font-bold">
          Rs. {subtotal.toLocaleString()} INR
        </p>

        <p className="text-sm text-gray-500">
          Taxes and shipping calculated at checkout
        </p>
        <Link to="/account/checkout">
          <Button className="w-full bg-[#d7fb00] text-black">
            PROCEED TO CHECKOUT
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
