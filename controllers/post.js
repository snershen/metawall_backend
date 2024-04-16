const PostModel = require("../model/post");
const successHandler = require("../service/successHandler");
const errorHandler = require("../service/errorHandler");

const posts = {
  // /posts
  async getPosts(req, res) {
    const allPosts = await PostModel.find();
    successHandler(res, { data: allPosts });
  },
  async deleteAllPosts(req, res) {
    await PostModel.deleteMany({});
    successHandler(res, { message: "已刪除所有貼文" });
  },
  // /post
  async getPost(req, res) {
    try {
      const id = req.params.id;
      const post = await PostModel.findById(id);
      successHandler(res, { data: post });
    } catch (err) {
      errorHandler(res, "找不到此貼文");
    }
  },
  async deletePost(req, res) {
    try {
      const id = req.params.id;
      await PostModel.findByIdAndDelete(id);
      successHandler(res, { message: "已刪除貼文" });
    } catch (err) {
      errorHandler(res, "找不到此貼文");
    }
  },
  async addPost(req, res) {
    try {
      if (req.body.content.trim()) {
        const { name, content, tags, image, createdAt, likes, comments } = req.body;
        const newPost = {
          name,
          content,
          tags,
          image,
          createdAt,
          likes,
          comments,
        };
        await PostModel.create(newPost);
        successHandler(res, { message: "已建立貼文" });
        return;
      }
      errorHandler(res, "content 屬性未填寫");
    } catch (err) {
      errorHandler(res, err.errors);
    }
  },
  async editPost(req, res) {
    try {
      if (req.body.content.trim()) {
        const id = req.params.id;
        const { name, content, tags, image, createdAt, likes, comments } = req.body;
        const newPost = {
          name,
          content,
          tags,
          image,
          createdAt,
          likes,
          comments,
        };
        await PostModel.findByIdAndUpdate(id, newPost);
        successHandler(res, { message: "已更新貼文" });
        return;
      }
      errorHandler(res, "找不到此貼文");
    } catch (err) {
      errorHandler(res, "找不到此貼文");
    }
  },
};

module.exports = posts;
