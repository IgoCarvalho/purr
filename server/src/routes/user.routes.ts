import { FastifyInstance } from 'fastify';
import * as userController from '../controllers/user.controller';
import { $userSchemaRef } from '../schemas/user.schema';

export async function userRoutes(server: FastifyInstance) {
  server.route({
    method: 'POST',
    url: '/',
    schema: {
      body: $userSchemaRef('CreateUserSchema'),
      response: {
        201: $userSchemaRef('CreateUserResponseSchema'),
      },
    },
    handler: userController.createUser,
  });

  server.route({
    method: 'POST',
    url: '/login',
    schema: {
      body: $userSchemaRef('LoginUserSchema'),
      response: {
        200: $userSchemaRef('LoginUserResponseSchema'),
      },
    },
    handler: userController.login,
  });
}
