import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ADMIN_ICONS } from '@/lib/icons/admin.icons';
import { cn } from '@/lib/utils';

const AdminPagination = ({
  currentPage,
  totalPages,
  totalItems,
  limit = 5,
  onPageChange,
  itemName = 'items',
}) => {
  const nextPageRef = useRef(null);
  const prevPageRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts when typing in inputs/textareas
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }
      if (e.key === 'n') {
        nextPageRef.current?.click();
      }
      if (e.key === 'p') {
        prevPageRef.current?.click();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-1">
      <p className="text-xs text-zinc-500 tabular-nums">
        Showing{' '}
        <span className="font-medium text-zinc-300">
          {(currentPage - 1) * limit + 1}
        </span>{' '}
        to{' '}
        <span className="font-medium text-zinc-300">
          {Math.min(currentPage * limit, totalItems)}
        </span>{' '}
        of <span className="font-medium text-zinc-300">{totalItems}</span>{' '}
        {itemName}
      </p>
      <div className="flex items-center gap-1">
        {/* First page */}
        <Button
          variant="ghost"
          size="icon-sm"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(1)}
          className="text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60 disabled:opacity-30 h-8 w-8"
        >
          <ADMIN_ICONS.CHEVRONSLEFT className="h-4 w-4" />
        </Button>

        {/* Previous */}
        <Button
          variant="ghost"
          size="icon-sm"
          ref={prevPageRef}
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60 disabled:opacity-30 h-8 w-8"
        >
          <ADMIN_ICONS.CHEVRONLEFT className="h-4 w-4" />
        </Button>

        {/* Page numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              'h-8 w-8 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-center',
              page === currentPage
                ? 'bg-lime-400 text-zinc-900 shadow-md shadow-lime-400/20'
                : 'text-zinc-500 hover:bg-zinc-800/60 hover:text-zinc-200',
            )}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <Button
          variant="ghost"
          size="icon-sm"
          ref={nextPageRef}
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60 disabled:opacity-30 h-8 w-8"
        >
          <ADMIN_ICONS.CHEVRONRIGHT className="h-4 w-4" />
        </Button>

        {/* Last page */}
        <Button
          variant="ghost"
          size="icon-sm"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(totalPages)}
          className="text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60 disabled:opacity-30 h-8 w-8"
        >
          <ADMIN_ICONS.CHEVRONS_RIGHT className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AdminPagination;
