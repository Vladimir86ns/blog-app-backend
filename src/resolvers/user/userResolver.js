import userMutations from './mutation.js';
import userQueries from './query.js';

const userResolver = {
  Query: {
    me: userQueries.me
  },
  Mutation: {
    signup: userMutations.signup,
    login: userMutations.login,
    logout: userMutations.logout,
  },
};

export default userResolver;
