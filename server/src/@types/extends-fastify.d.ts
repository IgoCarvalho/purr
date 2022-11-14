import { File } from 'fastify-multer/lib/interfaces';
import { isMultipart } from 'fastify-multer/lib/lib/content-parser';

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: () => void;
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    isMultipart: typeof isMultipart;
    file: File;
    files: Partial<File>[];
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: { name: string; id: string };
  }
}

export {};
