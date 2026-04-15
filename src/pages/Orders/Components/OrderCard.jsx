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
    <div className="bg-zinc-900 border border-zinc-800 shadow-md hover:border-zinc-700 transition-colors rounded-sm overflow-hidden">
      {/* Card Header */}
      <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Thumbnail */}
        <div className="w-16 h-16 shrink-0 border border-zinc-800 bg-zinc-950 overflow-hidden rounded-sm p-1">
          {firstItem?.productId?.images.find((img) => img.isPrimary) ? (
            <img
              src={firstItem.productId.images.find((img) => img.isPrimary)?.url}
              alt={firstItem.productId?.name}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <PAGE_ICONS.PACKAGE size={24} className="text-zinc-600" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-xs font-mono font-medium text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-sm border border-zinc-700/50">
              #{order._id?.slice(-8).toUpperCase()}
            </span>
            <OrderStatusBadge status={order.status} />
          </div>
          <p className="text-sm font-semibold text-zinc-100 truncate">
            {items.length === 1
              ? firstItem?.productId?.name || 'Product'
              : `${firstItem?.productId?.name || 'Product'} + ${items.length - 1} more`}
          </p>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-zinc-500">
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
        <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-1.5">
          <p className="text-lg font-bold text-zinc-100 tabular-nums">
            ₹{order.totalAmount?.toLocaleString() || '—'}
          </p>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-[#d7fb00] hover:text-[#b5d500] hover:underline font-medium transition-colors"
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
        <div className="border-t border-zinc-800 bg-zinc-950/50">
          <div className="p-5 space-y-4">
            {/* Items list */}
            <div className="space-y-3">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2 hover:bg-zinc-800/30 rounded-sm transition-colors border border-transparent hover:border-zinc-800"
                >
                  <div className="w-12 h-12 shrink-0 border border-zinc-800 bg-zinc-900 overflow-hidden rounded-sm p-1">
                    {item.productId?.images.find((img) => img.isPrimary) ? (
                      <img
                        src={
                          item.productId.images.find((img) => img.isPrimary)
                            ?.url
                        }
                        alt={item.productId?.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <PAGE_ICONS.PACKAGE
                          size={16}
                          className="text-zinc-600"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest truncate mb-0.5">
                      {item.productId?.brand || ''}
                    </p>
                    <p className="text-sm text-zinc-200 font-medium truncate">
                      {item.productId?.name || 'Product'}
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Qty:{' '}
                      <span className="text-zinc-300 font-medium">
                        {item.quantity}
                      </span>
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-zinc-100 shrink-0 tabular-nums">
                    ₹
                    {(
                      item.price ||
                      item.productId?.price ||
                      0
                    ).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <Separator className="bg-zinc-800" />

            {/* Price breakdown */}
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span className="tabular-nums">
                  ₹{order.subtotal?.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Shipping</span>
                <span className="text-[#d7fb00]">{order.shippingCharge}</span>
              </div>
              <div className="flex justify-between font-bold text-zinc-100 pt-2 mt-2 border-t border-zinc-800/60">
                <span>Total</span>
                <span className="tabular-nums text-[#d7fb00]">
                  ₹{order.totalAmount?.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Actions */}
            {order.status === 'pending' && (
              <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 p-4 rounded-sm text-xs text-zinc-300">
                <div className="p-1.5 bg-[#d7fb00]/10 rounded-full">
                  <PAGE_ICONS.TRUCK
                    size={14}
                    className="shrink-0 text-[#d7fb00]"
                  />
                </div>
                <span>
                  Your order is being processed and will be shipped soon.
                </span>
              </div>
            )}
            {order.status === 'completed' && (
              <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 p-4 rounded-sm text-xs text-zinc-300">
                <div className="p-1.5 bg-[#d7fb00]/10 rounded-full">
                  <PAGE_ICONS.CHECKCIRCLE
                    size={14}
                    className="shrink-0 text-[#d7fb00]"
                  />
                </div>
                <span>
                  Order delivered successfully. Thank you for shopping with us!
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
