var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var postsRouter = require('./routes/posts');
var postRouter = require('./routes/post');

var app = express();
require('./connections');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/posts', postsRouter);
app.use('/post', postRouter);

module.exports = app;
