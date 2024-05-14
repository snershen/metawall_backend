const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
// const axios = require("axios")

const postsRouter = require("./routes/posts");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const uploadRouter = require("./routes/upload");
const resErrorDev = require("./service/resErrorDev");
const resErrorProd = require("./service/resErrorProd");

const app = express();

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

require("./connections");

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/posts", postsRouter);
app.use("/post", postRouter);
app.use("/users", userRouter);
app.use("/upload", uploadRouter);
// app.use('/users', usersRouter);

app.use(function (req, res) {
  res.status(404).send({
    success: false,
    message: "路由錯誤",
  });
});

// 統一管理錯誤
app.use(function (err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === "dev") {
    return resErrorDev(err, res);
  }
  // 額外處理套件回傳的錯誤資訊，此處是 mongoose
  if (err.name === "ValidationError") {
    err.message = "資料欄位填寫錯誤，請重新填寫";
    err.isOperational = true;
    return resErrorProd(err, res);
  }
  // 處理圖片過大的錯誤
  if (err.name === "MulterError") {
    err.message = "圖片不得超過 2MB";
    err.isOperational = true;
    return resErrorProd(err, res);
  }
  console.log(err.name)
  return resErrorProd(err, res);
});

process.on("unhandledRejection", (err, promise) => {
  console.log("未捕捉到的 rejection", promise, "原因", err);
});

// axios.get('https://www.nodfss232')
//   .then(res=>{
//     console.log(res)
//   })

module.exports = app;
