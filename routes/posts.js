var express = require("express");
var router = express.Router();
const PostModel = require("../model/post");
const successHandler = require("../service/successHandler");

router.get("/", async function (req, res) {
  const allPosts = await PostModel.find();
  successHandler(res, { data: allPosts });
});

module.exports = router;
