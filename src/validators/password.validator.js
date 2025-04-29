export const validatePassword = (password) => {
  if (typeof password !== 'string') {
    throw new Error('Password must be string.');
  }

  if (password.length > 100) {
    throw new Error('Password is to long.');
  }
};
