import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '@/pages/admin/components/AdminHeader';
import AdminSidebar from '@/pages/admin/components/AdminSidebar';
import { cn } from '@/lib/utils';

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* ── Mobile sidebar overlay ──────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Sidebar ────────────────────────── */}
      <div
        className={cn(
          'lg:block',
          mobileOpen
            ? 'block fixed inset-y-0 left-0 z-40 animate-in slide-in-from-left duration-300'
            : 'hidden',
        )}
      >
        <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* ── Main content area ──────────────── */}
      <div
        className={cn(
          'flex flex-col min-h-screen transition-all duration-300 ease-in-out',
          collapsed ? 'lg:ml-[72px]' : 'lg:ml-64',
        )}
      >
        <AdminHeader
          collapsed={collapsed}
          onToggleSidebar={() => setMobileOpen(!mobileOpen)}
        />

        {/* ── Page content ──────────────────── */}
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>

        {/* ── Footer ────────────────────────── */}
        <footer className="border-t border-zinc-800/60 px-4 lg:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-600">
            <p>
              © {new Date().getFullYear()}{' '}
              <span className="text-zinc-500">Personal Trainer</span>. All
              rights reserved.
            </p>
            <p>
              Admin Panel v1.0 —{' '}
              <span className="text-lime-400/60">Powered by WorkDo</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
