import Fastify from 'fastify';

import jwtAuth from './helpers/auth';
import appSchemas from './schemas';
import { appRoutes } from './routes';

const server = Fastify();

async function main() {
  try {
    server.get('/', () => {
      return { message: 'Hello World!' };
    });

    server.register(jwtAuth);

    server.register(appSchemas);

    server.register(appRoutes, { prefix: 'api/v1' });

    const address = await server.listen({ port: 3333 });
    console.log(`Server ready at ${address}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
