import { FastifyInstance } from 'fastify';
import { postRoutes } from './post.routes';
import { userRoutes } from './user.routes';

export async function appRoutes(server: FastifyInstance) {
  server.register(userRoutes, { prefix: 'users' });
  server.register(postRoutes, { prefix: 'posts' });
}
