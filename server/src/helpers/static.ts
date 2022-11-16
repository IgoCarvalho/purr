import fastifyStatic from '@fastify/static';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import path from 'path';

import { env } from '../config/env';

async function staticFiles(server: FastifyInstance) {
  if (!env.isProduction) {
    const uploadsPath = path.join(__dirname, '..', '..', 'uploads');

    server.register(fastifyStatic, {
      root: uploadsPath,
      prefix: '/uploads/',
    });
  }
}

export default fp(staticFiles);
