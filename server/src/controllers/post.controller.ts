import { Prisma } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { env } from '../config/env';

import * as appErrors from '../helpers/errors';
import prisma from '../lib/prisma';

import {
  CreatePostSchema,
  DeletePostParamsSchema,
  LikePostParamsSchema,
  ListPostsQuerySchema,
  ListUniquePostParamsSchema,
} from '../schemas/post.schema';

export async function create(
  req: FastifyRequest<{
    Body: CreatePostSchema;
  }>,
  reply: FastifyReply
) {
  try {
    const postData = req.body;
    const userData = req.user;
    const imagesLinks = req.files.map((file) => {
      if (env.isProduction) {
        return String(file.path);
      }

      const link = `http://${req.hostname}/uploads/${file.filename}`;

      return link;
    });

    const createImagesPrismaQuery: Prisma.ImageCreateManyPostInput[] =
      imagesLinks.map((link) => ({
        url: link,
        altText: '',
      }));

    const newPost = await prisma.post.create({
      data: {
        ...postData,
        likes: 0,
        images: {
          createMany: {
            data: createImagesPrismaQuery,
          },
        },
        owner: {
          connect: { id: userData.id },
        },
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

export async function list(
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
        owner: {
          select: {
            id: true,
            avatarUrl: true,
            name: true,
          },
        },
      },
    });

    return posts;
  } catch (err) {
    console.error(err);
    return reply.code(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
}

export async function listUnique(
  req: FastifyRequest<{
    Params: ListUniquePostParamsSchema;
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
      where: { id },
      include: { images: true, comments: true },
    });

    if (!post) {
      return reply.code(StatusCodes.NOT_FOUND).send(appErrors.PostNotExists);
    }

    return post;
  } catch (err) {
    console.error(err);
    return reply.code(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
}

export async function remove(
  req: FastifyRequest<{
    Params: DeletePostParamsSchema;
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = req.params;

    const postToDelete = await prisma.post.findUnique({ where: { id } });

    if (!postToDelete) {
      return reply.code(StatusCodes.NOT_FOUND).send(appErrors.PostNotExists);
    }

    if (postToDelete.ownerId !== req.user.id) {
      return reply.code(StatusCodes.FORBIDDEN).send(appErrors.IsNotPostOwner);
    }

    await prisma.post.delete({ where: { id } });

    return { id };
  } catch (err) {
    console.error(err);
    return reply.code(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
}

export async function addLike(
  req: FastifyRequest<{
    Params: LikePostParamsSchema;
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = req.params;

    const postUpdated = await prisma.post.update({
      where: { id },
      data: {
        likes: {
          increment: 1,
        },
      },
    });

    return { postUpdated };
  } catch (err) {
    console.error(err);
    return reply.code(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
}
