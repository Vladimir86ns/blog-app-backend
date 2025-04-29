const log = (...args) => {
  if (process.env.ENABLE_LOGS) {
    console.log('[INFO]', ...args);
  }
};

const error = (...args) => {
  if (process.env.ENABLE_LOGS) {
    console.error('[ERROR]', ...args);
  }
};

const warn = (...args) => {
  if (process.env.ENABLE_LOGS) {
    console.warn('[WARN]', ...args);
  }
};

const success = (...args) => {
  if (process.env.ENABLE_LOGS) {
    console.log('[SUCCESS]', ...args);
  }
};

export default {
  log,
  error,
  warn,
  success,
};
