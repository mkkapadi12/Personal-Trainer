import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartTable from './components/CartTable';
import CartSummary from './components/CartSummary';
import GiftWrap from './components/GiftWrap';
import cartEmpty from '../../assets/images/cart-empty.png';
import { Button } from '@/components/ui/button';
import { PAGE_ICONS } from '@/lib/icons/page.icons';

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);

  return (
    <div className="min-h-screen bg-zinc-950 py-10 md:py-20 text-zinc-100">
      <section className="max-w-7xl mx-auto px-4">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <PAGE_ICONS.SHOPPINGBAG size={80} className="text-zinc-800 mb-6" />
            <h2 className="uppercase text-2xl font-bold text-zinc-100 mb-2">Your cart is empty</h2>
            <p className="text-zinc-400 mb-8 max-w-md text-center">It looks like you haven't added anything to your cart yet. Discover our premium fitness products to get started.</p>
            <Button variant="outline" className="border-[#d7fb00] text-[#d7fb00] hover:bg-[#d7fb00] hover:text-black rounded-none px-8 py-6 font-semibold tracking-wider" asChild>
              <Link to="/products">CONTINUE SHOPPING</Link>
            </Button>
          </div>
        ) : (
          <div className="bg-zinc-950">
            {/* Header */}
            <div className="mb-10 lg:mb-16 space-y-4">
              <Link to="/products" className="inline-flex items-center gap-3 text-zinc-400 hover:text-[#d7fb00] transition-colors group">
                <div className="border border-zinc-800 p-2 rounded-full group-hover:border-[#d7fb00]/50 group-hover:bg-[#d7fb00]/10 transition-all">
                  <PAGE_ICONS.ARROWLEFT size={16} className="group-hover:-translate-x-1 transition-transform" />
                </div>
                <span className="text-sm font-medium uppercase tracking-wider">Continue Shopping</span>
              </Link>

              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
                Your Cart
              </h1>
            </div>

            <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
              {/* LEFT */}
              <div className="lg:col-span-2 space-y-8">
                <CartTable cart={cart} />
                <GiftWrap />
              </div>

              {/* RIGHT */}
              <div className="lg:col-span-1">
                <CartSummary cart={cart} />
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Cart;
