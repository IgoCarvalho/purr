import z from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const CreateCommentarySchema = z.object({
  text: z.string(),
  postId: z.string(),
});

export type CreateCommentarySchema = z.infer<typeof CreateCommentarySchema>;

export const { schemas: commentarySchemas, $ref: $commentarySchemasRef } =
  buildJsonSchemas(
    {
      CreateCommentarySchema,
    },
    { $id: 'comment' }
  );
