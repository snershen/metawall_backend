var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var postsRouter = require('./routes/posts');
var postRouter = require('./routes/post');

var app = express();
require('./connections');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/posts', postsRouter);
app.use('/post', postRouter);
// app.use('/users', usersRouter);

app.use(function(req, res){
  res.status(404).send({
    success: false,
    message: "路由錯誤"
  })
})

// 統一管理錯誤
app.use(function(err, req, res, next){
  err.statusCode = err.statusCode || 500;
  res.status(statusCode).send({
    "error": err
  })
})

module.exports = app;
