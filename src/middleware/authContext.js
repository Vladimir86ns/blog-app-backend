import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

export const authContext = async ({ req, res }) => {
  if (canSkipRoutesForValidations(req)) {
    return { req, res };
  }

  const token = req.cookies?.accessToken;
  let user = null;

  if (token) {
    user = checkTokenIsValid(token);
  } else {
    throw new GraphQLError('Not authorized', {
      extensions: { code: 'UNAUTHORIZED' },
    });
  }

  return { req, res, user };
};

const checkTokenIsValid = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { email: decoded.email };
  } catch (err) {
    throw new GraphQLError('Not authorized', {
      extensions: { code: 'UNAUTHORIZED' },
    });
  }
}

const canSkipRoutesForValidations = (req) => {
  return req.body?.query?.includes('login') || 
    req.body?.query?.includes('signup') || 
    req.body?.query?.includes('me');
}
