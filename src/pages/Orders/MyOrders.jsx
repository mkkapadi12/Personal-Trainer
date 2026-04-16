import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { fetchUserOrders } from '@/Store/features/orders/order.slice';
import OrderCard from './Components/OrderCard';
import { OrderSkeleton } from './Components/OrderSkeleton';
import { PAGE_ICONS } from '@/lib/icons/page.icons';

const MyOrders = () => {
  const dispatch = useDispatch();
  const { userOrders, loading } = useSelector((state) => state.orders);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const filters = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'out_for_delivery', label: 'Out for Delivery' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const filteredOrders =
    activeFilter === 'all'
      ? userOrders
      : userOrders?.filter((o) => o.status === activeFilter) || [];

  return (
    <div className="min-h-screen bg-zinc-950 py-10">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-100 uppercase tracking-tight">
            My Orders
          </h1>
          <p className="text-zinc-400 mt-1">
            {userOrders?.length || 0} order
            {(userOrders?.length || 0) !== 1 ? 's' : ''} placed
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 mb-6 bg-zinc-900 border border-zinc-800 p-1 w-fit rounded-sm">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={cn(
                'px-4 py-1.5 text-sm font-medium transition-all rounded-sm',
                activeFilter === f.value
                  ? 'bg-[#d7fb00] text-black shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-100',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Orders list */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <OrderSkeleton key={i} />
            ))}
          </div>
        ) : filteredOrders?.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 p-16 text-center rounded-sm">
            <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-700">
              <PAGE_ICONS.RECEIPTTEXT size={28} className="text-zinc-400" />
            </div>
            <h3 className="font-bold text-zinc-100 mb-1">No orders found</h3>
            <p className="text-sm text-zinc-400 mb-6">
              {activeFilter === 'all'
                ? "You haven't placed any orders yet."
                : `No ${activeFilter} orders.`}
            </p>
            <Button
              asChild
              className="bg-[#d7fb00] hover:bg-[#b5d500] text-black rounded-none px-8 font-semibold transition-colors"
            >
              <Link to="/products">
                Start Shopping{' '}
                <PAGE_ICONS.ARROWRIGHT size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders?.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
