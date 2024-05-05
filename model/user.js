const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "請輸入姓名"],
    },
    sex:{
      type: String,
      enum: ["Male", "Female", "Intersex"],
    },
    photo: String,
    email: {
      type: String,
      required: [true, "請輸入 Email"],
      lowercase: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Email 格式不正確",
      },
    },
    password:{
      type: String,
      required: [true, '請輸入密碼'],
      minLength: 8,
      select: false
    }
  },
  { versionKey: false }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
