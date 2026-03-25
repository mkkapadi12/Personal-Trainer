import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '@/Store/features/auth/auth.slice';
import { toast } from 'sonner';

const CreateAccountForm = () => {
  const { loading, error, user } = useSelector((state) => state.user);
  // console.log('Auth State:', { loading, error, user });
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      toast.loading('Registering user...');

      const result = await dispatch(registerUser(data)).unwrap();

      toast.dismiss();
      toast.success(result.msg || 'Registration successful!');
    } catch (error) {
      toast.dismiss();
      toast.error(error || 'Registration failed');
    }
  };

  return (
    <div className="w-full py-10">
      <div className="max-w-4xl mx-auto border bg-white md:p-10 p-4 space-y-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* ---------------- Personal Details ---------------- */}
          <div className="space-y-6">
            <h2 className="text-2xl font-medium">Your Personal Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="space-y-2">
                <Label>
                  First Name <span className="text-red-500">*</span> :
                </Label>
                <Input
                  placeholder="First name"
                  {...register('firstName', {
                    required: 'First name is required',
                  })}
                  className="h-12 rounded-none shadow-none"
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <Label>
                  Last Name <span className="text-red-500">*</span> :
                </Label>
                <Input
                  placeholder="Last name"
                  {...register('lastName', {
                    required: 'Last name is required',
                  })}
                  className="h-12 rounded-none shadow-none"
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label>
                E-mail <span className="text-red-500">*</span> :
              </Label>
              <Input
                type="email"
                placeholder="Email"
                autoComplete="new-email"
                {...register('email', {
                  required: 'Email is required',
                })}
                className="h-12 rounded-none shadow-none"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="border-t" />

          {/* ---------------- Password Section ---------------- */}
          <div className="space-y-6">
            <h2 className="text-2xl font-medium">Your Password</h2>

            <div className="space-y-2">
              <Label>
                Password <span className="text-red-500">*</span> :
              </Label>
              <Input
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Minimum 6 characters required',
                  },
                })}
                className="h-12 rounded-none shadow-none"
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="border-t" />

          {/* ---------------- Submit Button ---------------- */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-lime-400 hover:bg-lime-500 text-black px-10 py-6 text-lg font-medium rounded-none"
            >
              Create →
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccountForm;
