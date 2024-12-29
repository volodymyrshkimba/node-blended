import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';

import {
  createActiveSession,
  createUser,
  deleteSessionBySessionIdAndRefreshToken,
  deleteSessionByUserId,
  findUserByEmail,
} from '../services/auth.js';
import { setCookie } from '../utils/setCookie.js';

export const registerUserController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);

  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  const createdUser = await createUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {
      name: createdUser.name,
      email: createdUser.email,
    },
  });
};

export const loginUserController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);

  if (!user) {
    throw createHttpError(401, 'Email or password wrong');
  }

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password,
  );

  if (!isValidPassword) {
    throw createHttpError(401, 'Email or password wrong');
  }

  await deleteSessionByUserId(user._id);

  const session = await createActiveSession(user._id);

  setCookie(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  await deleteSessionBySessionIdAndRefreshToken(sessionId, refreshToken);

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};
