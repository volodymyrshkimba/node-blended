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

export const clearToken = async (id) => {
  await UsersCollection.findByIdAndUpdate(id, {
    token: '',
  });
};

export const findUserById = (id) => UsersCollection.findById(id);

export const findUserByIdAndToken = (_id, token) =>
  UsersCollection.findOne({ _id, token });
