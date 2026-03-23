import { z } from 'zod';

export const commentSchema = z.object({
  comment: z
    .string()
    .min(5, { message: 'Comment must be at least 5 characters' }),
});
