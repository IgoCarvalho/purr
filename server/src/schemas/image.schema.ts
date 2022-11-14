import z from 'zod';

export const ImageSchema = z.object({
  id: z.string(),
  altText: z.string(),
  url: z.string(),
  createdAt: z.date(),
  postId: z.string(),
});
