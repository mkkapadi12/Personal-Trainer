import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { ADMIN_ICONS } from '@/lib/icons/admin.icons';
import { adminLoginSchema } from '../Schema/admin.schema';
import { loginAdmin } from '@/Store/features/admin/auth/admin.auth.slice';
import { toast } from 'sonner';

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.admin);

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(loginAdmin(data)).unwrap();
      toast.success(result.msg || 'Login successful');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-zinc-950">
      {/* ── Left branding panel ──────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12 bg-linear-to-br from-zinc-900 via-zinc-900 to-zinc-800">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Glow orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-lime-400/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-lime-400/5 blur-3xl" />

        {/* Brand logo */}
        <div className="relative flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400">
            <ADMIN_ICONS.DUMBBELL className="h-5 w-5 text-zinc-900" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            Personal Trainer
          </span>
        </div>

        {/* Center content */}
        <div className="relative space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-1.5">
            <ADMIN_ICONS.SHIELDCHECK className="h-4 w-4 text-lime-400" />
            <span className="text-xs font-medium text-lime-400">
              Admin Portal
            </span>
          </div>

          <h1 className="text-4xl font-bold text-white leading-tight">
            Manage your <br />
            <span className="text-lime-400">fitness platform</span>
            <br /> with full control.
          </h1>

          <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
            Access the admin dashboard to manage users, trainers, appointments,
            products, and platform-wide analytics in one place.
          </p>

          {/* Stats strip */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { label: 'Users', value: '2.4k+' },
              { label: 'Sessions', value: '18k+' },
              { label: 'Products', value: '340+' },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl border border-zinc-700/60 bg-zinc-800/50 p-4"
              >
                <p className="text-xl font-bold text-white">{value}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="relative text-xs text-zinc-600">
          © {new Date().getFullYear()} Personal Trainer. All rights reserved.
        </p>
      </div>

      {/* ── Right form panel ─────────────────────────── */}
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center px-6 py-12 sm:px-12">
        {/* Mobile logo */}
        <div className="flex lg:hidden items-center gap-2 mb-10">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime-400">
            <ADMIN_ICONS.DUMBBELL className="h-4 w-4 text-zinc-900" />
          </div>
          <span className="text-white font-bold text-base">
            Personal Trainer
          </span>
        </div>

        <div className="w-full max-w-md space-y-8">
          {/* Heading */}
          <div className="space-y-1.5">
            <h2 className="text-2xl font-bold text-white">Welcome back</h2>
            <p className="text-sm text-zinc-400">
              Sign in to your admin account to continue.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="admin-email"
                className="text-sm font-medium text-zinc-300"
              >
                Email Address
              </Label>
              <div className="relative">
                <ADMIN_ICONS.MAIL className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@example.com"
                  {...register('email')}
                  aria-invalid={!!errors.email}
                  className={cn(
                    'pl-10 h-11 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-lime-400/30 focus-visible:border-lime-400/60 transition-colors',
                    errors.email &&
                      'border-red-500/60 focus-visible:ring-red-500/20',
                  )}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label
                htmlFor="admin-password"
                className="text-sm font-medium text-zinc-300"
              >
                Password
              </Label>
              <div className="relative">
                <ADMIN_ICONS.LOCK className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
                <Input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password')}
                  aria-invalid={!!errors.password}
                  className={cn(
                    'pl-10 pr-10 h-11 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-lime-400/30 focus-visible:border-lime-400/60 transition-colors',
                    errors.password &&
                      'border-red-500/60 focus-visible:ring-red-500/20',
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                  aria-label="Toggle password"
                >
                  {showPassword ? (
                    <ADMIN_ICONS.EYEOFF className="h-4 w-4" />
                  ) : (
                    <ADMIN_ICONS.EYE className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="admin-remember"
                  checked={rememberMe}
                  onCheckedChange={setRememberMe}
                  className="border-zinc-600 data-[state=checked]:bg-lime-400 data-[state=checked]:border-lime-400 data-[state=checked]:text-zinc-900"
                />
                <Label
                  htmlFor="admin-remember"
                  className="text-sm text-zinc-400 cursor-pointer select-none"
                >
                  Remember me
                </Label>
              </div>
              <a
                href="#"
                className="text-sm text-lime-400 hover:text-lime-300 transition-colors font-medium"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <Button
              id="admin-login-submit"
              type="submit"
              disabled={loading}
              className={cn(
                'w-full h-11 bg-lime-400 hover:bg-lime-300 text-zinc-900 font-semibold',
                'transition-all duration-200 rounded-lg',
                'flex items-center justify-center gap-2',
                loading && 'opacity-70 cursor-not-allowed',
              )}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                    />
                  </svg>
                  Signing in…
                </span>
              ) : (
                <>
                  Sign In
                  <ADMIN_ICONS.ARROWRIGHT className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-zinc-950 px-3 text-xs text-zinc-600">
                Don't have an admin account?
              </span>
            </div>
          </div>

          {/* Register link */}
          <Link
            to="/admin/register"
            className={cn(
              'flex w-full items-center justify-center gap-2 h-11 rounded-lg',
              'border border-zinc-700 text-zinc-300 text-sm font-medium',
              'hover:border-lime-400/40 hover:text-lime-400 hover:bg-lime-400/5',
              'transition-all duration-200',
            )}
          >
            Create admin account
          </Link>

          {/* Back to site */}
          <p className="text-center text-xs text-zinc-600">
            <Link to="/" className="hover:text-zinc-400 transition-colors">
              ← Back to main site
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
