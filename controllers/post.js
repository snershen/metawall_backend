const PostModel = require("../model/post");
const successHandler = require("../service/successHandler");

const posts = {
  async getPosts(req, res) {
    const allPosts = await PostModel.find();
    successHandler(res, { data: allPosts });
  },
  async deleteAllPosts(req, res) {
    await PostModel.deleteMany({});
    successHandler(res, { message: "已刪除所有貼文" });
  },
};

module.exports = posts;
