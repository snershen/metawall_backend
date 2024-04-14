const errorHandler = (res, err) => {
  res.status(400).send({
    success: false,
    message: err,
  });
  res.end()
}

module.exports = errorHandler