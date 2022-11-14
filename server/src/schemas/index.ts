import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

import { userSchemas } from './user.schema';
import { postSchemas } from './post.schema';
import { commentarySchemas } from './commentary.schema';

async function appSchemas(server: FastifyInstance) {
  const allSchemas = [...userSchemas, ...postSchemas, ...commentarySchemas];

  for (const schema of allSchemas) {
    server.addSchema(schema);
  }
}

export default fp(appSchemas);
