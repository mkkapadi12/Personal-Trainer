import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { addressSchema } from './addressSchema';
import { useEffect } from 'react';
import { MapPin } from 'lucide-react';

const DarkInput = ({ placeholder, ...props }) => (
  <Input
    placeholder={placeholder}
    {...props}
    className="w-full rounded-lg text-white text-sm py-2.5 transition-all duration-200 placeholder:text-gray-600 focus:outline-none"
    style={{
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.1)',
      color: '#fff',
    }}
    onFocus={(e) => {
      e.target.style.border = '1px solid rgba(215,251,0,0.55)';
      e.target.style.boxShadow = '0 0 0 3px rgba(215,251,0,0.07)';
    }}
    onBlur={(e) => {
      e.target.style.border = '1px solid rgba(255,255,255,0.1)';
      e.target.style.boxShadow = 'none';
    }}
  />
);

export default function AddressFormDialog({
  open,
  setOpen,
  onSubmit,
  defaultValues,
  mode,
  setMode,
  editData,
}) {
  const form = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: defaultValues || {
      company: '',
      address1: '',
      address2: '',
      city: '',
      postalCode: '',
      phone: '',
      country: '',
      isDefault: false,
    },
  });

  const resetField = () => {
    form.reset();
    setOpen(false);
    setMode('add');
  };

  useEffect(() => {
    if (mode === 'edit' && editData) {
      form.reset(editData);
    }
    if (mode === 'add') {
      form.reset({
        company: '',
        address1: '',
        address2: '',
        city: '',
        postalCode: '',
        phone: '',
        country: '',
        isDefault: false,
      });
    }
  }, [mode, editData, form]);

  const sectionLabel = (text) => (
    <p
      className="text-xs font-bold tracking-widest uppercase mb-1"
      style={{ color: '#d7fb00' }}
    >
      {text}
    </p>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="max-w-2xl rounded-2xl border-0 p-0 overflow-hidden"
        style={{
          background: '#0d0d0d',
          border: '1px solid rgba(215,251,0,0.15)',
          boxShadow: '0 0 60px rgba(215,251,0,0.08)',
        }}
      >
        {/* Dialog Header */}
        <DialogHeader
          className="px-8 pt-8 pb-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-full"
              style={{ background: 'rgba(215,251,0,0.1)' }}
            >
              <MapPin size={16} style={{ color: '#d7fb00' }} />
            </div>
            <DialogTitle
              className="text-lg font-bold tracking-wide"
              style={{ color: '#d7fb00' }}
            >
              {mode === 'edit' ? 'Edit Address' : 'Add New Address'}
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* Form */}
        <div className="px-8 py-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-5 md:grid-cols-2"
            >
              {/* Company */}
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400 text-xs font-medium tracking-wide">
                      Company
                    </FormLabel>
                    <FormControl>
                      <DarkInput placeholder="Company (optional)" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400 text-xs font-medium tracking-wide">
                      Phone
                    </FormLabel>
                    <FormControl>
                      <DarkInput placeholder="Phone number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Address 1 */}
              <FormField
                control={form.control}
                name="address1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400 text-xs font-medium tracking-wide">
                      Address Line 1 *
                    </FormLabel>
                    <FormControl>
                      <DarkInput placeholder="Street address" {...field} />
                    </FormControl>
                    <FormMessage
                      className="text-xs"
                      style={{ color: '#ff6b6b' }}
                    />
                  </FormItem>
                )}
              />

              {/* Address 2 */}
              <FormField
                control={form.control}
                name="address2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400 text-xs font-medium tracking-wide">
                      Address Line 2
                    </FormLabel>
                    <FormControl>
                      <DarkInput
                        placeholder="Apartment, suite, etc."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* City */}
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400 text-xs font-medium tracking-wide">
                      City *
                    </FormLabel>
                    <FormControl>
                      <DarkInput placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage
                      className="text-xs"
                      style={{ color: '#ff6b6b' }}
                    />
                  </FormItem>
                )}
              />

              {/* Postal Code */}
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400 text-xs font-medium tracking-wide">
                      Postal Code *
                    </FormLabel>
                    <FormControl>
                      <DarkInput placeholder="Postal code" {...field} />
                    </FormControl>
                    <FormMessage
                      className="text-xs"
                      style={{ color: '#ff6b6b' }}
                    />
                  </FormItem>
                )}
              />

              {/* Country */}
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="text-gray-400 text-xs font-medium tracking-wide">
                      Country *
                    </FormLabel>
                    <FormControl>
                      <DarkInput placeholder="Country" {...field} />
                    </FormControl>
                    <FormMessage
                      className="text-xs"
                      style={{ color: '#ff6b6b' }}
                    />
                  </FormItem>
                )}
              />

              {/* Default checkbox */}
              <FormField
                control={form.control}
                name="isDefault"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3 md:col-span-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-gray-600 data-[state=checked]:bg-brand data-[state=checked]:border-brand"
                    />
                    <FormLabel
                      className="text-gray-400 text-xs font-medium tracking-wide cursor-pointer"
                      style={{ marginTop: 0 }}
                    >
                      Set as default address
                    </FormLabel>
                  </FormItem>
                )}
              />

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 md:col-span-2 pt-2">
                <Button
                  type="button"
                  onClick={resetField}
                  className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{
                    background: 'transparent',
                    color: '#d7fb00',
                    border: '1.5px solid rgba(215,251,0,0.4)',
                  }}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{
                    background: '#d7fb00',
                    color: '#000',
                    border: 'none',
                    boxShadow: '0 4px 16px rgba(215,251,0,0.3)',
                  }}
                >
                  {mode === 'edit' ? 'Save Changes' : 'Add Address'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
