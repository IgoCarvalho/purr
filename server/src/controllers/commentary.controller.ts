import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import * as appErros from '../helpers/errors';
import prisma from '../lib/prisma';
import {
  CreateCommentarySchema,
  DeleteCommentaryParamsSchema,
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

export async function remove(
  req: FastifyRequest<{ Params: DeleteCommentaryParamsSchema }>,
  reply: FastifyReply
) {
  try {
    const { id: userId } = req.user;
    const { commentaryId } = req.params;

    const commentaryToDelete = await prisma.comment.findUnique({
      where: { id: commentaryId },
    });

    if (!commentaryToDelete) {
      return reply
        .code(StatusCodes.NOT_FOUND)
        .send(appErros.CommentaryNotExists);
    }

    if (commentaryToDelete.ownerId !== userId) {
      return reply
        .code(StatusCodes.FORBIDDEN)
        .send(appErros.IsNotCommentaryOwner);
    }

    await prisma.comment.delete({ where: { id: commentaryId } });

    return { id: commentaryId };
  } catch (err) {
    console.error(err);
    return reply.code(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
}
