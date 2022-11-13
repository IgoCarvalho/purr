import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fjwt from '@fastify/jwt';
import fp from 'fastify-plugin';

async function jwtAuth(server: FastifyInstance) {
  server.register(fjwt, {
    secret: process.env.JWT_SECRET!,
    sign: { expiresIn: '7d' },
  });

  server.decorate(
    'authenticate',
    async (req: FastifyRequest, reply: FastifyReply) => {
      try {
        await req.jwtVerify();
      } catch (e) {
        reply.send(e);
      }
    }
  );
}

export default fp(jwtAuth);
