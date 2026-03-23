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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {mode === 'edit' ? 'Edit Address' : 'Add a new address'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-6 md:grid-cols-2"
          >
            {/* Company */}
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Company" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Address1 */}
            <FormField
              control={form.control}
              name="address1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address 1 *</FormLabel>
                  <FormControl>
                    <Input placeholder="Address 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address2 */}
            <FormField
              control={form.control}
              name="address2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address 2</FormLabel>
                  <FormControl>
                    <Input placeholder="Address 2" {...field} />
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
                  <FormLabel>City *</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Postal */}
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code *</FormLabel>
                  <FormControl>
                    <Input placeholder="Postal Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Country */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Country *</FormLabel>
                  <FormControl>
                    <Input placeholder="Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Default */}
            <FormField
              control={form.control}
              name="isDefault"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 md:col-span-2">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormLabel>Set as default address</FormLabel>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4 md:col-span-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => resetField()}
              >
                Cancel
              </Button>

              <Button type="submit">Continue</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
