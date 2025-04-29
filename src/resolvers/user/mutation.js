import bcrypt from 'bcryptjs';
import { GraphQLError } from 'graphql';
import getRedisClient from '../../services/redisService.js';
import { setTokens } from '../../utils/tokenHelper.js';
import { validateEmail } from '../../validators/email.validator.js';
import { validatePassword } from '../../validators/password.validator.js';

const signup = async (parent, { email, password }, context) => {
  const redis = await getRedisClient();
  validatePassword(password);
  validateEmail(email);

  const exists = await redis.exists(`user:${email}`);
  if (exists) {
    throw new GraphQLError('User already exists', { extensions: { code: 'BAD_INPUT' } });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await redis.hSet(`user:${email}`, { email, password: hashedPassword });
  setTokens(context.res, email);

  return { user: { email } };
};

const login = async (parent, { email, password }, context) => {
  const redis = await getRedisClient();
  validatePassword(password);
  validateEmail(email);
  const user = await redis.hGetAll(`user:${email}`);

  if (!user.email) {
    throw new GraphQLError('User not found', { extensions: { code: 'BAD_INPUT' } });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new GraphQLError('Invalid credentials', { extensions: { code: 'BAD_INPUT' } });
  }
  setTokens(context.res, email);

  return { user: { email } };
};

const logout = async (parent, args, context) => {
  context.res.clearCookie('accessToken');
  context.res.clearCookie('refreshToken');

  return { message: 'Logged out successfully!' };
};

export default {
  signup,
  login,
  logout,
};
