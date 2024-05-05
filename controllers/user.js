const mongoose = require("mongoose");
const UserModel = require("../model/user");
const appError = require("../service/appError");
const successHandler = require("../service/successHandler");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const generateSendJWT = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_DAY,
  });
  user.password = undefined;
  res.status(statusCode).send({
    status: "success",
    user: {
      token,
      name: user.name,
    },
  });
};

const user = {
  async signUp(req, res, next) {
    let { name, email, password, confirmPassword } = req.body;
    // 驗證欄位格式是否正確
    if (!name || !email || !password || !confirmPassword) {
      return next(appError("400", "欄位未填寫完成", next));
    }
    if (!validator.isEmail(email)) {
      return next(appError("400", "Email 格式不正確", next));
    }
    if (!validator.isLength(password, { minLength: 8 })) {
      return next(appError("400", "密碼長度須大於 8 碼", next));
    }
    if (!validator.isLength(name, { minLength: 2 })) {
      return next(appError("400", "暱稱至少 2 個字元以上", next));
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return next(appError("400", "此帳號已經註冊過"));
    }
    // 密碼加密
    password = await bcrypt.hash(req.body.password, 12);
    // 資料傳入資料庫
    const newUser = await UserModel.create({
      email,
      password,
      name,
    });
    generateSendJWT(newUser, 201, res);
  },
  async signIn(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(appError("400", "欄位未填寫完成", next));
    }
    const user = await UserModel.findOne({ email }).select("+password");
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return next(appError(400, "密碼不正確", next));
    }
    generateSendJWT(user, 200, res);
  },
  async getProfile(req, res, next) {
    successHandler(res, { data: { user: req.user } });
  },
  async updatePassword(req, res, next) {
    const { password, confirmPassword } = req.body;
    if (!password || !confirmPassword) {
      return next(appError(400, "欄位未填寫完成", next));
    }
    if (password !== confirmPassword) {
      return next(appError(400, "密碼不一致", next));
    }
    const newPassword = await bcrypt.hash(password, 12);
    const user = await UserModel.findByIdAndUpdate(req.user.id, {
      password: newPassword,
    });
    generateSendJWT(user, 200, res);
  },
  async updateProfile(req, res, next) {
    const { name, sex } = req.body;
    if (!name || !name.trim()) {
      return next(appError(400, "暱稱為必填", next));
    }
    if (!validator.isLength(name, { minLength: 2 })) {
      return next(appError("400", "暱稱至少 2 個字元以上", next));
    }
    const user = await UserModel.findByIdAndUpdate(
      req.user.id,
      {
        name,
        sex,
      },
      { new: true }
    );
    generateSendJWT(user, 200, res);
  },
};

module.exports = user;
