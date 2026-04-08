import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getProducts,
  addProduct,
  deleteProduct,
} from '../../../Store/features/product/product.slice';
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import {
  categoryOptions,
  emptyForm,
  inputClass,
  sortOptions,
} from '../constants';

// ─── Column helper ──────────────────────────────────────
const columnHelper = createColumnHelper();

// ═════════════════════════════════════════════════════════
const AdminProducts = () => {
  const { products, loading, totalProducts, totalPages, currentPage } =
    useSelector((state) => state.products);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const nextPageRef = useRef(null);
  const prevPageRef = useRef(null);

  // ── Local state ──────────────────────────────────────
  const [sort, setSort] = useState('latest');
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState(null);
  const [sorting, setSorting] = useState([]);

  // ── Derived data ──────────────────────────────────────
  const uniqueCategories = [
    ...new Set((products || []).map((p) => p.category)),
  ];
  const uniqueBrands = [...new Set((products || []).map((p) => p.brand))];

  // ── Fetch products ────────────────────────────────────
  const fetchProducts = useCallback(
    (overrides = {}) => {
      dispatch(
        getProducts({
          category: overrides.category ?? category,
          sort: overrides.sort ?? sort,
          page: overrides.page ?? 1,
          search: overrides.search ?? search,
        }),
      );
    },
    [dispatch, category, sort, search],
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  // ── Handlers ──────────────────────────────────────────
  const handleCategoryChange = (value) => {
    setCategory(value);
    fetchProducts({ category: value });
  };

  const handleSortChange = (value) => {
    setSort(value);
    fetchProducts({ sort: value });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchProducts({ search: value });
  };

  const handleClearFilters = () => {
    setSearch('');
    setCategory('all');
    setSort('latest');
    dispatch(
      getProducts({ category: 'all', sort: 'latest', page: 1, search: '' }),
    );
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddProduct = async () => {
    if (
      !formData.name ||
      !formData.price ||
      !formData.category ||
      !formData.description ||
      !formData.mainImage
    ) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      await dispatch(
        addProduct({
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock) || 0,
        }),
      ).unwrap();
      toast.success('Product created successfully');
      setFormData(emptyForm);
      setDialogOpen(false);
      fetchProducts();
    } catch (err) {
      toast.error(err || 'Failed to create product');
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      toast.success('Product deleted');
      setDeleteId(null);
    } catch (err) {
      toast.error(err || 'Failed to delete product');
    }
  };

  // ── Stats ─────────────────────────────────────────────
  const statsCards = [
    {
      label: 'Total Products',
      value: totalProducts || products?.length || 0,
      icon: ADMIN_ICONS.PACKAGE,
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-400',
    },
    {
      label: 'Categories',
      value: uniqueCategories.length,
      icon: ADMIN_ICONS.PRODUCTS,
      iconBg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-400',
    },
    {
      label: 'Revenue',
      value: '$18.2k',
      icon: ADMIN_ICONS.TRENDINGUP,
      iconBg: 'bg-lime-400/10',
      iconColor: 'text-lime-400',
    },
    {
      label: 'Brands',
      value: uniqueBrands.length,
      icon: ADMIN_ICONS.SHIELDHALF,
      iconBg: 'bg-amber-500/10',
      iconColor: 'text-amber-400',
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/') {
        e.preventDefault(); // prevent "/" typing anywhere
        inputRef.current?.focus();
      }
      // if (e.key === 'a') {
      //   setDialogOpen(true);
      // }
      if (e.key === 'n') {
        nextPageRef.current?.click();
      }
      if (e.key === 'p') {
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
      columnHelper.accessor('name', {
        header: ({ column }) => (
          <SortableHeader column={column} label="Product" />
        ),
        cell: ({ row }) => {
          const product = row.original;
          return (
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-10 w-10 rounded-lg overflow-hidden bg-zinc-800 shrink-0 border border-zinc-700/50">
                {product.mainImage ? (
                  <img
                    src={product.mainImage}
                    alt={product.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <ADMIN_ICONS.PACKAGE className="h-4 w-4 text-zinc-600" />
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate max-w-[200px]">
                  {product.name}
                </p>
                <p className="text-xs text-zinc-500 truncate">
                  {product.brand || '—'}
                </p>
              </div>
            </div>
          );
        },
        enableSorting: true,
      }),

      columnHelper.accessor('category', {
        header: ({ column }) => (
          <SortableHeader column={column} label="Category" />
        ),
        cell: ({ getValue }) => (
          <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 capitalize border border-zinc-700/40">
            {getValue()}
          </span>
        ),
        enableSorting: true,
      }),

      columnHelper.accessor('price', {
        header: ({ column }) => (
          <SortableHeader column={column} label="Price" />
        ),
        cell: ({ getValue }) => (
          <span className="text-sm font-semibold text-white tabular-nums">
            ₹{getValue()?.toFixed(2)}
          </span>
        ),
        enableSorting: true,
      }),

      columnHelper.accessor('stock', {
        header: ({ column }) => (
          <SortableHeader column={column} label="Stock" />
        ),
        cell: ({ getValue }) => {
          const stock = getValue();
          return (
            <span
              className={cn(
                'inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full tabular-nums',
                stock > 10
                  ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20'
                  : stock > 0
                    ? 'bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20'
                    : 'bg-red-500/10 text-red-400 ring-1 ring-red-500/20',
              )}
            >
              {stock > 0 ? stock : 'Out of stock'}
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
          const product = row.original;
          return (
            <div className="flex items-center justify-end gap-1">
              <button
                className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-zinc-700/50 transition-colors"
                title="View Details"
              >
                <ADMIN_ICONS.EYE className="h-4 w-4" />
              </button>

              {deleteId === product._id ? (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleDelete(product._id)}
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
                  onClick={() => setDeleteId(product._id)}
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
    [deleteId, handleDelete],
  );

  // ── Table instance ────────────────────────────────────
  const table = useReactTable({
    data: products || [],
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

      {/* ── Filter / Sort / Add Bar ────────────────── */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800/60 p-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3">
          {/* Search */}
          <div className="relative w-full lg:w-72">
            <ADMIN_ICONS.SEARCH className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
            <Input
              type="text"
              ref={inputRef}
              placeholder="Search products..."
              value={search}
              onChange={handleSearchChange}
              className={cn('pl-9 h-9', inputClass)}
            />
          </div>

          {/* Category */}
          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger
              className={cn(
                'w-full lg:w-44 h-9',
                'bg-zinc-900 border-zinc-800 text-zinc-300',
                'focus:ring-lime-400/30 focus:border-lime-400/50',
              )}
            >
              <div className="flex items-center gap-2">
                <ADMIN_ICONS.FILTER className="h-3.5 w-3.5 text-zinc-500" />
                <SelectValue placeholder="Category" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-200">
              <SelectItem value="all">All Categories</SelectItem>
              {categoryOptions.map((cat) => (
                <SelectItem key={cat} value={cat} className="capitalize">
                  {cat}
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
              {sortOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Clear filters */}
          {(search || category !== 'all' || sort !== 'latest') && (
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

          {/* Add product */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-lime-400 hover:bg-lime-300 text-zinc-900 font-semibold gap-2 h-9">
                <ADMIN_ICONS.PLUS className="h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>

            <DialogContent className="bg-zinc-950 border-zinc-800 text-white sm:max-w-xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-white">
                  Add New Product
                </DialogTitle>
                <DialogDescription className="text-zinc-500">
                  Fill in the details to add a new product to your store.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-2">
                {/* Name */}
                <div className="space-y-2">
                  <Label className="text-zinc-300">
                    Name <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    placeholder="e.g. Premium Whey Protein"
                    value={formData.name}
                    onChange={(e) => handleFormChange('name', e.target.value)}
                    className={inputClass}
                  />
                </div>

                {/* Brand + Category */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-zinc-300">Brand</Label>
                    <Input
                      placeholder="e.g. Optimum Nutrition"
                      value={formData.brand}
                      onChange={(e) =>
                        handleFormChange('brand', e.target.value)
                      }
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-300">
                      Category <span className="text-red-400">*</span>
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(v) => handleFormChange('category', v)}
                    >
                      <SelectTrigger className="bg-zinc-900 border-zinc-800 text-zinc-300 focus:ring-lime-400/30 focus:border-lime-400/50">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-200">
                        {categoryOptions.map((cat) => (
                          <SelectItem
                            key={cat}
                            value={cat}
                            className="capitalize"
                          >
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Price + Stock */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-zinc-300">
                      Price ($) <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) =>
                        handleFormChange('price', e.target.value)
                      }
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-300">Stock</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={formData.stock}
                      onChange={(e) =>
                        handleFormChange('stock', e.target.value)
                      }
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label className="text-zinc-300">
                    Description <span className="text-red-400">*</span>
                  </Label>
                  <Textarea
                    placeholder="Product description..."
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      handleFormChange('description', e.target.value)
                    }
                    className={cn(inputClass, 'min-h-[80px]')}
                  />
                </div>

                {/* Main Image URL */}
                <div className="space-y-2">
                  <Label className="text-zinc-300">
                    Main Image URL <span className="text-red-400">*</span>
                  </Label>
                  <div className="relative">
                    <ADMIN_ICONS.IMAGEPLUS className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
                    <Input
                      placeholder="https://example.com/image.jpg"
                      value={formData.mainImage}
                      onChange={(e) =>
                        handleFormChange('mainImage', e.target.value)
                      }
                      className={cn(inputClass, 'pl-9')}
                    />
                  </div>
                  {formData.mainImage && (
                    <div className="mt-2 rounded-lg overflow-hidden border border-zinc-800 h-32 w-32">
                      <img
                        src={formData.mainImage}
                        alt="Preview"
                        className="h-full w-full object-cover"
                        onError={(e) => (e.target.style.display = 'none')}
                      />
                    </div>
                  )}
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="ghost"
                  onClick={() => setDialogOpen(false)}
                  className="text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddProduct}
                  disabled={loading}
                  className="bg-lime-400 hover:bg-lime-300 text-zinc-900 font-semibold gap-2"
                >
                  {loading ? (
                    <ADMIN_ICONS.LOADER2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ADMIN_ICONS.PLUS className="h-4 w-4" />
                  )}
                  Create Product
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* ── Products Table (TanStack + shadcn) ─────── */}
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
                      <ADMIN_ICONS.PACKAGE className="h-6 w-6 text-zinc-500" />
                    </div>
                    <p className="text-sm text-zinc-500">No products found</p>
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
              {Math.min(currentPage * 5, totalProducts)}
            </span>{' '}
            of{' '}
            <span className="font-medium text-zinc-300">{totalProducts}</span>{' '}
            products
          </p>
          <div className="flex items-center gap-1">
            {/* First page */}
            <Button
              variant="ghost"
              size="icon-sm"
              disabled={currentPage <= 1}
              onClick={() => fetchProducts({ page: 1 })}
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
              onClick={() => fetchProducts({ page: currentPage - 1 })}
              className="text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60 disabled:opacity-30"
            >
              <ADMIN_ICONS.CHEVRONLEFT className="h-4 w-4" />
            </Button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => fetchProducts({ page })}
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
              onClick={() => fetchProducts({ page: currentPage + 1 })}
              className="text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60 disabled:opacity-30"
            >
              <ADMIN_ICONS.CHEVRONRIGHT className="h-4 w-4" />
            </Button>

            {/* Last page */}
            <Button
              variant="ghost"
              size="icon-sm"
              disabled={currentPage >= totalPages}
              onClick={() => fetchProducts({ page: totalPages })}
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

export default AdminProducts;
