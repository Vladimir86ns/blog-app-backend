export const validateEmail = (email) => {
  if (typeof email !== 'string') {
    throw new Error('Email must be string.');
  }

  if (email.length > 100) {
    throw new Error('Email is to long.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Email format not valid.');
  }
};
