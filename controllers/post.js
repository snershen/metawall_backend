const mongoose = require("mongoose");
const PostModel = require("../model/post");
const successHandler = require("../service/successHandler");
const appError = require("../service/appError");
// const errorHandler = require("../service/errorHandler");
const User = require("../model/user");

const posts = {
  // /posts
  async getPosts(req, res, next) {
    const { timeSort, q } = req.query;
    const timeSortStr = timeSort === "asc" ? "createdAt" : "-createdAt";
    const qStr = q !== undefined ? { content: new RegExp(q) } : {};
    const postsResult = await PostModel.find(qStr)
      .populate({
        // 指定 posts 資料表裡的 user 欄位
        path: "user",
        // 指定取出的欄位
        select: "name photo",
      })
      .sort(timeSortStr);
    successHandler(res, { total: postsResult.length, data: postsResult });
    if (postsResult.length === 0) {
      successHandler(200, { message: "查無相關貼文" });
    }
  },
  async deleteAllPosts(req, res, next) {
    await PostModel.deleteMany({});
    successHandler(res, { message: "已刪除所有貼文" });
  },
  // /post
  async getPost(req, res, next) {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(appError(400, "您輸入的是無效 id"));
    }
    const post = await PostModel.findById(id);
    successHandler(res, { data: post });
  },
  async deletePost(req, res, next) {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(appError(400, "您輸入的是無效 id"));
    }
    const deletedPost = await PostModel.findByIdAndDelete(id);
    if (!deletedPost) {
      return next(appError(400, "找不到此貼文"));
    }
    successHandler(res, { message: "已刪除貼文" });
  },
  async addPost(req, res, next) {
    if (req.body.content !== undefined && req.body.content.trim()) {
      const { user, content, tags, image, likes, comments } = req.body;
      const newPost = {
        user,
        content: content.trim(),
        tags,
        image,
        createdAt: Date.now(),
        likes,
        comments,
      };
      await PostModel.create(newPost);
      successHandler(res, { message: "已建立貼文" });
      return;
    }
    return next(appError(400, "content 屬性不能為空值"));
  },
  async editPost(req, res, next) {
    if (req.body.content !== undefined && req.body.content.trim()) {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(appError(400, "您輸入的是無效 id"));
      }
      const { name, content, tags, image, createdAt, likes, comments } = req.body;
      const newPost = {
        name,
        content: content.trim(),
        tags,
        image,
        createdAt,
        likes,
        comments,
      };

      const editPost = await PostModel.findByIdAndUpdate(id, newPost);
      if (!editPost) {
        return next(appError(400, "找不到此貼文"));
      }
      successHandler(res, { message: "已更新貼文" });
    }
  },
};

module.exports = posts;
