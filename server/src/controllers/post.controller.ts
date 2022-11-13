import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';

import prisma from '../lib/prisma';
import { CreatePostSchema } from '../schemas/post.schema';

export async function createPost(
  req: FastifyRequest<{
    Body: CreatePostSchema;
  }>,
  reply: FastifyReply
) {
  try {
    const postData = req.body;
    const userData = req.user;

    const newPost = await prisma.post.create({
      data: {
        ...postData,
        likes: 0,
        ownerId: userData.id,
      },
      include: {
        images: true,
      },
    });

    return reply.code(StatusCodes.CREATED).send(newPost);
  } catch (err) {
    console.error(err);
    return reply.code(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
}
