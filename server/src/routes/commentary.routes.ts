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
}
