import React, { useEffect, useState } from 'react';
import { ADMIN_ICONS } from '@/lib/icons/admin.icons';
import { cn, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { deleteUser } from '@/Store/features/admin/auth/admin.auth.slice';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

const UserDetailsDrawer = ({ isOpen, onClose, user }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteUser = async (id) => {
    const result = await dispatch(deleteUser(id)).unwrap();
    if (result.msg) {
      onClose();
      toast.success(result.msg);
    } else {
      toast.error(result.error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      requestAnimationFrame(() => {
        setTimeout(() => setIsVisible(true), 10);
      });
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setIsRendered(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isRendered || !user) return null;

  const initials =
    `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() ||
    '?';

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300',
          isVisible ? 'opacity-100' : 'opacity-0',
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          'relative w-full max-w-md xl:max-w-md h-full bg-zinc-950 border-l border-zinc-800 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col',
          isVisible ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800 shrink-0 bg-zinc-900/50">
          <div>
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <ADMIN_ICONS.USER className="h-5 w-5 text-lime-400" />
              User Details
            </h2>
            <p className="text-sm text-zinc-500 mt-1">
              ID: #{user._id.slice(-8) || '—'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
          >
            <ADMIN_ICONS.X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 shrink-0 custom-scrollbar pb-24">
          {/* Profile Header */}
          <div className="flex flex-col items-center justify-center p-6 bg-zinc-900/80 border border-zinc-800/60 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <ADMIN_ICONS.USER className="h-32 w-32" />
            </div>
            <div className="h-20 w-20 rounded-full bg-linear-to-br from-lime-400/20 to-emerald-500/20 border-2 border-zinc-700/50 flex items-center justify-center mb-4 relative z-10">
              <span className="text-2xl font-bold text-lime-400">
                {initials}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-white relative z-10 text-center">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-zinc-400 text-sm mt-1 relative z-10 text-center">
              {user.email}
            </p>
          </div>

          {/* Contact Information */}
          <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 overflow-hidden">
            <div className="px-5 py-4 border-b border-zinc-800/60 bg-linear-to-r from-zinc-900/80 to-zinc-900/30">
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                <ADMIN_ICONS.PHONE className="h-4 w-4 text-zinc-500" />
                Contact Info
              </h4>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-zinc-500 uppercase font-medium tracking-wide">
                  Email Address
                </span>
                <div className="flex items-center gap-2.5 text-sm text-zinc-200 bg-zinc-950/50 p-2.5 rounded-lg border border-zinc-800/50">
                  <ADMIN_ICONS.MAIL className="h-4 w-4 text-zinc-500" />
                  {user.email || '—'}
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-zinc-500 uppercase font-medium tracking-wide">
                  Phone Number
                </span>
                <div className="flex items-center gap-2.5 text-sm text-zinc-200 bg-zinc-950/50 p-2.5 rounded-lg border border-zinc-800/50">
                  <ADMIN_ICONS.PHONE className="h-4 w-4 text-zinc-500" />
                  {user.phone ? (
                    user.phone
                  ) : (
                    <span className="text-zinc-500 italic">Not provided</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/60 overflow-hidden">
            <div className="px-5 py-4 border-b border-zinc-800/60 bg-linear-to-r from-zinc-900/80 to-zinc-900/30">
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                <ADMIN_ICONS.SHIELD className="h-4 w-4 text-zinc-500" />
                Account Details
              </h4>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-zinc-800/50 last:border-0 last:pb-0">
                <span className="text-sm text-zinc-500">Member Since</span>
                <span className="text-sm font-medium text-zinc-200 text-right">
                  {user.createdAt ? <>{formatDate(user.createdAt)}</> : '—'}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-zinc-800/50 last:border-0 last:pb-0">
                <span className="text-sm text-zinc-500">Last Updated</span>
                <span className="text-sm font-medium text-zinc-200 text-right">
                  {user.updatedAt ? <>{formatDate(user.updatedAt)}</> : '—'}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-zinc-800/50 last:border-0 last:pb-0">
                <span className="text-sm text-zinc-500">User ID</span>
                <span className="text-sm font-mono text-zinc-400 text-right">
                  #{user._id.slice(-8) || '—'}
                </span>
              </div>
            </div>
          </div>

          {/* Delete User */}
          <Button
            onClick={() => {
              handleDeleteUser(user._id);
            }}
            className="w-full bg-red-500 hover:bg-red-600 text-white"
          >
            <ADMIN_ICONS.TRASH2 className="h-4 w-4 mr-2" />
            Delete User
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsDrawer;
