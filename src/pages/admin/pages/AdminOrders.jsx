import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAdminOrders,
  updateOrderStatus,
} from '../../../Store/features/orders/order.slice';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ADMIN_ICONS } from '@/lib/icons/admin.icons';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { inputClass } from '../constants';

// ─── Constants ──────────────────────────────────────────
const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

const sortOptions = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
];

const STATUS_CONFIG = {
  pending: {
    label: 'Pending',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    ring: 'ring-amber-500/20',
    dot: 'bg-amber-400',
  },
  completed: {
    label: 'Completed',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    ring: 'ring-emerald-500/20',
    dot: 'bg-emerald-400',
  },
  cancelled: {
    label: 'Cancelled',
    bg: 'bg-red-500/10',
    text: 'text-red-400',
    ring: 'ring-red-500/20',
    dot: 'bg-red-400',
  },
};

// ─── Column helper ──────────────────────────────────────
const columnHelper = createColumnHelper();

// ═════════════════════════════════════════════════════════
const AdminOrders = () => {
  const { adminOrders, loading, totalOrders, totalPages, currentPage } =
    useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const nextPageRef = useRef(null);
  const prevPageRef = useRef(null);

  // ── Local state ──────────────────────────────────────
  const [sort, setSort] = useState('latest');
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState([]);
  const [detailOrder, setDetailOrder] = useState(null);

  // ── Derived data ──────────────────────────────────────
  const pendingCount = (adminOrders || []).filter(
    (o) => o.status === 'pending',
  ).length;
  const completedCount = (adminOrders || []).filter(
    (o) => o.status === 'completed',
  ).length;
  const cancelledCount = (adminOrders || []).filter(
    (o) => o.status === 'cancelled',
  ).length;

  const totalRevenue = (adminOrders || [])
    .filter((o) => o.status === 'completed')
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  // ── Fetch orders ─────────────────────────────────────
  const fetchOrders = useCallback(
    (overrides = {}) => {
      dispatch(
        fetchAdminOrders({
          status: overrides.status ?? statusFilter,
          sort: overrides.sort ?? sort,
          page: overrides.page ?? 1,
          search: overrides.search ?? search,
        }),
      );
    },
    [dispatch, statusFilter, sort, search],
  );

  useEffect(() => {
    fetchOrders();
  }, []);

  // ── Handlers ──────────────────────────────────────────
  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    fetchOrders({ status: value });
  };

  const handleSortChange = (value) => {
    setSort(value);
    fetchOrders({ sort: value });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchOrders({ search: value || 'all' });
  };

  const handleClearFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setSort('latest');
    dispatch(
      fetchAdminOrders({
        status: 'all',
        sort: 'latest',
        page: 1,
        search: 'all',
      }),
    );
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await dispatch(
        updateOrderStatus({ id: orderId, status: newStatus }),
      ).unwrap();
      toast.success(`Order status updated to ${newStatus}`);
    } catch (err) {
      toast.error(err || 'Failed to update order status');
    }
  };

  // ── Keyboard shortcuts ────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/') {
        e.preventDefault();
        inputRef.current?.focus();
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

  // ── Stats ─────────────────────────────────────────────
  const statsCards = [
    {
      label: 'Total Orders',
      value: totalOrders || adminOrders?.length || 0,
      icon: ADMIN_ICONS.SHOPPINGCART,
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-400',
    },
    {
      label: 'Pending',
      value: pendingCount,
      icon: ADMIN_ICONS.CLOCK,
      iconBg: 'bg-amber-500/10',
      iconColor: 'text-amber-400',
    },
    {
      label: 'Completed',
      value: completedCount,
      icon: ADMIN_ICONS.CHECK,
      iconBg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-400',
    },
    {
      label: 'Revenue',
      value: `₹${totalRevenue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
      icon: ADMIN_ICONS.TRENDINGUP,
      iconBg: 'bg-lime-400/10',
      iconColor: 'text-lime-400',
    },
  ];

  // ── TanStack Table columns ────────────────────────────
  const columns = useMemo(
    () => [
      columnHelper.accessor('_id', {
        header: ({ column }) => (
          <SortableHeader column={column} label="Order ID" />
        ),
        cell: ({ getValue }) => (
          <span className="text-xs font-mono text-zinc-400 bg-zinc-800/60 px-2 py-1 rounded-md">
            #{getValue()?.slice(-8).toUpperCase()}
          </span>
        ),
        enableSorting: false,
      }),

      columnHelper.accessor('user', {
        header: ({ column }) => (
          <SortableHeader column={column} label="Customer" />
        ),
        cell: ({ getValue }) => {
          const user = getValue();
          return (
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-9 w-9 rounded-full bg-linear-to-br from-lime-400/20 to-emerald-400/20 border border-zinc-700/50 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-lime-400 uppercase">
                  {user?.firstName?.[0] || '?'}
                  {user?.lastName?.[0] || ''}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate max-w-[160px]">
                  {user?.firstName || 'Unknown'} {user?.lastName || ''}
                </p>
                <p className="text-xs text-zinc-500 truncate">
                  {user?.email || '—'}
                </p>
              </div>
            </div>
          );
        },
        enableSorting: false,
      }),

      columnHelper.accessor('items', {
        header: () => (
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Items
          </span>
        ),
        cell: ({ getValue, row }) => {
          const items = getValue();
          const products = row.original.products || [];
          const count = items?.length || 0;
          const firstProduct = products[0];
          return (
            <div className="min-w-0">
              <p className="text-sm text-white truncate max-w-[180px]">
                {firstProduct?.name || 'Product'}
              </p>
              {count > 1 && (
                <p className="text-xs text-zinc-500">
                  +{count - 1} more item{count - 1 > 1 ? 's' : ''}
                </p>
              )}
            </div>
          );
        },
        enableSorting: false,
      }),

      columnHelper.accessor('totalAmount', {
        header: ({ column }) => (
          <SortableHeader column={column} label="Amount" />
        ),
        cell: ({ getValue }) => (
          <span className="text-sm font-semibold text-white tabular-nums">
            ₹{getValue()?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </span>
        ),
        enableSorting: true,
      }),

      columnHelper.accessor('status', {
        header: ({ column }) => (
          <SortableHeader column={column} label="Status" />
        ),
        cell: ({ getValue }) => {
          const status = getValue();
          const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
          return (
            <span
              className={cn(
                'inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ring-1',
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
        },
        enableSorting: true,
      }),

      columnHelper.accessor('createdAt', {
        header: ({ column }) => <SortableHeader column={column} label="Date" />,
        cell: ({ getValue }) => {
          const date = new Date(getValue());
          return (
            <div>
              <p className="text-sm text-zinc-300 tabular-nums">
                {date.toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
              <p className="text-xs text-zinc-600 tabular-nums">
                {date.toLocaleTimeString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          );
        },
        enableSorting: true,
      }),

      columnHelper.display({
        id: 'actions',
        header: () => (
          <span className="text-right block text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Actions
          </span>
        ),
        cell: ({ row }) => {
          const order = row.original;
          return (
            <div className="flex items-center justify-end gap-1">
              <button
                onClick={() => setDetailOrder(order)}
                className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-zinc-700/50 transition-colors"
                title="View Details"
              >
                <ADMIN_ICONS.EYE className="h-4 w-4" />
              </button>

              {order.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleStatusUpdate(order._id, 'completed')}
                    className="p-1.5 rounded-md text-emerald-500/70 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                    title="Mark Completed"
                  >
                    <ADMIN_ICONS.CHECK className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(order._id, 'cancelled')}
                    className="p-1.5 rounded-md text-red-500/70 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    title="Cancel Order"
                  >
                    <ADMIN_ICONS.XCIRCLE className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>
          );
        },
      }),
    ],
    [handleStatusUpdate],
  );

  // ── Table instance ────────────────────────────────────
  const table = useReactTable({
    data: adminOrders || [],
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // ═══════════════════════════════════════════════════════
  return (
    <div className="space-y-6">
      {/* ── Stats Grid ─────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statsCards.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
          <div
            key={label}
            className="group relative rounded-xl bg-zinc-900 border border-zinc-800/60 p-5 hover:border-zinc-700/80 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-br from-lime-400/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                  {label}
                </p>
                <p className="text-2xl font-bold text-white">{value}</p>
              </div>
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-xl',
                  iconBg,
                )}
              >
                <Icon className={cn('h-5 w-5', iconColor)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Filter / Sort Bar ───────────────────────── */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800/60 p-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3">
          {/* Search */}
          <div className="relative w-full lg:w-72">
            <ADMIN_ICONS.SEARCH className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
            <Input
              type="text"
              ref={inputRef}
              placeholder="Search orders..."
              value={search}
              onChange={handleSearchChange}
              className={cn('pl-9 h-9', inputClass)}
            />
          </div>

          {/* Status filter */}
          <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
            <SelectTrigger
              className={cn(
                'w-full lg:w-44 h-9',
                'bg-zinc-900 border-zinc-800 text-zinc-300',
                'focus:ring-lime-400/30 focus:border-lime-400/50',
              )}
            >
              <div className="flex items-center gap-2">
                <ADMIN_ICONS.FILTER className="h-3.5 w-3.5 text-zinc-500" />
                <SelectValue placeholder="Status" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-200">
              {statusOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sort} onValueChange={handleSortChange}>
            <SelectTrigger
              className={cn(
                'w-full lg:w-44 h-9',
                'bg-zinc-900 border-zinc-800 text-zinc-300',
                'focus:ring-lime-400/30 focus:border-lime-400/50',
              )}
            >
              <div className="flex items-center gap-2">
                <ADMIN_ICONS.ARROWUPDOWN className="h-3.5 w-3.5 text-zinc-500" />
                <SelectValue placeholder="Sort by" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-200">
              {sortOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Clear filters */}
          {(search || statusFilter !== 'all' || sort !== 'latest') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/60 gap-1.5"
            >
              <ADMIN_ICONS.X className="h-3.5 w-3.5" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* ── Orders Table (TanStack + shadcn) ─────── */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800/60 overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-zinc-800/60 hover:bg-transparent"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-11 px-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider bg-zinc-900/50"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {/* Loading state */}
            {loading && (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={columns.length} className="h-40">
                  <div className="flex items-center justify-center">
                    <ADMIN_ICONS.LOADER2 className="h-6 w-6 text-lime-400 animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            )}

            {/* Empty state */}
            {!loading && table.getRowModel().rows.length === 0 && (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={columns.length} className="h-40">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800">
                      <ADMIN_ICONS.SHOPPINGCART className="h-6 w-6 text-zinc-500" />
                    </div>
                    <p className="text-sm text-zinc-500">No orders found</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearFilters}
                      className="text-lime-400 hover:text-lime-300 hover:bg-lime-400/10"
                    >
                      Clear filters
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {/* Data rows */}
            {!loading &&
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-zinc-800/40 hover:bg-zinc-800/30 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* ── Pagination ──────────────────────────────── */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-1">
          <p className="text-xs text-zinc-500 tabular-nums">
            Showing{' '}
            <span className="font-medium text-zinc-300">
              {(currentPage - 1) * 5 + 1}
            </span>{' '}
            to{' '}
            <span className="font-medium text-zinc-300">
              {Math.min(currentPage * 5, totalOrders)}
            </span>{' '}
            of <span className="font-medium text-zinc-300">{totalOrders}</span>{' '}
            orders
          </p>
          <div className="flex items-center gap-1">
            {/* First page */}
            <Button
              variant="ghost"
              size="icon-sm"
              disabled={currentPage <= 1}
              onClick={() => fetchOrders({ page: 1 })}
              className="text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60 disabled:opacity-30"
            >
              <ADMIN_ICONS.CHEVRONSLEFT className="h-4 w-4" />
            </Button>

            {/* Previous */}
            <Button
              variant="ghost"
              size="icon-sm"
              ref={prevPageRef}
              disabled={currentPage <= 1}
              onClick={() => fetchOrders({ page: currentPage - 1 })}
              className="text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60 disabled:opacity-30"
            >
              <ADMIN_ICONS.CHEVRONLEFT className="h-4 w-4" />
            </Button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => fetchOrders({ page })}
                className={cn(
                  'h-8 w-8 rounded-lg text-xs font-medium transition-all duration-200',
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
              onClick={() => fetchOrders({ page: currentPage + 1 })}
              className="text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60 disabled:opacity-30"
            >
              <ADMIN_ICONS.CHEVRONRIGHT className="h-4 w-4" />
            </Button>

            {/* Last page */}
            <Button
              variant="ghost"
              size="icon-sm"
              disabled={currentPage >= totalPages}
              onClick={() => fetchOrders({ page: totalPages })}
              className="text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60 disabled:opacity-30"
            >
              <ADMIN_ICONS.CHEVRONS_RIGHT className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ── Order Detail Dialog ──────────────────────── */}
      <Dialog
        open={!!detailOrder}
        onOpenChange={(open) => !open && setDetailOrder(null)}
      >
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white sm:max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <ADMIN_ICONS.SHOPPINGCART className="h-5 w-5 text-lime-400" />
              Order Details
            </DialogTitle>
            <DialogDescription className="text-zinc-500">
              Order #{detailOrder?._id?.slice(-8).toUpperCase()}
            </DialogDescription>
          </DialogHeader>

          {detailOrder && (
            <div className="space-y-5 py-2">
              {/* Customer info */}
              <div className="rounded-lg bg-zinc-900/80 border border-zinc-800/60 p-4 space-y-3">
                <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  Customer
                </h4>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-linear-to-br from-lime-400/20 to-emerald-400/20 border border-zinc-700/50 flex items-center justify-center">
                    <span className="text-sm font-bold text-lime-400 uppercase">
                      {detailOrder.user?.firstName?.[0] || '?'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {detailOrder.user?.firstName || 'Unknown'}{' '}
                      {detailOrder.user?.lastName || ''}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {detailOrder.user?.email || '—'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status & date */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-zinc-900/80 border border-zinc-800/60 p-4 space-y-2">
                  <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Status
                  </h4>
                  {(() => {
                    const config =
                      STATUS_CONFIG[detailOrder.status] ||
                      STATUS_CONFIG.pending;
                    return (
                      <span
                        className={cn(
                          'inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ring-1',
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
                <div className="rounded-lg bg-zinc-900/80 border border-zinc-800/60 p-4 space-y-2">
                  <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Date
                  </h4>
                  <p className="text-sm text-zinc-300">
                    {new Date(detailOrder.createdAt).toLocaleDateString(
                      'en-IN',
                      {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      },
                    )}
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="rounded-lg bg-zinc-900/80 border border-zinc-800/60 p-4 space-y-3">
                <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  Items ({detailOrder.items?.length || 0})
                </h4>
                <div className="divide-y divide-zinc-800/50">
                  {detailOrder.items?.map((item, idx) => {
                    const product = detailOrder.products?.find(
                      (p) =>
                        p._id === item.productId ||
                        p._id === item.productId?._id,
                    );
                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg bg-zinc-800 border border-zinc-700/50 flex items-center justify-center overflow-hidden shrink-0">
                            {product?.mainImage ? (
                              <img
                                src={product.mainImage}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <ADMIN_ICONS.PACKAGE className="h-4 w-4 text-zinc-600" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm text-white">
                              {product?.name || 'Product'}
                            </p>
                            <p className="text-xs text-zinc-500">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-white tabular-nums">
                          ₹{item.price?.toLocaleString('en-IN')}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Total */}
              <div className="rounded-lg bg-linear-to-r from-lime-400/5 to-emerald-400/5 border border-lime-400/10 p-4 flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-400">
                  Total Amount
                </span>
                <span className="text-lg font-bold text-lime-400 tabular-nums">
                  ₹
                  {detailOrder.totalAmount?.toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>

              {/* Status update actions */}
              {detailOrder.status === 'pending' && (
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      handleStatusUpdate(detailOrder._id, 'completed');
                      setDetailOrder(null);
                    }}
                    className="flex-1 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 gap-2"
                  >
                    <ADMIN_ICONS.CHECK className="h-4 w-4" />
                    Mark Completed
                  </Button>
                  <Button
                    onClick={() => {
                      handleStatusUpdate(detailOrder._id, 'cancelled');
                      setDetailOrder(null);
                    }}
                    className="flex-1 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 gap-2"
                  >
                    <ADMIN_ICONS.XCIRCLE className="h-4 w-4" />
                    Cancel Order
                  </Button>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setDetailOrder(null)}
              className="text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// ─── Sortable header component ──────────────────────────
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

export default AdminOrders;
