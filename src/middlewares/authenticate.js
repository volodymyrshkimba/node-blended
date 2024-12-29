import createHttpError from 'http-errors';
import { findSessionByAccessToken, findUserById } from '../services/auth.js';

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

  const session = await findSessionByAccessToken(token);

  if (!session) {
    next(createHttpError(401, 'Session not found'));
    return;
  }

  const isTokenExpired = Date.now() > session.accessTokenValidUntil;

  if (isTokenExpired) {
    next(createHttpError(401, 'Access token expired'));
    return;
  }

  const user = await findUserById(session.userId);

  if (!user) {
    next(createHttpError(401));
    return;
  }

  req.user = user;
  next();
};
