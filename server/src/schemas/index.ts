import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

import { userSchemas } from './user.schema';
import { postSchemas } from './post.schema';

async function appSchemas(server: FastifyInstance) {
  const allSchemas = [...userSchemas, ...postSchemas];

  for (const schema of allSchemas) {
    server.addSchema(schema);
  }
}

export default fp(appSchemas);
