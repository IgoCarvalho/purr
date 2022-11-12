import { FastifyInstance } from 'fastify';
import { userRoutes } from './user.routes';

export async function appRoutes(server: FastifyInstance) {
  server.register(userRoutes, { prefix: 'users' });
}
