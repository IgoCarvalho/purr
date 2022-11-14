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

  server.route({
    method: 'GET',
    url: '/',
    schema: {
      querystring: $postSchemasRef('ListPostsQuerySchema'),
    },
    preHandler: [server.authenticate],
    handler: postController.listPosts,
  });

  server.route({
    method: 'GET',
    url: '/public',
    schema: {
      querystring: $postSchemasRef('ListPostsQuerySchema'),
    },
    handler: postController.listPosts,
  });
}
