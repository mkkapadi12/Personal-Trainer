import { z } from 'zod';

export const addressSchema = z.object({
  company: z.string().optional(),

  address1: z.string().min(3, { message: 'Address line 1 is required' }),

  address2: z.string().optional(),

  city: z.string().min(2, { message: 'City is required' }),

  postalCode: z.string().min(4, { message: 'Postal code is required' }),

  phone: z
    .string()
    .regex(/^[0-9]{10}$/, {
      message: 'Phone must be 10 digits',
    })
    .optional(),

  country: z.string().min(2, { message: 'Country is required' }),

  isDefault: z.boolean().optional(),
});
