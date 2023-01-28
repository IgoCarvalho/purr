import { FastifyInstance } from 'fastify';

import * as postController from '../controllers/post.controller';
import { multerUploader } from '../helpers/upload';
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
    preValidation: [server.authenticate, multerUploader.array('files')],
    handler: postController.create,
  });

  server.route({
    method: 'GET',
    url: '/',
    schema: {
      querystring: $postSchemasRef('ListPostsQuerySchema'),
    },
    preHandler: [server.authenticate],
    handler: postController.list,
  });

  server.route({
    method: 'GET',
    url: '/public',
    schema: {
      querystring: $postSchemasRef('ListPostsQuerySchema'),
    },
    handler: postController.list,
  });

  server.route({
    method: 'GET',
    url: '/:id',
    schema: {
      params: $postSchemasRef('ListUniquePostParamsSchema'),
    },
    handler: postController.listUnique,
  });

  server.route({
    method: 'DELETE',
    url: '/:id',
    schema: {
      params: $postSchemasRef('DeletePostParamsSchema'),
    },
    preHandler: [server.authenticate],
    handler: postController.remove,
  });

  server.route({
    method: 'PATCH',
    url: '/:id/like',
    schema: {
      params: $postSchemasRef('LikePostParamsSchema'),
    },
    preHandler: [server.authenticate],
    handler: postController.addLike,
  });
}
