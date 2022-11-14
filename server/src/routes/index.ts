import { FastifyInstance } from 'fastify';
import { commentaryRoutes } from './commentary.routes';
import { postRoutes } from './post.routes';
import { userRoutes } from './user.routes';

export async function appRoutes(server: FastifyInstance) {
  server.register(userRoutes, { prefix: 'users' });
  server.register(postRoutes, { prefix: 'posts' });
  server.register(commentaryRoutes, { prefix: 'commentaries' });
}
