import z from 'zod';

export const productSchema = z
  .object({
    name: z.string().min(1, 'Product is required'),
    brand: z.string().min(1, 'Brand is required'),
    price: z.number().positive('Invalid price'),
    description: z.string(),
    mainImage: z.string().min(1, 'Main image is required'),
    category: z.string().min(1, 'Category is required'),
    stock: z
      .number()
      .min(0, 'Invalid stock')
      .max(25, 'Stock is too large')
      .default(0),
  })
  .refine((data) => {
    if (data.description === '') {
      return { message: 'Description is required' };
    }
    if (data.description.length < 25) {
      return { message: 'Description must be at least 25 characters long' };
    }
  });
