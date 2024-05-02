const appError = (httpStatus, errorMessage) => {
  const error = newError(errorMessage);
  error.statusCode = httpStatus;
  error.message = errorMessage;
  // 標示為預期內的錯誤
  error.isOperational = true;
  return error;
};

modules.exports = appError;
