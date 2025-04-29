import jwt from 'jsonwebtoken';
import logger from '../../services/logService.js';
import { setTokens } from '../../utils/tokenHelper.js';

const me = async (_, __, context) => {
  const token = context.req.cookies.accessToken;

  if (!token && !refreshToken) {
    return null
  };

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    return { email: decoded.email };
  } catch (error) {
    if (error.name === 'TokenExpiredError' || error.name === 'invalid token') {
      logger.warn('Error token expired:');
      return handleRefreshToken(context)
    } else {
      logger.error('Error on refresh token:', error);
      return null;
    }
  }
};

const handleRefreshToken = (context) => {
  const refreshToken = context.req.cookies.refreshToken;

  if (!refreshToken) {
    logger.log('No refresh token:');
    return null;
  }

  try {
    const refreshDecoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    setTokens(context.res, refreshDecoded.email)

    logger.success('Token is successfully refreshed');
    return { email: refreshDecoded.email };
  } catch (refreshError) {
    logger.error('Refresh token not valid.', refreshError);
    return null;
  }
}

export default {
  me,
};
