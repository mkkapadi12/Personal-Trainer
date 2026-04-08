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

  console.log(userOrders);

  const filters = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const filteredOrders =
    activeFilter === 'all'
      ? userOrders
      : userOrders?.filter((o) => o.status === activeFilter) || [];

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#222222] uppercase tracking-tight">
            My Orders
          </h1>
          <p className="text-[#777777] mt-1">
            {userOrders?.length || 0} order
            {(userOrders?.length || 0) !== 1 ? 's' : ''} placed
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 mb-6 bg-white border border-gray-100 p-1 w-fit">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={cn(
                'px-4 py-1.5 text-sm font-medium transition-all',
                activeFilter === f.value
                  ? 'bg-[#faa432] text-white'
                  : 'text-[#777777] hover:text-[#222222]',
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
          <div className="bg-white border border-gray-100 p-16 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <PAGE_ICONS.RECEIPTTEXT size={28} className="text-gray-300" />
            </div>
            <h3 className="font-bold text-[#222222] mb-1">No orders found</h3>
            <p className="text-sm text-[#777777] mb-6">
              {activeFilter === 'all'
                ? "You haven't placed any orders yet."
                : `No ${activeFilter} orders.`}
            </p>
            <Button
              asChild
              className="bg-[#faa432] hover:bg-[#faa432]/90 text-white rounded-none px-8"
            >
              <Link to="/products">
                Start Shopping{' '}
                <PAGE_ICONS.ARROWRIGHT size={14} className="ml-1" />
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
