import React, { useState } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { PAGE_ICONS } from '@/lib/icons/pageicons';
import { useDispatch, useSelector } from 'react-redux';
import QuantityUpdate from './QuantityUpdate';
import { Link } from 'react-router-dom';
import { removeFromCart } from '@/Store/features/cart/cart.slice';

const CartDrawer = () => {
  const { cart } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const { isAuthChecked } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="group flex items-center cursor-pointer"
        disabled={!isAuthChecked}
      >
        <PAGE_ICONS.CART className="size-7 text-white" />
        <span className="hidden sm:block ml-2 text-sm text-gray-300">
          ({cart.length || '0'})
        </span>
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-lg font-medium text-gray-900">
                        My Cart ({cart.length || 0} Items)
                      </DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {cart?.map((product) => (
                            <li key={product._id} className="flex py-6">
                              <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  alt={product.name}
                                  src={product.mainImage}
                                  className="size-full object-cover"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <a href={product.href}>{product.name}</a>
                                    </h3>
                                    <p className="ml-4">₹{product.price}</p>
                                  </div>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <QuantityUpdate item={product} />
                                  <div className="flex">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        dispatch(removeFromCart(product._id))
                                      }
                                      className="font-medium text-red-600 hover:text-red-500 cursor-pointer"
                                    >
                                      <PAGE_ICONS.TRASH className="size-5" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p className="text-black font-semibold text-xl">
                        Total Items
                      </p>
                      <p className="text-black font-semibold text-xl">
                        {cart.length}
                      </p>
                    </div>
                    <hr className="my-2 h-0.5 bg-gray-300" />
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p className="text-black font-semibold text-xl">
                        Subtotal
                      </p>
                      <p className="text-black font-semibold text-2xl">
                        Rs. {subtotal} INR
                      </p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6 flex w-full items-center justify-between gap-2">
                      <Link
                        to="/account/cart"
                        onClick={() => setOpen(false)}
                        className="w-full flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium shadow-xs bg-[#d7fb00] text-black"
                      >
                        View Cart
                      </Link>
                      <Link
                        to="/checkout"
                        onClick={() => setOpen(false)}
                        className="w-full flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium shadow-xs bg-black text-white"
                      >
                        Checkout
                      </Link>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{' '}
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="font-medium text-black hover:underline"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CartDrawer;
