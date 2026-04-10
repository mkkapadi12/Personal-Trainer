import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export const OrderSkeleton = () => (
  <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-sm">
    <div className="flex items-center gap-4">
      <Skeleton className="w-16 h-16 shrink-0 bg-zinc-800 rounded-sm" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-32 bg-zinc-800" />
        <Skeleton className="h-3 w-48 bg-zinc-800" />
        <Skeleton className="h-3 w-24 bg-zinc-800" />
      </div>
      <Skeleton className="h-6 w-20 bg-zinc-800" />
    </div>
  </div>
);
