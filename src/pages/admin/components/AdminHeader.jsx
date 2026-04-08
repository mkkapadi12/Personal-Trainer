import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  adminProfile,
  logout,
} from '@/Store/features/admin/auth/admin.auth.slice';
import { Input } from '@/components/ui/input';
import { ADMIN_ICONS } from '@/lib/icons/admin.icons';

const AdminHeader = ({ collapsed, onToggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { admin } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(adminProfile());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  console.log(admin);

  // Derive page title from route
  const getPageTitle = () => {
    const path = location.pathname.split('/').pop();
    const titles = {
      dashboard: 'Dashboard',
      users: 'Users',
      products: 'Products',
      analytics: 'Analytics',
      settings: 'Settings',
      orders: 'Orders',
    };
    return titles[path] || 'Dashboard';
  };

  const getPageDescription = () => {
    const path = location.pathname.split('/').pop();
    const descriptions = {
      dashboard: 'Overview of your fitness platform',
      users: 'Manage platform users & trainers',
      products: 'Manage products & inventory',
      analytics: 'Track performance metrics',
      settings: 'Configure platform settings',
      orders: 'Manage orders',
    };
    return descriptions[path] || 'Overview of your fitness platform';
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/80">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* ── Left: Toggle + Page Info ──────────── */}
        <div className="flex items-center gap-4">
          {/* Mobile sidebar toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="lg:hidden text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60"
          >
            <ADMIN_ICONS.MENU className="h-5 w-5" />
          </Button>

          <div className="hidden sm:block">
            <h1 className="text-base font-semibold text-white leading-tight">
              {getPageTitle()}
            </h1>
            <p className="text-xs text-zinc-500 leading-tight">
              {getPageDescription()}
            </p>
          </div>
        </div>

        {/* ---center: Search --- */}
        <div className="relative hidden md:block">
          <ADMIN_ICONS.SEARCH className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
          <Input
            type="text"
            placeholder="Search..."
            className="w-72 pl-9 pr-4 h-9 bg-zinc-900 border-zinc-800 text-sm text-white placeholder:text-zinc-600 rounded-lg focus-visible:ring-lime-400/30 focus-visible:border-lime-400/50 transition-colors"
          />
        </div>

        {/* ── Right: Notifications, Profile ── */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 transition-colors"
          >
            <ADMIN_ICONS.BELL className="h-[18px] w-[18px]" />
            {/* Notification dot */}
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-lime-400 ring-2 ring-zinc-950" />
          </Button>

          {/* Separator */}
          <div className="h-6 w-px bg-zinc-800 mx-1 hidden sm:block" />

          {/* Profile dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  'flex items-center gap-2.5 rounded-lg px-2 py-1.5',
                  'hover:bg-zinc-800/60 transition-colors duration-200',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/30',
                )}
              >
                <Avatar className="h-8 w-8 ring-2 ring-zinc-700/60">
                  <AvatarImage src={admin?.avatar} />
                  <AvatarFallback className="bg-lime-400/15 text-lime-400 text-xs font-semibold">
                    {admin?.name.split(' ')[0]?.charAt(0) || 'A'}
                    {admin?.name.split(' ')[1]?.charAt(0) || 'D'}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-zinc-200 leading-tight">
                    {admin?.name ? `${admin.name}` : 'Admin'}
                  </p>
                  <p className="text-[11px] text-zinc-500 leading-tight">
                    {admin?.email || 'admin@personaltrainer.com'}
                  </p>
                </div>
                <ADMIN_ICONS.CHEVRONDOWN className="h-3.5 w-3.5 text-zinc-500 hidden md:block" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56 bg-zinc-900 border-zinc-800 text-zinc-200"
            >
              <DropdownMenuLabel className="text-zinc-400 text-xs font-normal">
                Signed in as{' '}
                <span className="text-zinc-200 font-medium">
                  {admin?.email || 'admin'}
                </span>
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="bg-zinc-800" />

              <DropdownMenuItem
                className="gap-2 cursor-pointer focus:bg-zinc-800 focus:text-zinc-100"
                onClick={() => navigate('/admin/dashboard')}
              >
                <ADMIN_ICONS.USER className="h-4 w-4 text-zinc-500" />
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem
                className="gap-2 cursor-pointer focus:bg-zinc-800 focus:text-zinc-100"
                disabled
              >
                <ADMIN_ICONS.SETTING className="h-4 w-4 text-zinc-500" />
                Settings
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-zinc-800" />

              <DropdownMenuItem
                className="gap-2 cursor-pointer text-red-400 focus:bg-red-500/10 focus:text-red-300"
                onClick={handleLogout}
              >
                <ADMIN_ICONS.LOGOUT className="h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
