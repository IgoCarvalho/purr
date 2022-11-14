import z from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const CreatePostSchema = z.object({
  text: z.string(),
});

const CreatePostResponseSchema = CreatePostSchema.extend({
  id: z.string(),
  likes: z.number(),
  createdAt: z.date(),
  images: z.array(z.any()),
});

const ListPostsQuerySchema = z.object({
  page: z.number().default(0),
  limit: z.number().default(10),
  scope: z.enum(['owner', 'users']).default('users'),
});

export type CreatePostSchema = z.infer<typeof CreatePostSchema>;
export type ListPostsQuerySchema = z.infer<typeof ListPostsQuerySchema>;

export const { schemas: postSchemas, $ref: $postSchemasRef } = buildJsonSchemas(
  {
    CreatePostSchema,
    CreatePostResponseSchema,
    ListPostsQuerySchema,
  },
  { $id: 'post' }
);
