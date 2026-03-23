import { z } from 'zod';

const profileSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name must be between 2 and 10 characters' })
    .max(10, { message: 'First name must be between 2 and 10 characters' }),

  lastName: z
    .string()
    .min(2, { message: 'Last name must be between 2 and 100 characters' })
    .max(10, { message: 'Last name must be between 2 and 100 characters' }),

  email: z.string().email({
    message: 'Please enter a valid email address',
  }),

  phone: z.string().regex(/^[0-9]{10}$/, {
    message: 'Phone number must be a 10-digit number',
  }),
});

export default profileSchema;
