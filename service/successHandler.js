const successHandler = (res, result) => {
  if (result.data) {
    res.send({
      success: true,
      data: result.data,
    });
  } else {
    res.send({
      success: true,
      message: result.message,
    });
  }
  res.end();
};

module.exports = successHandler;
