import z from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Product is required'),
  brand: z.string().min(1, 'Brand is required'),
  price: z.number().positive('Invalid price'),
  description: z
    .string()
    .min(50, 'Description must be at least 50 characters long')
    .max(500, 'Description must be at most 500 characters long'),
  mainImage: z.string().min(1, 'Main image is required'),
  category: z.string().min(1, 'Category is required'),
  stock: z
    .number()
    .min(0, 'Invalid stock')
    .max(25, 'Stock is too large')
    .default(0),
});
