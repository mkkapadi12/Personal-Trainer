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
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 py-20">
        <PAGE_ICONS.SHOPPINGBAG size={64} className="text-gray-300" />
        <h2 className="text-2xl font-bold text-[#222222]">
          Your cart is empty
        </h2>
        <p className="text-[#777777]">Add some products before checking out</p>
        <Button
          asChild
          className="bg-[#faa432] hover:bg-[#faa432]/90 text-white rounded-none px-8"
        >
          <Link to="/products">Shop Now</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back */}
        <Link
          to="/account/cart"
          className="inline-flex items-center gap-2 text-sm text-[#777777] hover:text-[#222222] mb-6 transition-colors"
        >
          <PAGE_ICONS.ARROWLEFT size={16} />
          Back to Cart
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#222222] uppercase tracking-tight">
            Checkout
          </h1>
          <p className="text-[#777777] mt-1">
            {cart.length} item{cart.length > 1 ? 's' : ''} in your order
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-2 mb-8 text-sm">
          {['Cart', 'Checkout', 'Confirmation'].map((step, i) => (
            <React.Fragment key={step}>
              <span
                className={cn(
                  'font-medium',
                  i === 1
                    ? 'text-[#faa432]'
                    : i < 1
                      ? 'text-[#0d9b4d]'
                      : 'text-gray-400',
                )}
              >
                {i < 1 ? (
                  <PAGE_ICONS.CHECKCIRCLE size={14} className="inline mr-1" />
                ) : null}
                {step}
              </span>
              {i < 2 && (
                <PAGE_ICONS.CHEVRONRIGHT size={14} className="text-gray-300" />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-3 space-y-6">
            {/* DELIVERY ADDRESS */}
            <div className="bg-white border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#faa432]/10 flex items-center justify-center">
                  <PAGE_ICONS.MAPPIN size={16} className="text-[#faa432]" />
                </div>
                <h2 className="text-lg font-bold text-[#222222]">
                  Delivery Address
                </h2>
              </div>

              {addresses?.length === 0 ? (
                <div className="border-2 border-dashed border-gray-200 p-6 text-center rounded-sm">
                  <PAGE_ICONS.MAPPIN
                    size={32}
                    className="text-gray-300 mx-auto mb-2"
                  />
                  <p className="text-[#777777] text-sm mb-3">
                    No saved addresses
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="rounded-none"
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
                        'flex items-start gap-3 p-4 border-2 cursor-pointer transition-all',
                        selectedAddressId === addr._id
                          ? 'border-[#faa432] bg-[#faa432]/5'
                          : 'border-gray-100 hover:border-gray-200',
                      )}
                    >
                      <RadioGroupItem
                        value={addr._id}
                        id={addr._id}
                        className="mt-0.5 accent-[#faa432]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-[#222222] text-sm">
                            {addr.name ||
                              `${user?.firstName} ${user?.lastName}`}
                          </span>
                          {addr.isDefault && (
                            <Badge className="text-[10px] h-4 bg-[#0d9b4d]/10 text-[#0d9b4d] border-0">
                              Default
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-[#777777]">
                          {addr.street}, {addr.city}, {addr.state} —{' '}
                          {addr.pincode}
                        </p>
                        {addr.phone && (
                          <p className="text-xs text-[#777777] mt-0.5">
                            📞 {addr.phone}
                          </p>
                        )}
                      </div>
                    </label>
                  ))}
                </RadioGroup>
              )}

              <Link
                to="/account/addresses"
                className="mt-3 inline-flex items-center gap-1 text-xs text-[#faa432] hover:underline font-medium"
              >
                <PAGE_ICONS.PLUS size={12} /> Manage Addresses
              </Link>
            </div>

            {/* PAYMENT METHOD */}
            <div className="bg-white border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#faa432]/10 flex items-center justify-center">
                  <PAGE_ICONS.CREDITCARD size={16} className="text-[#faa432]" />
                </div>
                <h2 className="text-lg font-bold text-[#222222]">
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
                        'flex items-center gap-3 p-4 border-2 cursor-pointer transition-all',
                        selectedPayment === method.id
                          ? 'border-[#faa432] bg-[#faa432]/5'
                          : 'border-gray-100 hover:border-gray-200',
                      )}
                    >
                      <RadioGroupItem value={method.id} id={method.id} />
                      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-[#222222]" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-[#222222]">
                          {method.label}
                        </p>
                        <p className="text-xs text-[#777777]">
                          {method.description}
                        </p>
                      </div>
                      {selectedPayment === method.id && (
                        <PAGE_ICONS.CHECKCIRCLE
                          size={18}
                          className="text-[#faa432] ml-auto"
                        />
                      )}
                    </label>
                  );
                })}
              </RadioGroup>
            </div>

            {/* ORDER ITEMS */}
            <div className="bg-white border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#faa432]/10 flex items-center justify-center">
                  <PAGE_ICONS.PACKAGE size={16} className="text-[#faa432]" />
                </div>
                <h2 className="text-lg font-bold text-[#222222]">
                  Order Items
                </h2>
                <span className="text-xs text-[#777777] ml-auto">
                  {cart.length} item{cart.length > 1 ? 's' : ''}
                </span>
              </div>

              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item._id} className="flex items-center gap-3">
                    <div className="w-16 h-16 border border-gray-100 shrink-0 overflow-hidden bg-gray-50">
                      <img
                        src={item.mainImage}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#63af21] font-medium uppercase tracking-wide truncate">
                        {item.brand}
                      </p>
                      <p className="text-sm font-semibold text-[#222222] truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-[#777777]">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-[#222222] shrink-0">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — ORDER SUMMARY */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-100 p-6 shadow-sm sticky top-6">
              <h2 className="text-lg font-bold text-[#222222] mb-5">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-[#777777]">
                  <span>Subtotal ({cart.length} items)</span>
                  <span className="text-[#222222] font-medium">
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-[#777777]">
                  <span>Shipping</span>
                  <span
                    className={
                      shipping === 0
                        ? 'text-[#0d9b4d] font-medium'
                        : 'text-[#222222] font-medium'
                    }
                  >
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                {shipping === 0 && (
                  <p className="text-xs text-[#0d9b4d] bg-[#0d9b4d]/5 px-2 py-1 rounded-sm">
                    🎉 You saved ₹99 on shipping!
                  </p>
                )}
                {shipping > 0 && (
                  <p className="text-xs text-[#777777] bg-gray-50 px-2 py-1 rounded-sm">
                    Add ₹{(999 - subtotal).toLocaleString()} more for free
                    shipping
                  </p>
                )}
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between font-bold text-[#222222]">
                <span className="text-base">Total</span>
                <span className="text-xl">₹{total.toLocaleString()}</span>
              </div>

              <p className="text-xs text-[#777777] mt-1">
                Inclusive of all taxes
              </p>

              <Separator className="my-5" />

              {/* Payment badge */}
              <div className="flex items-center gap-2 bg-gray-50 p-3 mb-5">
                {PAYMENT_METHODS.find((m) => m.id === selectedPayment) && (
                  <>
                    {React.createElement(
                      PAYMENT_METHODS.find((m) => m.id === selectedPayment)
                        .icon,
                      { size: 16, className: 'text-[#777777] shrink-0' },
                    )}
                    <span className="text-xs text-[#777777]">
                      Paying via{' '}
                      <strong className="text-[#222222]">
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
                className="w-full bg-[#faa432] hover:bg-[#faa432]/90 text-white rounded-none py-6 text-base font-bold uppercase tracking-wider disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Placing Order...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <PAGE_ICONS.CHECKCIRCLE size={18} />
                    Confirm Order
                  </span>
                )}
              </Button>

              {/* Trust badges */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {[
                  { icon: PAGE_ICONS.SHIELD, label: 'Secure Payment' },
                  { icon: PAGE_ICONS.TRUCK, label: 'Fast Delivery' },
                  { icon: PAGE_ICONS.PACKAGE, label: 'Easy Returns' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1">
                    <Icon size={16} className="text-[#0d9b4d]" />
                    <span className="text-[10px] text-[#777777]">{label}</span>
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
