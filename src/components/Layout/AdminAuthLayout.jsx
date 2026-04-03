import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * AdminAuthLayout
 * ─────────────────────────────────────────────
 * Used exclusively for admin Login & Register pages.
 * Intentionally omits the public Navbar and Footer so
 * the admin auth screens render as standalone, full-page
 * forms without any site chrome.
 */
const AdminAuthLayout = () => {
  return (
    <div className="admin-auth-root">
      <Outlet />
    </div>
  );
};

export default AdminAuthLayout;
