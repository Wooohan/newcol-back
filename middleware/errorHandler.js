import logger from '../utils/logger.js';

export function errorHandler(err, req, res, _next) {
  logger.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
  });

  const isDev = process.env.NODE_ENV === 'development';

  res.status(err.status || 500).json({
    error: {
      message: isDev ? err.message : 'Internal server error',
      ...(isDev && { stack: err.stack }),
    },
  });
}

export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
