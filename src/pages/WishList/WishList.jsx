import PageHero from '@/components/PageHero';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WishlistItem from './components/WishlistItem';
import { Button } from '@/components/ui/button';
import { clearWishList } from '@/Store/features/wishlist/wishlist.slice';

const WishList = () => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  return (
    <div>
      <PageHero
        title={`Wishlist (${wishlist.length})`}
        backText="Back to home"
        backLink="/"
        description="Your saved products ready to purchase anytime."
      />

      <section className="py-10">
        <div className="container max-w-292.5 mx-auto px-3">
          {/* Header Row */}
          <div className="hidden md:grid grid-cols-4 bg-gray-200 py-3 px-4 text-sm font-medium text-center">
            <p className="text-left">Product</p>
            <p className="text-left">Details</p>
            <p>Cart Button</p>
            <p>Delete</p>
          </div>

          {/* Wishlist Items */}
          {wishlist.length > 0 ? (
            wishlist.map((item) => <WishlistItem key={item._id} item={item} />)
          ) : (
            <div className="text-center py-20 text-gray-500">
              Your wishlist is empty 😢
            </div>
          )}

          {/* Clear All Button */}
          {wishlist.length > 0 && (
            <div className="flex justify-center mt-10">
              <Button
                onClick={() => dispatch(clearWishList())}
                className="bg-lime-400 px-8 py-3 font-semibold hover:opacity-80 transition"
              >
                CLEAR ALL
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default WishList;
