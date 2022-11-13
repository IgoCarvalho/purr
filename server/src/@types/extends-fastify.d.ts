declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: () => void;
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: { name: string; id: string };
  }
}

export {};
