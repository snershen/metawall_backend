const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "請輸入姓名"],
    },
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
    photo: String,
  },
  { versionKey: false }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
