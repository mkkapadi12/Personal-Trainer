import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { PAGE_ICONS } from '@/lib/icons/page.icons';

const STATUS_CONFIG = {
  pending: {
    label: 'Pending',
    icon: PAGE_ICONS.CLOCK,
    className: 'bg-zinc-800/80 text-zinc-300 border-zinc-700',
    dotColor: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]',
  },
  completed: {
    label: 'Delivered',
    icon: PAGE_ICONS.CHECKCIRCLE,
    className: 'bg-[#d7fb00]/10 text-[#d7fb00] border-[#d7fb00]/20',
    dotColor: 'bg-[#d7fb00] shadow-[0_0_8px_rgba(215,251,0,0.6)]',
  },
  cancelled: {
    label: 'Cancelled',
    icon: PAGE_ICONS.XCIRCLE,
    className: 'bg-red-500/10 text-red-500 border-red-500/20',
    dotColor: 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]',
  },
};

const OrderStatusBadge = ({ status }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  const Icon = config.icon;
  return (
    <Badge
      variant="outline"
      className={cn(
        'flex items-center gap-1.5 font-semibold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm',
        config.className,
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full', config.dotColor)} />
      {config.label}
    </Badge>
  );
};

export default OrderStatusBadge;
