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
import { User, Mail, Phone, Pencil, Check, X } from 'lucide-react';

const fieldIconMap = {
  firstName: <User size={15} />,
  lastName: <User size={15} />,
  email: <Mail size={15} />,
  phone: <Phone size={15} />,
};

const StyledInput = ({ icon, ...props }) => (
  <div className="relative flex items-center">
    {icon && (
      <span
        className="absolute left-3 pointer-events-none"
        style={{ color: '#d7fb00', opacity: 0.7 }}
      >
        {icon}
      </span>
    )}
    <Input
      {...props}
      className="w-full rounded-lg text-white text-sm py-2.5 transition-all duration-200 focus:outline-none"
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.1)',
        paddingLeft: icon ? '2.25rem' : '0.75rem',
        color: props.disabled ? 'rgba(255,255,255,0.35)' : '#fff',
      }}
      onFocus={(e) => {
        if (!props.disabled) {
          e.target.style.border = '1px solid rgba(215,251,0,0.6)';
          e.target.style.boxShadow = '0 0 0 3px rgba(215,251,0,0.08)';
        }
      }}
      onBlur={(e) => {
        e.target.style.border = '1px solid rgba(255,255,255,0.1)';
        e.target.style.boxShadow = 'none';
      }}
    />
  </div>
);

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
      await toast.promise(dispatch(updateProfile(data)).unwrap(), {
        loading: 'Updating profile...',
        success: (res) => res.msg || 'Profile updated successfully!',
        error: (err) => err || 'Profile update failed',
      });
      setIsEditing(false);
    } catch (error) {
      toast.error(error || 'An unexpected error occurred');
    }
  };

  const sectionLabel = (text) => (
    <p
      className="text-xs font-bold tracking-widest uppercase mb-5"
      style={{ color: '#d7fb00' }}
    >
      {text}
    </p>
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        {/* Personal Details Section */}
        <div>
          {sectionLabel('Personal Details')}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400 text-xs font-medium tracking-wide">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <StyledInput
                      type="text"
                      icon={fieldIconMap.firstName}
                      {...field}
                      disabled={!isEditing}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" style={{ color: '#ff6b6b' }} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400 text-xs font-medium tracking-wide">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <StyledInput
                      type="text"
                      icon={fieldIconMap.lastName}
                      {...field}
                      disabled={!isEditing}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" style={{ color: '#ff6b6b' }} />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

        {/* Contact Details Section */}
        <div>
          {sectionLabel('Contact Details')}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400 text-xs font-medium tracking-wide">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <StyledInput
                      type="email"
                      icon={fieldIconMap.email}
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage className="text-xs" style={{ color: '#ff6b6b' }} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400 text-xs font-medium tracking-wide">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <StyledInput
                      type="number"
                      icon={fieldIconMap.phone}
                      {...field}
                      disabled={!isEditing}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" style={{ color: '#ff6b6b' }} />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          {!isEditing && (
            <Button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: '#d7fb00',
                color: '#000',
                border: 'none',
                boxShadow: '0 4px 16px rgba(215,251,0,0.3)',
              }}
            >
              <Pencil size={13} />
              Edit Profile
            </Button>
          )}

          {isEditing && (
            <>
              <Button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: '#d7fb00',
                  color: '#000',
                  border: 'none',
                  boxShadow: '0 4px 16px rgba(215,251,0,0.3)',
                }}
              >
                <Check size={13} />
                Save Changes
              </Button>

              <Button
                type="button"
                onClick={() => {
                  form.reset();
                  setIsEditing(false);
                }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: 'transparent',
                  color: '#d7fb00',
                  border: '1.5px solid rgba(215,251,0,0.5)',
                }}
              >
                <X size={13} />
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
