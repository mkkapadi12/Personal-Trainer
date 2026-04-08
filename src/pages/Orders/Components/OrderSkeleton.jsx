import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export const OrderSkeleton = () => (
  <div className="bg-white border border-gray-100 p-5">
    <div className="flex items-center gap-4">
      <Skeleton className="w-16 h-16 shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-48" />
        <Skeleton className="h-3 w-24" />
      </div>
      <Skeleton className="h-6 w-20" />
    </div>
  </div>
);
