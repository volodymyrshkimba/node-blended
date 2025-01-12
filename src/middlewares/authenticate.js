import createHttpError from 'http-errors';
import { findUserById } from '../services/auth.js';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    next(createHttpError(401, 'Unauthorized'));
    return;
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Token must be type Bearer'));
    return;
  }

  const { id } = jwt.verify(token, env('JWT_SECRET'));

  const user = await findUserById(id);

  if (!user) {
    next(createHttpError(401));
    return;
  }

  req.user = user;
  next();
};
