import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import prisma from '../lib/prisma';
import {
  CreateCommentarySchema,
  ListPostCommentariesParamsSchema,
} from '../schemas/commentary.schema';

export async function create(
  req: FastifyRequest<{ Body: CreateCommentarySchema }>,
  reply: FastifyReply
) {
  const { postId, ...commentData } = req.body;
  const { id: userId } = req.user;

  try {
    const newComment = await prisma.comment.create({
      data: {
        ...commentData,
        owner: {
          connect: { id: userId },
        },
        post: {
          connect: { id: postId },
        },
      },
    });

    return reply.code(StatusCodes.CREATED).send(newComment);
  } catch (err) {
    console.error(err);
    return reply.code(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
}

export async function listByPost(
  req: FastifyRequest<{ Params: ListPostCommentariesParamsSchema }>,
  reply: FastifyReply
) {
  try {
    const { postId } = req.params;

    const commentaries = await prisma.comment.findMany({
      where: { postId },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return commentaries;
  } catch (err) {
    console.error(err);
    return reply.code(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
}
