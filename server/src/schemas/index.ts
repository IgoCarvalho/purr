import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

import { userSchemas } from './user.schema';

async function appSchemas(server: FastifyInstance) {
  const allSchemas = [...userSchemas];

  for (const schema of allSchemas) {
    server.addSchema(schema);
  }
}

export default fp(appSchemas);
