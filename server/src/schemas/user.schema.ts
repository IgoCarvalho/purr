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

const LoginUserSchema = CreateUserSchema.omit({
  name: true,
});

const LoginUserResponseSchema = z.object({
  user: CreateUserResponseSchema,
  token: z.string(),
});

export type CreateUserSchema = z.infer<typeof CreateUserSchema>;
export type LoginUserSchema = z.infer<typeof LoginUserSchema>;

export const { schemas: userSchemas, $ref: $userSchemaRef } = buildJsonSchemas(
  {
    CreateUserSchema,
    CreateUserResponseSchema,
    LoginUserSchema,
    LoginUserResponseSchema,
  },
  { $id: 'user' }
);
