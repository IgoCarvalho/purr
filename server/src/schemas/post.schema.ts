import z from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

import { ImageSchema } from './image.schema';

const CreatePostSchema = z.object({
  text: z.string(),
});

const CreatePostResponseSchema = CreatePostSchema.extend({
  id: z.string(),
  likes: z.number(),
  createdAt: z.date(),
  images: z.array(ImageSchema),
});

const ListPostsQuerySchema = z.object({
  page: z.number().default(0),
  limit: z.number().default(10),
  scope: z.enum(['owner', 'users']).default('users'),
});

const ListUniquePostParamsSchema = z.object({
  id: z.string(),
});

const DeletePostParamsSchema = ListUniquePostParamsSchema.extend({});

const LikePostParamsSchema = ListUniquePostParamsSchema.extend({});

export type CreatePostSchema = z.infer<typeof CreatePostSchema>;
export type ListPostsQuerySchema = z.infer<typeof ListPostsQuerySchema>;
export type ListUniquePostParamsSchema = z.infer<
  typeof ListUniquePostParamsSchema
>;
export type DeletePostParamsSchema = z.infer<typeof DeletePostParamsSchema>;
export type LikePostParamsSchema = z.infer<typeof LikePostParamsSchema>;

export const { schemas: postSchemas, $ref: $postSchemasRef } = buildJsonSchemas(
  {
    CreatePostSchema,
    CreatePostResponseSchema,
    ListPostsQuerySchema,
    ListUniquePostParamsSchema,
    DeletePostParamsSchema,
    LikePostParamsSchema,
  },
  { $id: 'post' }
);
