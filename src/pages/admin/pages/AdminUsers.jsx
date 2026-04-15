import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '@/Store/features/admin/auth/admin.auth.slice';
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
import { inputClass } from '../constants';
import SortableHeader from '../components/SortableHeader';

// ─── Sort options for users ─────────────────────────────
const userSortOptions = [
  { value: 'createdAt', label: 'Newest First' },
  { value: 'updatedAt', label: 'Recently Updated' },
];

// ─── Column helper ──────────────────────────────────────
const columnHelper = createColumnHelper();

// ═════════════════════════════════════════════════════════
const AdminUsers = () => {
  const { users, loading, totalUsers, totalPages, currentPage } = useSelector(
    (state) => state.admin,
  );
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const nextPageRef = useRef(null);
  const prevPageRef = useRef(null);

  // ── Local state ──────────────────────────────────────
  const [sort, setSort] = useState('createdAt');
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState([]);

  // ── Fetch users ──────────────────────────────────────
  const fetchUsers = useCallback(
    (overrides = {}) => {
      dispatch(
        getAllUsers({
          sort: overrides.sort ?? sort,
          page: overrides.page ?? 1,
          limit: 5,
          search: overrides.search ?? search,
        }),
      );
    },
    [dispatch, sort, search],
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  // ── Handlers ──────────────────────────────────────────
  const handleSortChange = (value) => {
    setSort(value);
    fetchUsers({ sort: value });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchUsers({ search: value });
  };

  const handleClearFilters = () => {
    setSearch('');
    setSort('createdAt');
    dispatch(getAllUsers({ sort: 'createdAt', page: 1, limit: 5, search: '' }));
  };

  // ── Stats ─────────────────────────────────────────────
  const verifiedCount = (users || []).length;
  const uniqueEmails = [...new Set((users || []).map((u) => u.email))];

  const statsCards = [
    {
      label: 'Total Users',
      value: totalUsers || users?.length || 0,
      icon: ADMIN_ICONS.USERS,
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-400',
    },
    {
      label: 'Active This Page',
      value: verifiedCount,
      icon: ADMIN_ICONS.CHECKCIRCLE2,
      iconBg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-400',
    },
    {
      label: 'Total Pages',
      value: totalPages || 1,
      icon: ADMIN_ICONS.PRODUCTS,
      iconBg: 'bg-lime-400/10',
      iconColor: 'text-lime-400',
    },
    {
      label: 'Unique Emails',
      value: uniqueEmails.length,
      icon: ADMIN_ICONS.MAIL,
      iconBg: 'bg-amber-500/10',
      iconColor: 'text-amber-400',
    },
  ];

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

  // ── TanStack Table columns ────────────────────────────
  const columns = useMemo(
    () => [
      columnHelper.accessor('firstName', {
        header: ({ column }) => <SortableHeader column={column} label="User" />,
        cell: ({ row }) => {
          const user = row.original;
          const initials =
            `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
          return (
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-9 w-9 rounded-full bg-linear-to-br from-lime-400/20 to-emerald-500/20 border border-zinc-700/50 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-lime-400">
                  {initials}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate max-w-[200px]">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-zinc-500 truncate">{user.email}</p>
              </div>
            </div>
          );
        },
        enableSorting: true,
      }),

      columnHelper.accessor('email', {
        header: ({ column }) => (
          <SortableHeader column={column} label="Email" />
        ),
        cell: ({ getValue }) => (
          <div className="flex items-center gap-2 min-w-0">
            <ADMIN_ICONS.MAIL className="h-3.5 w-3.5 text-zinc-600 shrink-0" />
            <span className="text-sm text-zinc-300 truncate max-w-[220px]">
              {getValue()}
            </span>
          </div>
        ),
        enableSorting: true,
      }),

      columnHelper.accessor('phone', {
        header: ({ column }) => (
          <SortableHeader column={column} label="Phone" />
        ),
        cell: ({ getValue }) => (
          <span className="text-sm text-zinc-400 tabular-nums">
            {getValue() || '—'}
          </span>
        ),
        enableSorting: false,
      }),

      columnHelper.accessor('createdAt', {
        header: ({ column }) => (
          <SortableHeader column={column} label="Joined" />
        ),
        cell: ({ getValue }) => {
          const date = new Date(getValue());
          return (
            <div className="flex flex-col">
              <span className="text-sm text-zinc-300">
                {date.toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
              <span className="text-xs text-zinc-600">
                {date.toLocaleTimeString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
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
          const user = row.original;
          return (
            <div className="flex items-center justify-end gap-1">
              <button
                className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-zinc-700/50 transition-colors"
                title="View Details"
              >
                <ADMIN_ICONS.EYE className="h-4 w-4" />
              </button>

              <button
                className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-zinc-700/50 transition-colors"
                title="More Options"
              >
                <ADMIN_ICONS.MOREHORIZONTAL className="h-4 w-4" />
              </button>
            </div>
          );
        },
      }),
    ],
    [],
  );

  // ── Table instance ────────────────────────────────────
  const table = useReactTable({
    data: users || [],
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
              placeholder="Search users by name or email..."
              value={search}
              onChange={handleSearchChange}
              className={cn('pl-9 h-9', inputClass)}
            />
          </div>

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
              {userSortOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Clear filters */}
          {(search || sort !== 'createdAt') && (
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

          {/* Results count badge */}
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <ADMIN_ICONS.USERS className="h-3.5 w-3.5" />
            <span>
              <span className="font-medium text-zinc-300">
                {totalUsers || 0}
              </span>{' '}
              users total
            </span>
          </div>
        </div>
      </div>

      {/* ── Users Table (TanStack + shadcn) ──────────── */}
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
                      <ADMIN_ICONS.USERS className="h-6 w-6 text-zinc-500" />
                    </div>
                    <p className="text-sm text-zinc-500">No users found</p>
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
              {Math.min(currentPage * 5, totalUsers)}
            </span>{' '}
            of <span className="font-medium text-zinc-300">{totalUsers}</span>{' '}
            users
          </p>
          <div className="flex items-center gap-1">
            {/* First page */}
            <Button
              variant="ghost"
              size="icon-sm"
              disabled={currentPage <= 1}
              onClick={() => fetchUsers({ page: 1 })}
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
              onClick={() => fetchUsers({ page: currentPage - 1 })}
              className="text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60 disabled:opacity-30"
            >
              <ADMIN_ICONS.CHEVRONLEFT className="h-4 w-4" />
            </Button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => fetchUsers({ page })}
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
              onClick={() => fetchUsers({ page: currentPage + 1 })}
              className="text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60 disabled:opacity-30"
            >
              <ADMIN_ICONS.CHEVRONRIGHT className="h-4 w-4" />
            </Button>

            {/* Last page */}
            <Button
              variant="ghost"
              size="icon-sm"
              disabled={currentPage >= totalPages}
              onClick={() => fetchUsers({ page: totalPages })}
              className="text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60 disabled:opacity-30"
            >
              <ADMIN_ICONS.CHEVRONS_RIGHT className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
