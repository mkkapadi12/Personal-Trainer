import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartTable from './components/CartTable';
import CartSummary from './components/CartSummary';
import GiftWrap from './components/GiftWrap';
import { ArrowLeft } from 'lucide-react';
import cartEmpty from '../../assets/images/cart-empty.png';
import { Button } from '@/components/ui/button';

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);

  return (
    <div className="py-10 md:py-20">
      <section className="max-w-7xl mx-auto px-4">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <h2 className="uppercase text-2xl font-bold">Your cart is empty</h2>
            <img
              src={cartEmpty}
              alt="Cart Empty"
              className="w-60 h-60 md:w-80 md:h-80"
            />
            <Button variant="primary">
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="">
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

            <div className="grid lg:grid-cols-3 gap-10">
              {/* LEFT */}
              <div className="lg:col-span-2 space-y-6">
                <CartTable cart={cart} />
                <GiftWrap />
              </div>

              {/* RIGHT */}
              <CartSummary cart={cart} />
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Cart;
