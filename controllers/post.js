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
  async getPost(req, res) {
    try {
      const id = req.params.id;
      const post = await PostModel.findById(id);
      successHandler(res, { data: post });
    } catch (err) {
      res.status(400).send({
        success: false,
        message: "找不到此 ID",
      });
    }
  },
  async deletePost(req, res){
    try {
      const id = req.params.id;
      console.log(req.params.id, id)
      await PostModel.findByIdAndDelete(id);
      successHandler(res, { message: '已刪除貼文' });
    } catch (err) {
      res.status(400).send({
        success: false,
        message: "找不到此 ID",
      });
    }
  },
};

module.exports = posts;
