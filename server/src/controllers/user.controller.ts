import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import * as appErrors from '../helpers/errors';
import { checkPassword, hashPassword } from '../lib/hash';
import prisma from '../lib/prisma';
import { CreateUserSchema, LoginUserSchema } from '../schemas/user.schema';

export async function createUser(
  req: FastifyRequest<{
    Body: CreateUserSchema;
  }>,
  reply: FastifyReply
) {
  try {
    const { password, ...userData } = req.body;

    const existentUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existentUser) {
      return reply
        .code(StatusCodes.BAD_REQUEST)
        .send(appErrors.UserEmailAlreadyExists);
    }

    const hashedPassword = await hashPassword(password);

    const createdUser = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });

    return reply.code(StatusCodes.CREATED).send(createdUser);
  } catch (e) {
    console.error(e);
    return reply.code(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
  }
}

export async function login(
  req: FastifyRequest<{
    Body: LoginUserSchema;
  }>,
  reply: FastifyReply
) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return reply
        .code(StatusCodes.NOT_FOUND)
        .send(appErrors.UserInvalidCredentials);
    }

    const passwordMatches = await checkPassword(password, user.password);

    if (!passwordMatches) {
      return reply
        .code(StatusCodes.NOT_FOUND)
        .send(appErrors.UserInvalidCredentials);
    }

    const token = await reply.jwtSign({ id: user.id });

    return { user, token };
  } catch (e) {
    console.error(e);
    return reply.code(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
  }
}
