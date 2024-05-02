const resErrorProd = (err, res) => {
  // 預期錯誤
  if (err.isOperational) {
    res.status(err.statusCode).send({
      success: false,
      message: err.message,
    });
  } else {
    // 預期外的錯誤
    console.error("出現重大錯誤");
    res.status(500).send({
      status: "error",
      message: "系統錯誤，請聯絡系統管理員",
    });
  }
};

module.exports = resErrorProd;
