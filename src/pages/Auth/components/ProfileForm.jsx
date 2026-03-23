import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile } from '@/Store/features/auth/auth.slice';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import profileSchema from '../schema/profile.schema';

const ProfileForm = () => {
  const { user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
    },
  });

  useEffect(() => {
    const token = localStorage.getItem('workDo');

    if (token) {
      dispatch(getProfile());
    }
  }, [dispatch]);

  // 🔥 Important fix
  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        password: '',
        confirmPassword: '',
        phone: user.phone || '',
      });
    }
  }, [user, form]);

  const onSubmit = async (data) => {
    try {
      const result = await toast.promise(
        dispatch(updateProfile(data)).unwrap(),
        {
          loading: 'Updating profile...',
          success: (res) => res.msg || 'Profile updated successfully!',
          error: (err) => err || 'Profile update failed',
        },
      );

      setIsEditing(false);
    } catch (error) {
      toast.error(error || 'An unexpected error occurred');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* PERSONAL DETAILS */}

        <div>
          <h2 className="mb-6 text-xl font-semibold">Your Personal Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>

                  <FormControl>
                    <Input type="text" {...field} disabled={!isEditing} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>

                  <FormControl>
                    <Input type="text" {...field} disabled={!isEditing} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>

                  <FormControl>
                    <Input type="email" {...field} disabled />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>

                  <FormControl>
                    <Input type="number" {...field} disabled={!isEditing} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* BUTTONS */}

        <div className="flex gap-4 pt-6">
          {!isEditing && (
            <Button
              type="button"
              onClick={() => setIsEditing(true)}
              className="bg-brand text-black hover:bg-transparent border uppercase rounded-none border-brand hover:border-black transition-all duration-300"
            >
              Edit Profile
            </Button>
          )}

          {isEditing && (
            <>
              <Button
                type="submit"
                className="bg-brand text-black uppercase hover:bg-transparent border rounded-none border-brand hover:border-black transition-all duration-300"
              >
                Save
              </Button>

              <Button
                type="button"
                className="bg-brand text-black hover:bg-transparent border uppercase rounded-none border-brand hover:border-black transition-all duration-300"
                onClick={() => {
                  form.reset();
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
