import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';

import {
  clearToken,
  createUser,
  findUserByEmail,
  updateUserWithToken,
} from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);
  if (user) {
    throw createHttpError(409, 'Email in use');
  }
  const createdUser = await createUser(req.body);
  res.status(201).json({
    token: createdUser.token,
    user: {
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

  const userWithToken = await updateUserWithToken(user._id);

  res.json({
    token: userWithToken.token,
    user: {
      name: userWithToken.name,
      email: userWithToken.email,
    },
  });
};

export const logoutUserController = async (req, res) => {
  await clearToken(req.user._id);
  res.status(204).send();
};

export const currentUserController = (req, res) => {
  res.status(200).json({
    name: req.user.name,
    email: req.user.email,
  });
};
