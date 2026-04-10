import React from 'react';
import { useSelector } from 'react-redux';
import { cn } from '@/lib/utils';
import { statsCardsDashboard } from '../constants';
import { ADMIN_ICONS } from '@/lib/icons/admin.icons';
import RecentActivity from '../components/RecentActivity';

const AdminDashboard = () => {
  const { admin } = useSelector((state) => state.admin);

  return (
    <div className="space-y-6">
      {/* ── Welcome Banner ────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-zinc-900 via-zinc-900 to-zinc-800 border border-zinc-800/60 p-6 lg:p-8">
        {/* Background decorations */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-lime-400/5 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-lime-400/5 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/10 px-3 py-1 mb-2">
              <ADMIN_ICONS.DUMBBELL className="h-3.5 w-3.5 text-lime-400" />
              <span className="text-[11px] font-medium text-lime-400 uppercase tracking-wider">
                Admin Dashboard
              </span>
            </div>
            <h2 className="text-xl lg:text-2xl font-bold text-white">
              Welcome back,{' '}
              <span className="text-lime-400">{admin?.name || 'Admin'}</span>!
              👋
            </h2>
            <p className="text-sm text-zinc-400 max-w-md">
              Here's what's happening with your fitness platform today. Review
              the latest metrics and activities.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            System online
          </div>
        </div>
      </div>

      {/* ── Stats Grid ────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statsCardsDashboard.map(
          ({
            label,
            value,
            change,
            trending,
            icon: Icon,
            iconBg,
            iconColor,
          }) => (
            <div
              key={label}
              className="group relative rounded-xl bg-zinc-900 border border-zinc-800/60 p-5 hover:border-zinc-700/80 transition-all duration-300 overflow-hidden"
            >
              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-linear-to-br from-lime-400/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    {label}
                  </p>
                  <p className="text-2xl font-bold text-white">{value}</p>
                  <div className="flex items-center gap-1">
                    {trending === 'up' ? (
                      <ADMIN_ICONS.ARROWUPRIGHT className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <ADMIN_ICONS.ARROWDOWNRIGHT className="h-3.5 w-3.5 text-red-400" />
                    )}
                    <span
                      className={cn(
                        'text-xs font-medium',
                        trending === 'up' ? 'text-emerald-400' : 'text-red-400',
                      )}
                    >
                      {change}
                    </span>
                    <span className="text-xs text-zinc-600">vs last month</span>
                  </div>
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
          ),
        )}
      </div>

      {/* ── Content Grid ──────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Activity */}
        <div className="lg:col-span-2 rounded-xl bg-zinc-900 border border-zinc-800/60 overflow-hidden">
          <RecentActivity />
        </div>

        {/* Quick Overview */}
        <div className="rounded-xl bg-zinc-900 border border-zinc-800/60 overflow-hidden">
          <div className="p-5 border-b border-zinc-800/60">
            <h3 className="text-sm font-semibold text-white">Quick Overview</h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Platform health at a glance
            </p>
          </div>

          <div className="p-5 space-y-4">
            {/* Progress bars */}
            {[
              {
                label: 'Server Load',
                value: 42,
                color: 'bg-emerald-400',
              },
              {
                label: 'Storage Usage',
                value: 68,
                color: 'bg-amber-400',
              },
              {
                label: 'User Engagement',
                value: 85,
                color: 'bg-lime-400',
              },
              {
                label: 'Orders Fulfilled',
                value: 73,
                color: 'bg-blue-400',
              },
            ].map(({ label, value, color }) => (
              <div key={label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400">{label}</span>
                  <span className="text-xs font-medium text-zinc-300">
                    {value}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-700 ease-out',
                      color,
                    )}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}

            {/* Divider */}
            <div className="border-t border-zinc-800/60 pt-4 mt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">Uptime</span>
                <span className="text-emerald-400 font-medium">99.9%</span>
              </div>
              <div className="flex items-center justify-between text-xs mt-2">
                <span className="text-zinc-500">Response Time</span>
                <span className="text-zinc-300 font-medium">124ms</span>
              </div>
              <div className="flex items-center justify-between text-xs mt-2">
                <span className="text-zinc-500">Active API Keys</span>
                <span className="text-zinc-300 font-medium">3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
