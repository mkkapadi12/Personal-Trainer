import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { cn, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { appoServiceOptions, appoSortOptions, inputClass } from '../constants';
import {
  getAllAppointmentsAdminAsync,
  toggleAppointmentStatusAsync,
} from '@/Store/features/appointment/appointment.slice';
import SortableHeader from '../components/SortableHeader';

// ─── Column helper ──────────────────────────────────────
const columnHelper = createColumnHelper();

// ═════════════════════════════════════════════════════════
const AdminAppointments = () => {
  const {
    adminAppointment: appointments,
    loading,
    totalAppointments,
    totalPages,
    currentPage,
  } = useSelector((state) => state.appointment);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const nextPageRef = useRef(null);
  const prevPageRef = useRef(null);

  // ── Local state ──────────────────────────────────────
  const [sort, setSort] = useState('latest');
  const [service, setService] = useState('all');
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [sorting, setSorting] = useState([]);

  // ── Fetch appointments ────────────────────────────────────
  const fetchAppointments = useCallback(
    (overrides = {}) => {
      dispatch(
        getAllAppointmentsAdminAsync({
          service: overrides.service ?? service,
          sort: overrides.sort ?? sort,
          page: overrides.page ?? 1,
          search: overrides.search ?? search,
          limit: 10,
        }),
      );
    },
    [dispatch, service, sort, search],
  );

  useEffect(() => {
    fetchAppointments();
  }, []);

  // ── Handlers ──────────────────────────────────────────
  const handleServiceChange = (value) => {
    setService(value);
    fetchAppointments({ service: value, page: 1 });
  };

  const handleSortChange = (value) => {
    setSort(value);
    fetchAppointments({ sort: value, page: 1 });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchAppointments({ search: value, page: 1 });
  };

  const handleClearFilters = () => {
    setSearch('');
    setService('all');
    setSort('latest');
    dispatch(
      getAllAppointmentsAdminAsync({
        service: 'all',
        sort: 'latest',
        page: 1,
        search: '',
        limit: 10,
      }),
    );
  };

  const handleDelete = async (id) => {
    try {
      // NOTE: backend un-implemented for delete
      toast.success('Appointment deleted (mock)');
      setDeleteId(null);
    } catch (err) {
      toast.error(err || 'Failed to delete appointment');
    }
  };

  const handleStatusUpdate = useCallback(
    async (id, status) => {
      try {
        await dispatch(toggleAppointmentStatusAsync({ id, status })).unwrap();
        fetchAppointments();
        toast.success(`Appointment status updated to ${status}`);
      } catch (err) {
        toast.error(err || 'Failed to update status');
      }
    },
    [dispatch],
  );

  // ── Stats ─────────────────────────────────────────────
  const statsCards = [
    {
      label: 'Total Bookings',
      value: totalAppointments || appointments?.length || 0,
      icon: ADMIN_ICONS.CALENDAR,
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-400',
    },
    {
      label: 'Booked',
      value: appointments?.filter((a) => a.status === 'booked').length || 0,
      icon: ADMIN_ICONS.CLOCK,
      iconBg: 'bg-amber-500/10',
      iconColor: 'text-amber-400',
    },
    {
      label: 'Confirmed',
      value: appointments?.filter((a) => a.status === 'confirmed').length || 0,
      icon: ADMIN_ICONS.CHECKCIRCLE2,
      iconBg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-400',
    },
    {
      label: 'Completed',
      value: appointments?.filter((a) => a.status === 'completed').length || 0,
      icon: ADMIN_ICONS.CHECKCIRCLE2,
      iconBg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-400',
    },
    {
      label: 'Cancelled',
      value: appointments?.filter((a) => a.status === 'cancelled').length || 0,
      icon: ADMIN_ICONS.XCIRCLE,
      iconBg: 'bg-red-500/10',
      iconColor: 'text-red-400',
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      // prevent "/" typing when trying to use it as shortcut outside fields
      if (
        e.key === '/' &&
        e.target.tagName !== 'INPUT' &&
        e.target.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (
        e.key === 'n' &&
        e.target.tagName !== 'INPUT' &&
        e.target.tagName !== 'TEXTAREA'
      ) {
        nextPageRef.current?.click();
      }
      if (
        e.key === 'p' &&
        e.target.tagName !== 'INPUT' &&
        e.target.tagName !== 'TEXTAREA'
      ) {
        prevPageRef.current?.click();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // ── TanStack Table columns ────────────────────────────
  const columns = useMemo(
    () => [
      columnHelper.accessor('firstName', {
        header: ({ column }) => (
          <SortableHeader column={column} label="Client" />
        ),
        cell: ({ row }) => {
          const appo = row.original;
          return (
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-10 w-10 rounded-lg overflow-hidden bg-linear-to-br from-lime-500/20 to-lime-600/10 shrink-0 border border-lime-500/20 flex items-center justify-center text-lime-400 font-bold uppercase">
                {appo.firstName?.charAt(0)}
                {appo.lastName?.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate max-w-[150px]">
                  {appo.firstName} {appo.lastName}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5 text-xs text-zinc-500 truncate">
                  <ADMIN_ICONS.PHONE className="w-3 h-3" />
                  {appo.phone}
                </div>
              </div>
            </div>
          );
        },
        enableSorting: true,
      }),

      columnHelper.accessor('service', {
        header: ({ column }) => (
          <SortableHeader column={column} label="Service Info" />
        ),
        cell: ({ row }) => {
          const appo = row.original;
          return (
            <div className="flex flex-col gap-1">
              <span className="inline-flex w-fit items-center text-xs font-semibold px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700/40">
                {appoServiceOptions.find((opt) => opt.value === appo.service)
                  ?.label ||
                  appo.service ||
                  'N/A'}
              </span>
              <span className="text-xs text-zinc-500">
                Duration: {appo.duration} mins
              </span>
            </div>
          );
        },
        enableSorting: true,
      }),

      columnHelper.accessor('date', {
        header: ({ column }) => (
          <SortableHeader column={column} label="Schedule" />
        ),
        cell: ({ row }) => {
          const appo = row.original;
          return (
            <div className="flex flex-col min-w-[120px]">
              <span className="text-sm font-semibold text-white tabular-nums flex items-center gap-1.5">
                <ADMIN_ICONS.CALENDAR className="w-3.5 h-3.5 text-zinc-400" />
                {appo.date}
              </span>
              <span className="text-xs text-zinc-500 mt-0.5 flex items-center gap-1.5">
                <ADMIN_ICONS.CLOCK className="w-3.5 h-3.5 text-zinc-400" />
                {appo.time}
              </span>
            </div>
          );
        },
        enableSorting: true,
      }),

      columnHelper.accessor('status', {
        header: ({ column }) => (
          <SortableHeader column={column} label="Status" />
        ),
        cell: ({ getValue }) => {
          const status = getValue() || 'booked';
          return (
            <span
              className={cn(
                'inline-flex items-center text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full',
                status === 'booked' &&
                  'bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20',
                status === 'confirmed' &&
                  'bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20',
                status === 'completed' &&
                  'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20',
                status === 'cancelled' &&
                  'bg-red-500/10 text-red-400 ring-1 ring-red-500/20',
                !['booked', 'confirmed', 'completed', 'cancelled'].includes(
                  status,
                ) && 'bg-zinc-800 text-zinc-400 border border-zinc-700/50',
              )}
            >
              {status}
            </span>
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
          const appo = row.original;
          return (
            <div className="flex items-center justify-end gap-2">
              <Select
                value={appo.status || 'booked'}
                onValueChange={(val) => handleStatusUpdate(appo._id, val)}
              >
                <SelectTrigger className="h-8 w-[110px] border-zinc-700/50 bg-zinc-800/50 text-xs font-semibold px-2 hover:bg-zinc-700 transition-colors capitalize text-zinc-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-300">
                  <SelectItem value="booked">Booked</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              {deleteId === appo._id ? (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleDelete(appo._id)}
                    className="p-1.5 rounded-md text-red-400 hover:bg-red-500/15 transition-colors"
                    title="Confirm delete"
                  >
                    <ADMIN_ICONS.TRASH2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDeleteId(null)}
                    className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-300 hover:bg-zinc-700/50 transition-colors"
                    title="Cancel"
                  >
                    <ADMIN_ICONS.X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setDeleteId(appo._id)}
                  className="p-1.5 rounded-md text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Delete"
                >
                  <ADMIN_ICONS.TRASH2 className="h-4 w-4" />
                </button>
              )}
            </div>
          );
        },
      }),
    ],
    [deleteId, handleDelete, handleStatusUpdate],
  );

  // ── Table instance ────────────────────────────────────
  const table = useReactTable({
    data: appointments || [],
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
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        {statsCards.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
          <div
            key={label}
            className="group relative rounded-xl bg-zinc-900 border border-zinc-800/60 p-5 hover:border-zinc-700/80 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-br from-lime-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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

      {/* ── Filter / Sort / Add Bar ────────────────── */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800/60 p-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3">
          {/* Search */}
          <div className="relative w-full lg:w-72">
            <ADMIN_ICONS.SEARCH className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
            <Input
              type="text"
              ref={inputRef}
              placeholder="Search clients by name, email, phone..."
              value={search}
              onChange={handleSearchChange}
              className={cn('pl-9 h-9', inputClass)}
            />
          </div>

          {/* Service Filter */}
          <Select value={service} onValueChange={handleServiceChange}>
            <SelectTrigger
              className={cn(
                'w-full lg:w-44 h-9',
                'bg-zinc-900 border-zinc-800 text-zinc-300',
                'focus:ring-lime-400/30 focus:border-lime-400/50',
              )}
            >
              <div className="flex items-center gap-2">
                <ADMIN_ICONS.FILTER className="h-3.5 w-3.5 text-zinc-500" />
                <SelectValue placeholder="Service" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-200">
              <SelectItem value="all">All Services</SelectItem>
              {appoServiceOptions.map((opt) => (
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
                'w-full lg:w-48 h-9',
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
              {appoSortOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Clear filters */}
          {(search || service !== 'all' || sort !== 'latest') && (
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

          {/* Spacer */}
          <div className="flex-1" />
        </div>
      </div>

      {/* ── Appointments Table (TanStack + shadcn) ─────── */}
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
                      <ADMIN_ICONS.CALENDAR className="h-6 w-6 text-zinc-500" />
                    </div>
                    <p className="text-sm text-zinc-500">
                      No appointments found
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearFilters}
                      className="text-lime-400 hover:text-lime-300 hover:bg-lime-400/10 mt-2"
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-1 pb-4">
          <p className="text-xs text-zinc-500 tabular-nums">
            Showing{' '}
            <span className="font-medium text-zinc-300">
              {(currentPage - 1) * 10 + 1}
            </span>{' '}
            to{' '}
            <span className="font-medium text-zinc-300">
              {Math.min(currentPage * 10, totalAppointments)}
            </span>{' '}
            of{' '}
            <span className="font-medium text-zinc-300">
              {totalAppointments}
            </span>{' '}
            appointments
          </p>
          <div className="flex items-center gap-1">
            {/* First page */}
            <Button
              variant="ghost"
              size="icon-sm"
              disabled={currentPage <= 1}
              onClick={() => fetchAppointments({ page: 1 })}
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
              onClick={() => fetchAppointments({ page: currentPage - 1 })}
              className="text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60 disabled:opacity-30 h-8 w-8"
            >
              <ADMIN_ICONS.CHEVRONLEFT className="h-4 w-4" />
            </Button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => fetchAppointments({ page })}
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
              onClick={() => fetchAppointments({ page: currentPage + 1 })}
              className="text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60 disabled:opacity-30 h-8 w-8"
            >
              <ADMIN_ICONS.CHEVRONRIGHT className="h-4 w-4" />
            </Button>

            {/* Last page */}
            <Button
              variant="ghost"
              size="icon-sm"
              disabled={currentPage >= totalPages}
              onClick={() => fetchAppointments({ page: totalPages })}
              className="text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60 disabled:opacity-30 h-8 w-8"
            >
              <ADMIN_ICONS.CHEVRONS_RIGHT className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAppointments;
