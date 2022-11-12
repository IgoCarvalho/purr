import z from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const UserBase = z.object({
  email: z.string().email(),
  name: z.string().min(3),
});

const CreateUserSchema = UserBase.extend({
  password: z.string(),
});

const CreateUserResponseSchema = UserBase.extend({
  id: z.string(),
  avatarUrl: z.string().optional(),
});

export type CreateUserSchema = z.infer<typeof CreateUserSchema>;

export const { schemas: userSchemas, $ref: $userSchemaRef } = buildJsonSchemas({
  CreateUserSchema,
  CreateUserResponseSchema,
});
