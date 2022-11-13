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

export type CreatePostSchema = z.infer<typeof CreatePostSchema>;

export const { schemas: postSchemas, $ref: $postSchemasRef } = buildJsonSchemas(
  {
    CreatePostSchema,
    CreatePostResponseSchema,
  },
  { $id: 'post' }
);
