var express = require("express");
var router = express.Router();
const PostControllers = require("../controllers/post")

router.get("/", PostControllers.getPosts);
router.delete("/", PostControllers.deleteAllPosts);

module.exports = router;
