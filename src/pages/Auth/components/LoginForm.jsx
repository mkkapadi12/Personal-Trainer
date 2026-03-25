import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginUser } from '@/Store/features/auth/auth.slice';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      toast.loading('Logging in...');

      const result = await dispatch(loginUser(data)).unwrap();

      toast.dismiss();
      toast.success(result.msg || 'Login successful!');
      navigate('/');
    } catch (error) {
      toast.dismiss();
      toast.error(error);
    }
  };

  return (
    <div className="w-full py-10">
      <div className="max-w-4xl mx-auto border bg-white md:p-10 p-4 space-y-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* ---------------- Login Details ---------------- */}
          <div className="space-y-6">
            <h2 className="text-2xl font-medium">Log In</h2>
            <hr className="h-0.5 bg-black" />
            <div className="space-y-5">
              <p>I am a returning customer</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="space-y-2">
                  <Label>
                    E-mail <span className="text-red-500">*</span> :
                  </Label>
                  <Input
                    type="email"
                    placeholder="Email"
                    autoComplete="current-email"
                    {...register('email', {
                      required: 'Email is required',
                    })}
                    className="h-12 rounded-none shadow-none"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
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
            </div>
          </div>

          {/* ---------------- Submit Button ---------------- */}
          <div className="flex justify-end items-center gap-6">
            <Link
              to="/forgot-password"
              className="text-red-600 underline hover:no-underline"
            >
              Forget Password?
            </Link>
            <Button
              type="submit"
              className="bg-lime-400 hover:bg-lime-500 text-black px-10 py-6 text-lg font-medium rounded-none"
            >
              Login →
            </Button>
          </div>
        </form>
        <hr className="h-0.5 bg-black" />

        {/* Do not have account? */}
        <div className="text-center">
          <p className="text-gray-600">
            If you don't have an account?{'  '}
            <Link
              to="/account/register"
              className="bg-lime-400 uppercase hover:bg-lime-500 text-black px-5 py-2 text-base font-normal rounded-none"
            >
              Register →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
