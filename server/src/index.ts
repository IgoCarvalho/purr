import Fastify from 'fastify';

const server = Fastify();

async function main() {
  try {
    server.get('/', () => {
      return { message: 'Hello World!' };
    });

    const address = await server.listen({ port: 3333 });
    console.log(`Server ready at ${address}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
