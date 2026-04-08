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
    <div>
      {/* Quantity */}
      <div className="flex items-center gap-4">
        <span>Quantity :</span>

        <div className="flex border">
          <button className="px-3 py-1" onClick={() => setDecrese()}>
            -
          </button>
          <span className="px-4 py-1">{quantity}</span>
          <button className="px-3 py-1" onClick={() => setIncrese()}>
            +
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <Button
          className="bg-black text-white px-8 py-3 rounded-none"
          onClick={() => dispatch(addToCart({ product, quantity }))}
        >
          ADD TO CART →
        </Button>
        <Link to="/account/checkout">
          <Button
            variant="primary"
            className="px-8 py-3 rounded-none text-black"
          >
            BUY IT NOW
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AddToCart;
