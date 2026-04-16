import React, { useEffect, useState } from 'react';
import { ADMIN_ICONS } from '@/lib/icons/admin.icons';
import { cn, formatDate, formatTime } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { orderStatusConfig } from '../constants';
import { useOrderStatus } from '@/hooks/useOrderStatus';

const OrderDetailsDrawer = ({ isOpen, onClose, order }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { handleStatusUpdate, getNextStatus, canCancel } = useOrderStatus({
    onStatusUpdate: () => {
      onClose();
    },
  });
  const nextStatus = getNextStatus(order?.status);

  const handleViewOnMap = () => {
    if (!order?.address) return;
    const { company, address1, address2, city, postalCode, country } =
      order.address;
    const queryParts = [
      company,
      address1,
      address2,
      city,
      postalCode,
      country,
    ].filter(Boolean);
    const query = encodeURIComponent(queryParts.join(', '));
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${query}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      requestAnimationFrame(() => {
        setTimeout(() => setIsVisible(true), 10);
      });
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setIsRendered(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isRendered || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300',
          isVisible ? 'opacity-100' : 'opacity-0',
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          'relative w-full max-w-md xl:max-w-lg h-full bg-zinc-950 border-l border-zinc-800 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col',
          isVisible ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800 shrink-0 bg-zinc-900/50">
          <div>
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <ADMIN_ICONS.SHOPPINGCART className="h-5 w-5 text-lime-400" />
              Order Details
            </h2>
            <p className="text-sm text-zinc-500 mt-1">
              Order #{order._id?.slice(-8).toUpperCase()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
          >
            <ADMIN_ICONS.X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 shrink-0 custom-scrollbar pb-24">
          {/* Customer info */}
          <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-5 space-y-4">
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2 mb-2">
              <ADMIN_ICONS.USERS className="h-4 w-4 text-zinc-500" />
              Customer Details
            </h4>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-lime-400/20 to-emerald-400/20 border border-zinc-700/50 flex items-center justify-center shrink-0">
                <span className="text-lg font-bold text-lime-400 uppercase">
                  {order.user?.firstName?.[0] || '?'}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-base font-medium text-white truncate">
                  {order.user?.firstName || 'Unknown'}{' '}
                  {order.user?.lastName || ''}
                </p>
                <p className="text-sm text-zinc-400 truncate">
                  {order.user?.email || '—'}
                </p>
              </div>
            </div>
          </div>

          {/* Status & Date */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-5 space-y-3">
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Status
              </h4>
              <div className="pt-1">
                {(() => {
                  const config =
                    orderStatusConfig[order.status] ||
                    orderStatusConfig.pending;
                  return (
                    <span
                      className={cn(
                        'inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full ring-1',
                        config.bg,
                        config.text,
                        config.ring,
                      )}
                    >
                      <span
                        className={cn(
                          'h-1.5 w-1.5 rounded-full animate-pulse',
                          config.dot,
                        )}
                      />
                      {config.label}
                    </span>
                  );
                })()}
              </div>
            </div>
            <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-5 space-y-2">
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Order Date
              </h4>
              <div className="pt-1">
                <p className="text-sm font-medium text-zinc-200">
                  {formatDate(order.createdAt)}
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {formatTime(order.createdAt, 'short')}
                </p>
              </div>
            </div>
            {order.status === 'delivered' && (
              <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-5 space-y-2">
                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  Delivery Date
                </h4>
                <div className="pt-1">
                  <p className="text-sm font-medium text-zinc-200">
                    {formatDate(order.updatedAt)}
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {formatTime(order.updatedAt, 'short')}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Shipping Address */}
          {order.address && (
            <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-5 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <ADMIN_ICONS.TRUCK className="h-24 w-24" />
              </div>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2 mb-2 relative z-10">
                <ADMIN_ICONS.TRUCK className="h-4 w-4 text-zinc-500" />
                Shipping Address
              </h4>
              <div className="space-y-1.5 text-sm text-zinc-300 relative z-10">
                {order.address.company && (
                  <p className="font-medium text-white text-base pb-1">
                    {order.address.company}
                  </p>
                )}
                <p>{order.address.address1}</p>
                {order.address.address2 && <p>{order.address.address2}</p>}
                <p>
                  {order.address.city}, {order.address.postalCode}
                </p>
                <p className="text-zinc-400">{order.address.country}</p>

                {order.address.phone && (
                  <>
                    <div className="flex items-center justify-between pt-3 border-t border-zinc-800/60">
                      <div className="">
                        <p className="flex items-center gap-2 text-zinc-300 font-medium">
                          <ADMIN_ICONS.PHONE className="h-4 w-4 text-zinc-500" />
                          {order.address.phone}
                        </p>
                      </div>
                      <div className="">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleViewOnMap}
                          className="text-zinc-300 font-medium border-zinc-800/60 bg-zinc-900/80 hover:bg-zinc-900/80 hover:text-zinc-300"
                        >
                          <ADMIN_ICONS.MAP className="h-4 w-4 text-zinc-500" />
                          View on Map
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Items */}
          <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-5 space-y-4">
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2 mb-3">
              <ADMIN_ICONS.PACKAGE className="h-4 w-4 text-zinc-500" />
              Items ({order.items?.length || 0})
            </h4>
            <div className="divide-y divide-zinc-800/60">
              {order.items?.map((item, idx) => {
                const product = order.products?.find(
                  (p) =>
                    p._id === item.productId || p._id === item.productId?._id,
                );
                return (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-lg bg-zinc-800 border border-zinc-700/50 flex items-center justify-center overflow-hidden shrink-0">
                        {product?.images?.find((img) => img.isPrimary) ? (
                          <img
                            src={
                              product.images.find((img) => img.isPrimary)?.url
                            }
                            alt={product.name}
                            className="h-full w-full object-cover shrink-0"
                          />
                        ) : (
                          <ADMIN_ICONS.PACKAGE className="h-6 w-6 text-zinc-600 shrink-0" />
                        )}
                      </div>
                      <div className="min-w-0 pr-4">
                        <p className="text-sm font-medium text-white line-clamp-2">
                          {product?.name || 'Product'}
                        </p>
                        <p className="text-xs text-zinc-400 mt-1">
                          Qty:{' '}
                          <span className="text-white font-medium">
                            {item.quantity}
                          </span>{' '}
                          x ₹{item.price?.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                    <span className="text-[15px] font-semibold text-white tabular-nums shrink-0 mt-2 sm:mt-0 text-right">
                      ₹{(item.quantity * item.price)?.toLocaleString('en-IN')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-zinc-900/80 border border-zinc-800/60 rounded-xl overflow-hidden mt-6">
            <div className="px-5 py-4 border-b border-zinc-800/60 flex items-center gap-2 bg-gradient-to-r from-zinc-900/80 to-zinc-900/30">
              <ADMIN_ICONS.RECEIPTTEXT size={16} className="text-lime-500" />
              <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                Order Summary
              </span>
            </div>
            <div>
              <div className="flex items-center justify-between px-6 py-3.5 mt-2">
                <span className="text-sm text-zinc-400">Subtotal</span>
                <span className="text-sm font-medium text-zinc-200 tabular-nums">
                  ₹
                  {order.subtotal?.toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="h-px bg-zinc-800/50 mx-6" />
              <div className="flex items-center justify-between px-6 py-3.5">
                <span className="text-sm text-zinc-400">Shipping</span>
                <span className="text-sm font-medium text-zinc-200 tabular-nums">
                  ₹
                  {order.shippingCharge?.toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>

              <div className="flex items-center justify-between px-6 py-5 bg-lime-400/5 mt-2 border-t border-zinc-800/60">
                <span className="text-base font-semibold text-white">
                  Total Amount
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xs font-medium text-zinc-500">INR</span>
                  <span className="text-xl font-bold text-lime-400 tabular-nums">
                    ₹
                    {order.totalAmount?.toLocaleString('en-IN', {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        {order.status !== 'delivered' && (
          <div className="p-5 border-t border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md shrink-0 absolute bottom-0 left-0 right-0 z-20">
            <div className="flex gap-3">
              {nextStatus?.next && (
                <Button
                  onClick={async () => {
                    const success = await handleStatusUpdate(
                      order._id,
                      nextStatus.next,
                    );
                    if (success) onClose();
                  }}
                  className="flex-1 bg-gradient-to-r from-emerald-500/20 to-emerald-500/10 text-emerald-400 hover:from-emerald-500/30 hover:to-emerald-500/20 border border-emerald-500/20 shadow-[0_0_15px_-3px_rgba(16,185,129,0.1)] h-12 rounded-xl transition-all"
                >
                  <ADMIN_ICONS.TRUCK className="h-4 w-4 mr-2" />
                  <span className="font-semibold">{nextStatus.action}</span>
                </Button>
              )}

              {canCancel(order.status) && (
                <Button
                  onClick={async () => {
                    const success = await handleStatusUpdate(
                      order._id,
                      'cancelled',
                    );
                    if (success) onClose();
                  }}
                  className="flex-[0.6] bg-zinc-900 text-red-400 hover:bg-neutral-800 border border-zinc-800 hover:border-red-500/30 shadow-none h-12 rounded-xl"
                >
                  <span className="font-medium">Cancel</span>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsDrawer;
