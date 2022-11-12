import Fastify from 'fastify';
import { appRoutes } from './routes';
import { userSchemas } from './schemas/user.schema';

const server = Fastify();

async function main() {
  try {
    server.get('/', () => {
      return { message: 'Hello World!' };
    });

    for (const schema of [...userSchemas]) {
      server.addSchema(schema);
    }

    server.register(appRoutes, { prefix: 'api/v1' });

    const address = await server.listen({ port: 3333 });
    console.log(`Server ready at ${address}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
