const UserModel = require("../model/user");
const appError = require("../service/appError");
const asyncErrorHandler = require("../service/asyncErrorHandler");
const jwt = require("jsonwebtoken");

const isAuth = asyncErrorHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(appError(401, "尚未登入", next));
  }

  const decoded = await new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        reject(err);
        return next(appError(401, "驗證未通過", next));
      } else {
        resolve(payload);
      }
    });
  });
  const currentUser = await UserModel.findById(decoded.id);
  req.user = currentUser;
  next();
});

module.exports = isAuth;
