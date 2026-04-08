import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { logout } from '@/Store/features/admin/auth/admin.auth.slice';
import { ADMIN_ICONS } from '@/lib/icons/admin.icons';
import { navItems } from '../constants';

const AdminSidebar = ({ collapsed, setCollapsed }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-40 h-screen flex flex-col',
        'bg-zinc-950 border-r border-zinc-800/80',
        'transition-all duration-300 ease-in-out',
        collapsed ? 'w-[72px]' : 'w-64',
      )}
    >
      {/* ── Brand Logo ────────────────────────────── */}
      <div
        className={cn(
          'flex items-center h-16 px-4 border-b border-zinc-800/80',
          collapsed ? 'justify-center' : 'gap-3',
        )}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-lime-400">
          <ADMIN_ICONS.DUMBBELL className="h-5 w-5 text-zinc-900" />
        </div>
        {!collapsed && (
          <span className="text-white font-bold text-base tracking-tight whitespace-nowrap overflow-hidden animate-in fade-in duration-300">
            Personal Trainer
          </span>
        )}
      </div>

      {/* ── Navigation ──────────────────────────── */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {!collapsed && (
          <p className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
            Menu
          </p>
        )}

        {navItems.map(({ label, path, icon: Icon, disabled }) => (
          <NavLink
            key={path}
            to={disabled ? '#' : path}
            onClick={(e) => disabled && e.preventDefault()}
            className={({ isActive }) =>
              cn(
                'group relative flex items-center rounded-lg text-sm font-medium transition-all duration-200',
                collapsed
                  ? 'justify-center h-10 w-10 mx-auto'
                  : 'gap-3 px-3 py-2.5',
                disabled && 'opacity-40 pointer-events-none',
                isActive && !disabled
                  ? 'bg-lime-400/10 text-lime-400'
                  : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-100',
              )
            }
          >
            {({ isActive }) => (
              <>
                {/* Active indicator bar */}
                {isActive && !disabled && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-lime-400 animate-in slide-in-from-left duration-200" />
                )}
                <Icon
                  className={cn(
                    'h-[18px] w-[18px] shrink-0 transition-colors duration-200',
                    isActive && !disabled
                      ? 'text-lime-400'
                      : 'text-zinc-500 group-hover:text-zinc-300',
                  )}
                />
                {!collapsed && (
                  <span className="whitespace-nowrap overflow-hidden">
                    {label}
                  </span>
                )}

                {/* Disabled badge */}
                {disabled && !collapsed && (
                  <span className="ml-auto text-[10px] font-medium text-zinc-600 bg-zinc-800 px-1.5 py-0.5 rounded">
                    Soon
                  </span>
                )}

                {/* Tooltip when collapsed */}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2.5 py-1 rounded-md bg-zinc-800 text-xs text-zinc-200 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 shadow-lg z-50">
                    {label}
                    <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-zinc-800 rotate-45" />
                  </div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ── Bottom section ───────────────────────── */}
      <div className="border-t border-zinc-800/80 p-3 space-y-2">
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            'flex items-center w-full rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/60 transition-all duration-200 text-sm',
            collapsed ? 'justify-center h-10 w-10 mx-auto' : 'gap-3 px-3 py-2',
          )}
        >
          {collapsed ? (
            <ADMIN_ICONS.CHEVRONRIGHT className="h-4 w-4" />
          ) : (
            <>
              <ADMIN_ICONS.CHEVRONLEFT className="h-4 w-4" />
              <span>Collapse</span>
            </>
          )}
        </button>

        {/* Logout */}
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            'w-full text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200',
            collapsed ? 'justify-center px-0' : 'justify-start gap-3 px-3',
          )}
        >
          <ADMIN_ICONS.LOGOUT className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </Button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
