import React from 'react';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import OrderStatusBadge from './OrderStatusBadge';
import { PAGE_ICONS } from '@/lib/icons/page.icons';

const OrderCard = ({ order }) => {
  const [expanded, setExpanded] = useState(false);

  const formattedDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '—';

  const items = order.items || [];
  const firstItem = items[0];

  return (
    <div className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      {/* Card Header */}
      <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Thumbnail */}
        <div className="w-16 h-16 shrink-0 border border-gray-100 bg-gray-50 overflow-hidden">
          {firstItem?.productId?.mainImage ? (
            <img
              src={firstItem.productId.mainImage}
              alt={firstItem.productId?.name}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <PAGE_ICONS.PACKAGE size={24} className="text-gray-300" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-xs font-mono text-[#777777] bg-gray-50 px-2 py-0.5 rounded">
              #{order._id?.slice(-8).toUpperCase()}
            </span>
            <OrderStatusBadge status={order.status} />
          </div>
          <p className="text-sm font-semibold text-[#222222] truncate">
            {items.length === 1
              ? firstItem?.productId?.name || 'Product'
              : `${firstItem?.productId?.name || 'Product'} + ${items.length - 1} more`}
          </p>
          <div className="flex items-center gap-3 mt-1 text-xs text-[#777777]">
            <span className="flex items-center gap-1">
              <PAGE_ICONS.CALENDARDAYS size={11} />
              {formattedDate}
            </span>
            <span>•</span>
            <span>
              {items.length} item{items.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Price + Toggle */}
        <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-1">
          <p className="text-lg font-bold text-[#222222]">
            ₹{order.totalAmount?.toLocaleString() || '—'}
          </p>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-[#faa432] hover:underline font-medium"
          >
            {expanded ? (
              <>
                Less <PAGE_ICONS.CHEVRONUP size={13} />
              </>
            ) : (
              <>
                Details <PAGE_ICONS.CHEVRONDOWN size={13} />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-gray-100">
          <div className="p-5 space-y-4">
            {/* Items list */}
            <div className="space-y-3">
              {items.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-12 h-12 shrink-0 border border-gray-100 bg-gray-50 overflow-hidden">
                    {item.productId?.mainImage ? (
                      <img
                        src={item.productId.mainImage}
                        alt={item.productId?.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <PAGE_ICONS.PACKAGE size={16} className="text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#63af21] font-medium uppercase truncate">
                      {item.productId?.brand || ''}
                    </p>
                    <p className="text-sm text-[#222222] font-medium truncate">
                      {item.productId?.name || 'Product'}
                    </p>
                    <p className="text-xs text-[#777777]">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-[#222222] shrink-0">
                    ₹
                    {(
                      (item.price || item.productId?.price || 0) * item.quantity
                    ).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <Separator />

            {/* Price breakdown */}
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-[#777777]">
                <span>Subtotal</span>
                <span>₹{order.totalAmount?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#777777]">
                <span>Shipping</span>
                <span className="text-[#0d9b4d]">FREE</span>
              </div>
              <div className="flex justify-between font-bold text-[#222222] pt-1 border-t border-gray-100">
                <span>Total</span>
                <span>₹{order.totalAmount?.toLocaleString()}</span>
              </div>
            </div>

            {/* Actions */}
            {order.status === 'pending' && (
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 p-3 text-xs text-amber-700">
                <PAGE_ICONS.TRUCK size={14} className="shrink-0" />
                <span>
                  Your order is being processed and will be shipped soon.
                </span>
              </div>
            )}
            {order.status === 'completed' && (
              <div className="flex items-center gap-2 bg-green-50 border border-green-100 p-3 text-xs text-[#0d9b4d]">
                <PAGE_ICONS.CHECKCIRCLE size={14} className="shrink-0" />
                <span>
                  Order delivered successfully. Thank you for shopping with
                  WorkDo!
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
