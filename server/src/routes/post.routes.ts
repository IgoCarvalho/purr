import { FastifyInstance } from 'fastify';

import * as postController from '../controllers/post.controller';
import { $postSchemasRef } from '../schemas/post.schema';

export async function postRoutes(server: FastifyInstance) {
  server.route({
    method: 'POST',
    url: '/',
    schema: {
      body: $postSchemasRef('CreatePostSchema'),
      response: {
        201: $postSchemasRef('CreatePostResponseSchema'),
      },
    },
    preHandler: [server.authenticate],
    handler: postController.createPost,
  });
}
