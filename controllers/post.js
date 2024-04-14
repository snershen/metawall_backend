const PostModel = require("../model/post");
const successHandler = require("../service/successHandler");

const posts = {
  async getPosts(req, res) {
    const allPosts = await PostModel.find();
    successHandler(res, { data: allPosts });
  },
};

module.exports = posts;
