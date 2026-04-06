import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { ADMIN_ICONS } from '@/lib/icons/admin.icons';
import { adminRegisterSchema } from '../Schema/admin.schema';
import { registerAdmin } from '@/Store/features/admin/auth/admin.auth.slice';
import { toast } from 'sonner';

const perks = [
  'Full access to the admin dashboard',
  'Manage users, trainers & appointments',
  'Control products and inventory',
  'View platform-wide analytics',
];

const AdminRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.admin);

  const [show, setShow] = useState({ password: false, confirm: false });

  const toggleShow = (field) =>
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(adminRegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      secretKey: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(registerAdmin(data)).unwrap();
      toast.success(result.msg || 'Registration successful');
      navigate('/admin/login');
    } catch (error) {
      toast.error(error || 'Registration failed');
    }
  };

  const inputClass =
    'h-11 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-lime-400/30 focus-visible:border-lime-400/60 transition-colors';

  const errorInputClass = 'border-red-500/60 focus-visible:ring-red-500/20';

  return (
    <div className="min-h-screen w-full flex bg-zinc-950">
      {/* ── Left branding panel ──────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12 bg-linear-to-br from-zinc-900 via-zinc-900 to-zinc-800">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-linear(#fff 1px,transparent 1px),linear-linear(90deg,#fff 1px,transparent 1px)',
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
              Admin Registration
            </span>
          </div>

          <h1 className="text-4xl font-bold text-white leading-tight">
            Join the admin <br />
            <span className="text-lime-400">team</span> and take <br />
            full control.
          </h1>

          <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
            Create your admin account to start managing the Personal Trainer
            platform. A secret key is required for security.
          </p>

          {/* Perks list */}
          <ul className="space-y-3 pt-2">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3">
                <ADMIN_ICONS.CHECKCIRCLE2 className="h-4 w-4 text-lime-400 shrink-0" />
                <span className="text-sm text-zinc-300">{perk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <p className="relative text-xs text-zinc-600">
          © {new Date().getFullYear()} Personal Trainer. All rights reserved.
        </p>
      </div>

      {/* ── Right form panel ─────────────────────────── */}
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center px-6 py-12 sm:px-12 overflow-y-auto">
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
            <h2 className="text-2xl font-bold text-white">
              Create admin account
            </h2>
            <p className="text-sm text-zinc-400">
              Fill in the details below to register as an administrator.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label
                htmlFor="admin-reg-name"
                className="text-sm font-medium text-zinc-300"
              >
                Full Name
              </Label>
              <div className="relative">
                <ADMIN_ICONS.USER className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
                <Input
                  id="admin-reg-name"
                  type="text"
                  placeholder="John Doe"
                  {...register('name')}
                  aria-invalid={!!errors.name}
                  className={cn(
                    'pl-10',
                    inputClass,
                    errors.name && errorInputClass,
                  )}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-400">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="admin-reg-email"
                className="text-sm font-medium text-zinc-300"
              >
                Email Address
              </Label>
              <div className="relative">
                <ADMIN_ICONS.MAIL className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
                <Input
                  id="admin-reg-email"
                  type="email"
                  placeholder="admin@example.com"
                  {...register('email')}
                  aria-invalid={!!errors.email}
                  className={cn(
                    'pl-10',
                    inputClass,
                    errors.email && errorInputClass,
                  )}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Password + Confirm side by side on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="admin-reg-password"
                  className="text-sm font-medium text-zinc-300"
                >
                  Password
                </Label>
                <div className="relative">
                  <ADMIN_ICONS.LOCK className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
                  <Input
                    id="admin-reg-password"
                    type={show.password ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...register('password')}
                    aria-invalid={!!errors.password}
                    className={cn(
                      'pl-10 pr-10',
                      inputClass,
                      errors.password && errorInputClass,
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => toggleShow('password')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                    aria-label="Toggle password"
                  >
                    {show.password ? (
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

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="admin-reg-confirm"
                  className="text-sm font-medium text-zinc-300"
                >
                  Confirm Password
                </Label>
                <div className="relative">
                  <ADMIN_ICONS.LOCK className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
                  <Input
                    id="admin-reg-confirm"
                    type={show.confirm ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...register('confirmPassword')}
                    aria-invalid={!!errors.confirmPassword}
                    className={cn(
                      'pl-10 pr-10',
                      inputClass,
                      errors.confirmPassword && errorInputClass,
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => toggleShow('confirm')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                    aria-label="Toggle confirm password"
                  >
                    {show.confirm ? (
                      <ADMIN_ICONS.EYEOFF className="h-4 w-4" />
                    ) : (
                      <ADMIN_ICONS.EYE className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-400">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* Secret Admin Key */}
            <div className="space-y-2">
              <Label
                htmlFor="admin-reg-secret"
                className="text-sm font-medium text-zinc-300"
              >
                Admin Secret Key
              </Label>
              <div className="relative">
                <ADMIN_ICONS.KEYROUND className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
                <Input
                  id="admin-reg-secret"
                  type="password"
                  placeholder="Enter admin secret key"
                  {...register('secretKey')}
                  aria-invalid={!!errors.secretKey}
                  className={cn(
                    'pl-10',
                    inputClass,
                    errors.secretKey && errorInputClass,
                  )}
                />
              </div>
              {errors.secretKey ? (
                <p className="text-xs text-red-400">
                  {errors.secretKey.message}
                </p>
              ) : (
                <p className="text-xs text-zinc-600">
                  Contact your system administrator to obtain the secret key.
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              id="admin-register-submit"
              type="submit"
              disabled={loading}
              className={cn(
                'w-full h-11 bg-lime-400 hover:bg-lime-300 text-zinc-900 font-semibold',
                'transition-all duration-200 rounded-lg mt-2',
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
                  Creating account…
                </span>
              ) : (
                <>
                  Create Admin Account
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
                Already have an admin account?
              </span>
            </div>
          </div>

          {/* Login link */}
          <Link
            to="/admin/login"
            className={cn(
              'flex w-full items-center justify-center gap-2 h-11 rounded-lg',
              'border border-zinc-700 text-zinc-300 text-sm font-medium',
              'hover:border-lime-400/40 hover:text-lime-400 hover:bg-lime-400/5',
              'transition-all duration-200',
            )}
          >
            Sign in instead
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

export default AdminRegister;
