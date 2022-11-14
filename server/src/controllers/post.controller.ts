import { Prisma } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';

import prisma from '../lib/prisma';
import { CreatePostSchema, ListPostsQuerySchema } from '../schemas/post.schema';

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

export async function listPosts(
  req: FastifyRequest<{
    Querystring: ListPostsQuerySchema;
  }>,
  reply: FastifyReply
) {
  try {
    const page = req.query.page * req.query.limit;
    const limit = req.query.limit;

    let postsQuery: Prisma.PostWhereInput = {};

    if (req.user) {
      const { scope } = req.query;

      postsQuery =
        scope === 'owner'
          ? {
              ownerId: req.user.id,
            }
          : {
              NOT: { ownerId: req.user.id },
            };
    }

    const posts = await prisma.post.findMany({
      skip: page,
      take: limit,
      where: postsQuery,
      orderBy: { createdAt: 'desc' },
      include: {
        images: true,
      },
    });

    return posts;
  } catch (err) {
    console.error(err);
    return reply.code(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
}
