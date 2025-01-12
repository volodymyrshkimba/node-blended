// import { SessionsCollection } from '../db/models/Session.js';
import { UsersCollection } from '../db/models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';
// import { createSession } from '../utils/createSession.js';

export const findUserByEmail = (email) => UsersCollection.findOne({ email });

export const updateUserWithToken = async (id) => {
  const token = jwt.sign(
    {
      id,
    },
    env('JWT_SECRET'),
  );

  return UsersCollection.findByIdAndUpdate(
    id,
    {
      token,
    },
    { new: true },
  );
};

export const createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const user = await UsersCollection.create({
    ...userData,
    password: hashedPassword,
  });

  return updateUserWithToken(user._id);
};

// export const deleteSessionByUserId = (userId) =>
//   SessionsCollection.deleteOne({ userId });

// export const createActiveSession = async (userId) => {
//   const session = createSession();
//   const createdSession = await SessionsCollection.create({
//     userId,
//     ...session,
//   });

//   return createdSession;
// };

// export const deleteSessionBySessionIdAndRefreshToken = (
//   sessionId,
//   refreshToken,
// ) => {
//   return SessionsCollection.deleteOne({ _id: sessionId, refreshToken });
// };

// export const findSessionByAccessToken = (accessToken) =>
//   SessionsCollection.findOne({ accessToken });

// export const findUserById = (_id) => UsersCollection.findById(_id);
