// 404 error handler
// must be after all routes to be sure that this
// path is not handle so we throw an error

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// if error return json response to client
// if we throw an error any where in the app
// this middleware will handle it.

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.NODE_ENV === 'production' ? null : err.stack
  });
};

export { notFound, errorHandler };
