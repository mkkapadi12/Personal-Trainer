import React from 'react';
import { Button } from '@/components/ui/button';
import { PAGE_ICONS } from '@/lib/icons/page.icons';

const GiftWrap = () => {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 mt-6">
      <div className="flex items-center gap-3">
        <PAGE_ICONS.GIFT size={20} />
        <p className="text-sm">Add a Gift Wrap to your order, For Rs. 500.00</p>
      </div>

      <Button className="bg-[#d7fb00] text-black">ADD A GIFT WRAP</Button>
    </div>
  );
};

export default GiftWrap;
