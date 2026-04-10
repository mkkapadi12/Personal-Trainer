import { Button } from '@/components/ui/button';
import { addToCart } from '@/Store/features/cart/cart.slice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const AddToCart = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { stock } = product;
  const dispatch = useDispatch();

  const setDecrese = () => {
    quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1);
  };

  const setIncrese = () => {
    stock > quantity ? setQuantity(quantity + 1) : setQuantity(stock);
  };

  return (
    <div className="pt-2">
      {/* Quantity */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Quantity</span>

        <div className="flex bg-zinc-900 border border-zinc-800 rounded-sm h-12 w-36 shrink-0">
          <button
            className="flex-1 flex justify-center items-center text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors disabled:opacity-50"
            onClick={setDecrese}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="w-12 flex justify-center items-center text-sm font-medium text-zinc-100 border-x border-zinc-800 tabular-nums">
            {quantity}
          </span>
          <button
            className="flex-1 flex justify-center items-center text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors disabled:opacity-50"
            onClick={setIncrese}
            disabled={quantity >= stock}
          >
            +
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-700 hover:border-zinc-600 px-8 py-6 rounded-none font-bold uppercase tracking-wider transition-all h-14"
          onClick={() => dispatch(addToCart({ product, quantity }))}
        >
          ADD TO CART
        </Button>
        <Link to="/account/checkout" className="flex-1">
          <Button
            className="w-full bg-[#d7fb00] hover:bg-[#b5d500] text-black px-8 py-6 rounded-none font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(215,251,0,0.1)] hover:shadow-[0_0_30px_rgba(215,251,0,0.3)] h-14"
          >
            BUY IT NOW
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AddToCart;
