import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CartSummary = ({ cart }) => {
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 lg:p-8 rounded-sm space-y-6 sticky top-6">
      <div className="space-y-3">
        <label htmlFor="order-special-instructions" className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Order Instructions
        </label>
        <textarea
          placeholder="Add any special instructions for your order..."
          className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#d7fb00] focus:ring-1 focus:ring-[#d7fb00] p-4 h-32 text-sm text-zinc-300 rounded-sm resize-none transition-colors placeholder:text-zinc-600 outline-none"
          id="order-special-instructions"
          name="order-special-instructions"
        />
      </div>

      <div className="pt-6 border-t border-zinc-800/60 space-y-4">
        <div className="flex justify-between items-end pb-4 border-b border-zinc-800/40">
           <p className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">Subtotal</p>
           <p className="text-2xl font-bold text-zinc-100 tabular-nums">
             ₹{subtotal.toLocaleString()}
           </p>
        </div>

        <p className="text-xs text-zinc-500 text-center leading-relaxed">
          Taxes and shipping calculated at checkout
        </p>

        <Button asChild className="w-full bg-[#d7fb00] hover:bg-[#b5d500] text-black h-14 rounded-none font-bold uppercase tracking-wider transition-all mt-2 cursor-pointer shadow-[0_0_20px_rgba(215,251,0,0.1)] hover:shadow-[0_0_30px_rgba(215,251,0,0.3)]">
          <Link to="/account/checkout">
            PROCEED TO CHECKOUT
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
