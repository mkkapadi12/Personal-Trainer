import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function ContactForm() {
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      description: '',
    },
  });

  const onSubmit = (data) => {
    console.log('Contact Form:', data);
    form.reset();
  };

  return (
    <div className="bg-white border-black border p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Row 1 */}
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              rules={{ required: 'First name is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    First name <span className="text-red-500">*</span> :
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="First name"
                      {...field}
                      className="h-12 rounded-none border-gray-300"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              rules={{ required: 'Last name is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Last name <span className="text-red-500">*</span> :
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Last name"
                      {...field}
                      className="h-12 rounded-none border-gray-300"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Row 2 */}
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="email"
              rules={{ required: 'Email is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className="text-red-500">*</span> :
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="shop@company.com"
                      type="email"
                      {...field}
                      className="h-12 rounded-none border-gray-300"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              rules={{ required: 'Phone number is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Phone number <span className="text-red-500">*</span> :
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Phone number"
                      {...field}
                      className="h-12 rounded-none border-gray-300"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>

                <FormControl>
                  <Textarea
                    placeholder="How Can We Help?"
                    {...field}
                    className="rounded-none h-40 border-gray-300"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button
            type="submit"
            className="bg-[#d6ff00] text-black hover:bg-black hover:text-white px-8 py-5 rounded-none font-semibold"
          >
            SEND MESSAGE →
          </Button>
        </form>
      </Form>
    </div>
  );
}
