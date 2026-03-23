import { z } from 'zod';

export const appointmentSchema = z.object({
  service: z.string().min(1, 'Service required'),
  duration: z.string().min(1, 'Duration required'),
  note: z.string().optional(),

  date: z.string().min(1, 'Date required'),
  time: z.string().min(1, 'Time required'),

  firstName: z.string().min(2, 'First name required'),
  lastName: z.string().min(2, 'Last name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(8, 'Phone required'),
  message: z.string().optional(),
});
