import { ADMIN_ICONS } from '@/lib/icons/admin.icons';

// ─── Constants ──────────────────────────────────────────
export const sortOptions = [
  { value: 'latest', label: 'Latest' },
  { value: 'rating', label: 'Rating' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
];

export const appoSortOptions = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'booked', label: 'Status: Booked' },
  { value: 'confirmed', label: 'Status: Confirmed' },
  { value: 'completed', label: 'Status: Completed' },
  { value: 'cancelled', label: 'Status: Cancelled' },
];

export const categoryOptions = [
  'cross trainer',
  'gym equipment',
  'protein powder',
  'treadmills',
  'accessories',
  'creatine',
  'mass gainer',
  'bcaa',
];

export const appoServiceOptions = [
  { value: '+$15.00', label: 'Basic Training (+$15)' },
  { value: '+$34.00', label: 'Pro Training (+$34)' },
  { value: '+$155.00', label: 'Elite Package (+$155)' },
];

export const emptyForm = {
  name: '',
  brand: '',
  category: '',
  price: '',
  description: '',
  mainImage: '',
  stock: '',
};

// ─── Dark-themed input class ────────────────────────────
export const inputClass =
  'bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-lime-400/30 focus-visible:border-lime-400/50 transition-colors';

// ─── Admin Dashboard Stats Cards ────────────────────────────
export const statsCardsDashboard = [
  {
    label: 'Total Users',
    value: '2,420',
    change: '+12.5%',
    trending: 'up',
    icon: ADMIN_ICONS.USER,
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
  },
  {
    label: 'Products',
    value: '348',
    change: '+8.2%',
    trending: 'up',
    icon: ADMIN_ICONS.PRODUCTS,
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
  },
  {
    label: 'Revenue',
    value: '₹18.2k',
    change: '+23.1%',
    trending: 'up',
    icon: ADMIN_ICONS.TRENDINGUP,
    iconBg: 'bg-lime-400/10',
    iconColor: 'text-lime-400',
  },
  {
    label: 'Active Sessions',
    value: '1,024',
    change: '-2.4%',
    trending: 'down',
    icon: ADMIN_ICONS.ACTIVITY,
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
  },
];

// ─── Admin Dashboard Recent Activity ────────────────────────────
export const recentActivity = [
  {
    id: 1,
    user: 'John Doe',
    action: 'purchased',
    target: 'Premium Whey Protein',
    time: '2 min ago',
    icon: ADMIN_ICONS.SHOPPINGBAG,
  },
  {
    id: 2,
    user: 'Sarah Miller',
    action: 'signed up',
    target: 'New account',
    time: '15 min ago',
    icon: ADMIN_ICONS.USER,
  },
  {
    id: 3,
    user: 'Mike Johnson',
    action: 'booked',
    target: 'Training Session',
    time: '32 min ago',
    icon: ADMIN_ICONS.CALENDAR,
  },
  {
    id: 4,
    user: 'Emma Wilson',
    action: 'purchased',
    target: 'Adjustable Dumbbells',
    time: '1 hr ago',
    icon: ADMIN_ICONS.SHOPPINGBAG,
  },
  {
    id: 5,
    user: 'Chris Lee',
    action: 'signed up',
    target: 'New account',
    time: '2 hrs ago',
    icon: ADMIN_ICONS.USER,
  },
];

export const navItems = [
  {
    label: 'Dashboard',
    path: '/admin/dashboard',
    icon: ADMIN_ICONS.LAYOUTDASHBOARD,
  },
  {
    label: 'Users',
    path: '/admin/users',
    icon: ADMIN_ICONS.USERS,
  },
  {
    label: 'Products',
    path: '/admin/products',
    icon: ADMIN_ICONS.PRODUCTS,
  },
  {
    label: 'Orders',
    path: '/admin/orders',
    icon: ADMIN_ICONS.SHOPPINGBAG,
  },
  {
    label: 'Appointments',
    path: '/admin/appointments',
    icon: ADMIN_ICONS.CALENDAR,
  },
  {
    label: 'Analytics',
    path: '/admin/analytics',
    icon: ADMIN_ICONS.BARCHART,
    disabled: true,
  },
  {
    label: 'Settings',
    path: '/admin/settings',
    icon: ADMIN_ICONS.SETTING,
    disabled: true,
  },
];
