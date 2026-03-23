import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartTable from './components/CartTable';
import CartSummary from './components/CartSummary';
import GiftWrap from './components/GiftWrap';
import { ArrowLeft } from 'lucide-react';

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);

  return (
    <div className="py-10 md:py-20">
      <section className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="mb-10 space-y-4">
          <Link to="/products" className="flex items-center gap-3">
            <div className="border p-2 rounded-full">
              <ArrowLeft size={16} />
            </div>
            <span className="text-sm font-medium">Continue Shopping</span>
          </Link>

          <h1 className="text-3xl md:text-5xl font-bold uppercase">
            Your Cart
          </h1>
        </div>

        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">

            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">
              <CartTable cart={cart} />
              <GiftWrap />
            </div>

            {/* RIGHT */}
            <CartSummary cart={cart} />
          </div>
        )}
      </section>
    </div>
  );
};

export default Cart;