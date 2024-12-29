import { SessionsCollection } from '../db/models/Session.js';
import { UsersCollection } from '../db/models/User.js';
import bcrypt from 'bcrypt';
import { createSession } from '../utils/createSession.js';

export const findUserByEmail = (email) => UsersCollection.findOne({ email });

export const createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const user = await UsersCollection.create({
    ...userData,
    password: hashedPassword,
  });

  return user;
};

export const deleteSessionByUserId = (userId) =>
  SessionsCollection.deleteOne({ userId });

export const createActiveSession = async (userId) => {
  const session = createSession();
  const createdSession = await SessionsCollection.create({
    userId,
    ...session,
  });

  return createdSession;
};

export const deleteSessionBySessionIdAndRefreshToken = (
  sessionId,
  refreshToken,
) => {
  return SessionsCollection.deleteOne({ _id: sessionId, refreshToken });
};

export const findSessionByAccessToken = (accessToken) =>
  SessionsCollection.findOne({ accessToken });

export const findUserById = (_id) => UsersCollection.findById(_id);
