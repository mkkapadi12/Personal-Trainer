import React from 'react';
import { Button } from '@/components/ui/button';
import { PAGE_ICONS } from '@/lib/icons/page.icons';

const GiftWrap = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-zinc-900 border border-zinc-800 p-5 rounded-sm gap-4 mt-6">
      <div className="flex items-center gap-3 text-zinc-300">
        <div className="w-10 h-10 rounded-full bg-[#d7fb00]/10 flex items-center justify-center shrink-0">
           <PAGE_ICONS.GIFT size={18} className="text-[#d7fb00]" />
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-100">Make it a gift?</p>
          <p className="text-xs text-zinc-400">Add a premium Gift Wrap to your order for ₹500</p>
        </div>
      </div>

      <Button variant="outline" className="w-full sm:w-auto border-zinc-700 hover:bg-zinc-800 text-zinc-300 rounded-sm text-xs font-semibold tracking-wider">
        ADD GIFT WRAP
      </Button>
    </div>
  );
};

export default GiftWrap;
