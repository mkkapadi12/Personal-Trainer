import React from 'react';
import { ADMIN_ICONS } from '@/lib/icons/admin.icons';

const SortableHeader = ({ column, label }) => {
  const sorted = column.getIsSorted();

  return (
    <button
      className="flex items-center gap-1.5 hover:text-zinc-200 transition-colors group"
      onClick={() => column.toggleSorting(sorted === 'asc')}
    >
      <span className="text-xs font-semibold uppercase tracking-wider">
        {label}
      </span>
      <span className="flex flex-col">
        {sorted === 'asc' ? (
          <ADMIN_ICONS.ARROWUP className="h-3.5 w-3.5 text-lime-400" />
        ) : sorted === 'desc' ? (
          <ADMIN_ICONS.ARROWDOWN className="h-3.5 w-3.5 text-lime-400" />
        ) : (
          <ADMIN_ICONS.ARROWUPDOWN className="h-3.5 w-3.5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
        )}
      </span>
    </button>
  );
};

export default SortableHeader;
