import z from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

import { CreateUserResponseSchema } from './user.schema';

const CreateCommentarySchema = z.object({
  text: z.string(),
  postId: z.string(),
});

const ListPostCommentariesParamsSchema = z.object({
  postId: z.string(),
});

const PostCommentariesResponseSchema = z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.date(),
  postId: z.string(),
  owner: CreateUserResponseSchema.omit({ email: true }),
});

const ListPostCommentariesResponseSchema = z.array(
  PostCommentariesResponseSchema
);

const DeleteCommentaryParamsSchema = z.object({
  commentaryId: z.string(),
});

export type CreateCommentarySchema = z.infer<typeof CreateCommentarySchema>;
export type ListPostCommentariesParamsSchema = z.infer<
  typeof ListPostCommentariesParamsSchema
>;
export type DeleteCommentaryParamsSchema = z.infer<
  typeof DeleteCommentaryParamsSchema
>;

export const { schemas: commentarySchemas, $ref: $commentarySchemasRef } =
  buildJsonSchemas(
    {
      CreateCommentarySchema,
      ListPostCommentariesParamsSchema,
      ListPostCommentariesResponseSchema,
      DeleteCommentaryParamsSchema,
    },
    { $id: 'comment' }
  );
