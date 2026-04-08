import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';

const STATUS_CONFIG = {
  pending: {
    label: 'Pending',
    icon: Clock,
    className: 'bg-amber-50 text-amber-700 border-amber-200',
    dotColor: 'bg-amber-400',
  },
  completed: {
    label: 'Delivered',
    icon: CheckCircle2,
    className: 'bg-green-50 text-[#0d9b4d] border-green-200',
    dotColor: 'bg-[#0d9b4d]',
  },
  cancelled: {
    label: 'Cancelled',
    icon: XCircle,
    className: 'bg-red-50 text-red-600 border-red-200',
    dotColor: 'bg-red-400',
  },
};

const OrderStatusBadge = ({ status }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  const Icon = config.icon;
  return (
    <Badge
      variant="outline"
      className={cn(
        'flex items-center gap-1.5 font-medium text-xs px-2.5 py-1',
        config.className,
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full', config.dotColor)} />
      {config.label}
    </Badge>
  );
};

export default OrderStatusBadge;
