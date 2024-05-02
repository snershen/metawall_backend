const resErrorDev = (err, res) => {
  console.log(err)
  res.status(err.statusCode).send({
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

module.exports = resErrorDev