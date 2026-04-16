import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { createOrder } from '@/Store/features/orders/order.slice';
import { clearCart } from '@/Store/features/cart/cart.slice';
import { fetchAddresses } from '@/Store/features/address/address.slice';
import { PAGE_ICONS } from '@/lib/icons/page.icons';

const PAYMENT_METHODS = [
  {
    id: 'cod',
    label: 'Cash on Delivery',
    description: 'Pay when your order arrives',
    icon: PAGE_ICONS.BANKNOTE,
  },
  {
    id: 'upi',
    label: 'UPI / QR Code',
    description: 'Pay via any UPI app',
    icon: PAGE_ICONS.WALLET,
  },
  {
    id: 'card',
    label: 'Credit / Debit Card',
    description: 'Visa, Mastercard, RuPay',
    icon: PAGE_ICONS.CREDITCARD,
  },
];

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addresses } = useSelector((state) => state.address);
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const { loading } = useSelector((state) => state.orders);

  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('cod');

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  useEffect(() => {
    if (addresses?.length > 0 && !selectedAddressId) {
      setSelectedAddressId(addresses[0]._id);
    }
  }, [addresses]);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  const onConfirmOrder = async () => {
    if (!selectedAddressId) {
      toast.error('Please select a delivery address');
      return;
    }
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    const orderData = {
      items: cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: total,
      addressId: selectedAddressId,
      shippingCharge: shipping,
      subtotal: subtotal,
      paymentMethod: selectedPayment,
      status: 'pending',
    };

    try {
      const result = await dispatch(createOrder(orderData)).unwrap();
      if (result.success === true) {
        toast.success('Order placed successfully!');
        dispatch(clearCart());
        navigate('/account/my-orders');
      }
    } catch (error) {
      toast.error(error || 'Failed to place order');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-4 py-20">
        <PAGE_ICONS.SHOPPINGBAG size={64} className="text-zinc-600" />
        <h2 className="text-2xl font-bold text-zinc-100">Your cart is empty</h2>
        <p className="text-zinc-400">Add some products before checking out</p>
        <Button
          asChild
          className="bg-[#d7fb00] hover:bg-[#b5d500] text-black font-semibold rounded-none px-8 transition-colors mt-4"
        >
          <Link to="/products">Shop Now</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back */}
        <Link
          to="/account/cart"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-[#d7fb00] mb-6 transition-colors group"
        >
          <PAGE_ICONS.ARROWLEFT
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Cart
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-100 uppercase tracking-tight shadow-sm">
            Checkout
          </h1>
          <p className="text-zinc-400 mt-1">
            {cart.length} item{cart.length > 1 ? 's' : ''} in your order
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-2 mb-8 text-sm">
          {['Cart', 'Checkout', 'Confirmation'].map((step, i) => (
            <React.Fragment key={step}>
              <span
                className={cn(
                  'font-medium transition-colors',
                  i === 1
                    ? 'text-[#d7fb00]'
                    : i < 1
                      ? 'text-[#d7fb00]'
                      : 'text-zinc-500',
                )}
              >
                {i < 1 ? (
                  <PAGE_ICONS.CHECKCIRCLE
                    size={14}
                    className="inline mr-1 text-[#d7fb00]"
                  />
                ) : null}
                {step}
              </span>
              {i < 2 && (
                <PAGE_ICONS.CHEVRONRIGHT size={14} className="text-zinc-600" />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-3 space-y-6">
            {/* DELIVERY ADDRESS */}
            <div className="bg-zinc-900 border border-zinc-800 p-6 shadow-md rounded-sm">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-zinc-800/60">
                <div className="w-8 h-8 rounded-full bg-[#d7fb00]/10 flex items-center justify-center">
                  <PAGE_ICONS.MAPPIN size={16} className="text-[#d7fb00]" />
                </div>
                <h2 className="text-lg font-bold text-zinc-100">
                  Delivery Address
                </h2>
              </div>

              {addresses?.length === 0 ? (
                <div className="border-2 border-dashed border-zinc-700 p-6 text-center rounded-sm bg-zinc-800/30">
                  <PAGE_ICONS.MAPPIN
                    size={32}
                    className="text-zinc-500 mx-auto mb-2"
                  />
                  <p className="text-zinc-400 text-sm mb-3">
                    No saved addresses
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="rounded-none border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100 text-zinc-300"
                  >
                    <Link to="/account/profile/address">
                      <PAGE_ICONS.PLUS size={14} className="mr-1" /> Add Address
                    </Link>
                  </Button>
                </div>
              ) : (
                <RadioGroup
                  value={selectedAddressId}
                  onValueChange={setSelectedAddressId}
                  className="space-y-3"
                >
                  {addresses.map((addr) => (
                    <label
                      key={addr._id}
                      htmlFor={addr._id}
                      className={cn(
                        'flex items-start gap-3 p-4 border-2 cursor-pointer transition-all rounded-sm',
                        selectedAddressId === addr._id
                          ? 'border-[#d7fb00] bg-[#d7fb00]/5'
                          : 'border-zinc-800/50 bg-zinc-800/20 hover:border-zinc-700',
                      )}
                    >
                      <RadioGroupItem
                        value={addr._id}
                        id={addr._id}
                        className="mt-0.5 accent-[#d7fb00] border-zinc-600 data-[state=checked]:border-[#d7fb00] data-[state=checked]:text-[#d7fb00]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-zinc-100 text-sm">
                            {addr.name ||
                              `${user?.firstName} ${user?.lastName}`}
                          </span>
                          {addr.isDefault && (
                            <Badge className="text-[10px] h-4 bg-[#d7fb00]/10 text-[#d7fb00] border border-[#d7fb00]/20">
                              Default
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-zinc-400">
                          {addr.street}, {addr.city}, {addr.state} —{' '}
                          {addr.pincode}
                        </p>
                        {addr.phone && (
                          <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                            <PAGE_ICONS.PHONE
                              size={12}
                              className="text-zinc-600"
                            />{' '}
                            {addr.phone}
                          </p>
                        )}
                      </div>
                    </label>
                  ))}
                </RadioGroup>
              )}

              <Link
                to="/account/profile/address"
                className="mt-4 inline-flex items-center gap-1 text-xs text-[#d7fb00] hover:text-[#b5d500] hover:underline font-medium transition-colors"
              >
                <PAGE_ICONS.PLUS size={14} /> Manage Addresses
              </Link>
            </div>

            {/* PAYMENT METHOD */}
            <div className="bg-zinc-900 border border-zinc-800 p-6 shadow-md rounded-sm">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-zinc-800/60">
                <div className="w-8 h-8 rounded-full bg-[#d7fb00]/10 flex items-center justify-center">
                  <PAGE_ICONS.CREDITCARD size={16} className="text-[#d7fb00]" />
                </div>
                <h2 className="text-lg font-bold text-zinc-100">
                  Payment Method
                </h2>
              </div>

              <RadioGroup
                value={selectedPayment}
                onValueChange={setSelectedPayment}
                className="space-y-3"
              >
                {PAYMENT_METHODS.map((method) => {
                  const Icon = method.icon;
                  return (
                    <label
                      key={method.id}
                      htmlFor={method.id}
                      className={cn(
                        'flex items-center gap-3 p-4 border-2 cursor-pointer transition-all rounded-sm',
                        selectedPayment === method.id
                          ? 'border-[#d7fb00] bg-[#d7fb00]/5'
                          : 'border-zinc-800/50 bg-zinc-800/20 hover:border-zinc-700',
                      )}
                    >
                      <RadioGroupItem
                        value={method.id}
                        id={method.id}
                        className="border-zinc-600 data-[state=checked]:border-[#d7fb00] data-[state=checked]:text-[#d7fb00] accent-[#d7fb00]"
                      />
                      <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-700/50">
                        <Icon size={18} className="text-zinc-300" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-zinc-100">
                          {method.label}
                        </p>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          {method.description}
                        </p>
                      </div>
                      {selectedPayment === method.id && (
                        <PAGE_ICONS.CHECKCIRCLE
                          size={18}
                          className="text-[#d7fb00] ml-auto drop-shadow-sm"
                        />
                      )}
                    </label>
                  );
                })}
              </RadioGroup>
            </div>

            {/* ORDER ITEMS */}
            <div className="bg-zinc-900 border border-zinc-800 p-6 shadow-md rounded-sm">
              <div className="flex items-center gap-2 mb-5 pb-2 border-b border-zinc-800/60">
                <div className="w-8 h-8 rounded-full bg-[#d7fb00]/10 flex items-center justify-center">
                  <PAGE_ICONS.PACKAGE size={16} className="text-[#d7fb00]" />
                </div>
                <h2 className="text-lg font-bold text-zinc-100">Order Items</h2>
                <span className="text-xs text-zinc-400 ml-auto bg-zinc-800 px-2 py-1 rounded-full border border-zinc-700">
                  {cart.length} item{cart.length > 1 ? 's' : ''}
                </span>
              </div>

              <div className="space-y-3">
                {cart.map((item) => (
                  <Link
                    to={`/products/${item._id}`}
                    key={item._id}
                    className="block group"
                  >
                    <div className="flex items-center gap-4 p-3 rounded-sm border border-transparent hover:border-zinc-800 hover:bg-zinc-800/30 transition-all">
                      <div className="w-16 h-16 border border-zinc-700 shrink-0 overflow-hidden bg-white/5 rounded-sm p-1">
                        {item.images.map(
                          (image) =>
                            image.isPrimary && (
                              <img
                                key={image.public_id}
                                src={image?.url}
                                alt={item.name}
                                className="w-full h-full object-contain"
                              />
                            ),
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-widest mb-0.5">
                          {item.brand}
                        </p>
                        <p className="text-sm font-semibold text-zinc-100 truncate group-hover:text-[#d7fb00] transition-colors">
                          {item.name}
                        </p>
                        <p className="text-xs text-zinc-500 mt-1">
                          Qty:{' '}
                          <span className="text-zinc-300 font-medium">
                            {item.quantity}
                          </span>
                        </p>
                      </div>
                      <p className="text-sm font-bold text-zinc-100 shrink-0 tabular-nums">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — ORDER SUMMARY */}
          <div className="lg:col-span-2">
            <div className="bg-zinc-900 border border-zinc-800 p-6 shadow-md rounded-sm sticky top-6">
              <h2 className="text-lg font-bold text-zinc-100 mb-5 pb-2 border-b border-zinc-800/60">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal ({cart.length} items)</span>
                  <span className="text-zinc-100 font-medium tabular-nums">
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Shipping</span>
                  <span
                    className={
                      shipping === 0
                        ? 'text-[#d7fb00] font-medium'
                        : 'text-zinc-100 font-medium'
                    }
                  >
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                {shipping === 0 && (
                  <div className="flex items-center gap-2 text-xs text-[#d7fb00] bg-[#d7fb00]/10 px-3 py-2 rounded-sm border border-[#d7fb00]/20 mt-2">
                    <PAGE_ICONS.TRUCK size={14} />
                    <p>You saved ₹99 on shipping!</p>
                  </div>
                )}
                {shipping > 0 && (
                  <div className="text-xs text-zinc-400 bg-zinc-800/50 px-3 py-2 rounded-sm border border-zinc-700/50 mt-2">
                    Add{' '}
                    <span className="text-zinc-200 font-medium">
                      ₹{(999 - subtotal).toLocaleString()}
                    </span>{' '}
                    more for free shipping
                  </div>
                )}
              </div>

              <Separator className="my-5 bg-zinc-800" />

              <div className="flex justify-between items-end font-bold text-zinc-100">
                <div>
                  <span className="text-base text-zinc-100 block">
                    Total Amount
                  </span>
                  <span className="text-[10px] text-zinc-500 font-normal mt-0.5 block">
                    Inclusive of all taxes
                  </span>
                </div>
                <span className="text-2xl text-[#d7fb00] tabular-nums">
                  ₹{total.toLocaleString()}
                </span>
              </div>

              <Separator className="my-5 bg-zinc-800" />

              {/* Payment badge */}
              <div className="flex items-center gap-3 bg-zinc-800/50 p-3 mb-6 rounded-sm border border-zinc-700/50">
                {PAYMENT_METHODS.find((m) => m.id === selectedPayment) && (
                  <>
                    <div className="p-1.5 bg-zinc-800 rounded-full shrink-0">
                      {React.createElement(
                        PAYMENT_METHODS.find((m) => m.id === selectedPayment)
                          .icon,
                        { size: 16, className: 'text-[#d7fb00]' },
                      )}
                    </div>
                    <span className="text-xs text-zinc-300">
                      Paying securely via{' '}
                      <strong className="text-zinc-100 font-semibold">
                        {
                          PAYMENT_METHODS.find((m) => m.id === selectedPayment)
                            .label
                        }
                      </strong>
                    </span>
                  </>
                )}
              </div>

              {/* Confirm Button */}
              <Button
                onClick={onConfirmOrder}
                disabled={loading || !selectedAddressId}
                className="w-full bg-[#d7fb00] hover:bg-[#b5d500] text-black rounded-none h-14 text-base font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-[0_0_20px_rgba(215,251,0,0.3)]"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <PAGE_ICONS.CHECKCIRCLE size={18} />
                    Confirm Order & Pay
                  </span>
                )}
              </Button>

              {/* Trust badges */}
              <div className="mt-6 grid grid-cols-3 gap-2 text-center pt-4 border-t border-zinc-800/50">
                {[
                  { icon: PAGE_ICONS.SHIELD, label: 'Secure Payment' },
                  { icon: PAGE_ICONS.TRUCK, label: 'Fast Delivery' },
                  { icon: PAGE_ICONS.PACKAGE, label: 'Easy Returns' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-zinc-800/80 flex items-center justify-center border border-zinc-700/50">
                      <Icon size={14} className="text-zinc-400" />
                    </div>
                    <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider w-full">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
