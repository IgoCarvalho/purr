import { FastifyInstance } from 'fastify';

import { $commentarySchemasRef } from '../schemas/commentary.schema';
import * as commentaryController from '../controllers/commentary.controller';

export async function commentaryRoutes(server: FastifyInstance) {
  server.route({
    method: 'POST',
    url: '/',
    schema: {
      body: $commentarySchemasRef('CreateCommentarySchema'),
    },
    preHandler: [server.authenticate],
    handler: commentaryController.create,
  });

  server.route({
    method: 'GET',
    url: '/post/:postId',
    schema: {
      params: $commentarySchemasRef('ListPostCommentariesParamsSchema'),
      response: {
        200: $commentarySchemasRef('ListPostCommentariesResponseSchema'),
      },
    },
    handler: commentaryController.listByPost,
  });

  server.route({
    method: 'DELETE',
    url: '/:commentaryId',
    schema: {
      params: $commentarySchemasRef('DeleteCommentaryParamsSchema'),
    },
    preHandler: [server.authenticate],
    handler: commentaryController.remove,
  });
}
