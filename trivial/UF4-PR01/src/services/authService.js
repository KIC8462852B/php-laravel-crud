import bcrypt from 'bcrypt';
import User from '../models/db/userModel.js';
import { create } from '../database/crudRepository.js';

const saltRounds = 10;

export const registerUser = async (user) => {
  const userExists = await User.findOne({ username: user.username });
  if (userExists) {
    throw new Error('Username already exists');
  }

  // HASH PASSWORD https://www.npmjs.com/package/bcrypt
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);

  const saveUser = { ...user, password: hashedPassword };
  return await create(User, saveUser);
};

export const loginUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch ? user : null;
};