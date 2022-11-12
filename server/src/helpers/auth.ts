import { FastifyInstance } from 'fastify';
import fjwt from '@fastify/jwt';
import fp from 'fastify-plugin';

async function jwtAuth(server: FastifyInstance) {
  server.register(fjwt, { secret: process.env.JWT_SECRET! });
}

export default fp(jwtAuth);
