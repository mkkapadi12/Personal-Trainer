import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { X } from 'lucide-react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { addToCart } from '@/Store/features/cart/cart.slice';
import { useDispatch } from 'react-redux';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function QuickView({ open, setOpen, product }) {
  const dispatch = useDispatch();

  if (!product) return null;

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      {/* Backdrop */}
      <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
          >
            <X size={22} />
          </button>

          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Image */}
            <div className="flex items-center justify-center bg-gray-100 rounded-xl p-4">
              <img
                src={product.mainImage}
                alt={product.name}
                className="h-72 object-contain"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Brand */}
                <p className="text-sm text-suxnix-secondary font-medium">
                  {product.brand}
                </p>

                {/* Name */}
                <h2 className="text-2xl font-bold text-suxnix-heading mt-1">
                  {product.name}
                </h2>

                {/* Price */}
                <p className="text-xl font-semibold mt-2 text-black">
                  ₹{product.price}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={18}
                        className={classNames(
                          product.rating >= star
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300',
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    ({product.numReviews || 0} reviews)
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mt-4 line-clamp-4">
                  {product.description}
                </p>
              </div>

              {/* Button */}
              <div className="mt-6">
                <Button
                  onClick={() => dispatch(addToCart({ product, quantity: 1 }))}
                  variant="primary"
                  className="w-full"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
