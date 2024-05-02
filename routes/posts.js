var express = require("express");
var router = express.Router();
const PostControllers = require("../controllers/post")
const asyncErrorHandler = require("../service/asyncErrorHandler")

router.get("/", asyncErrorHandler(PostControllers.getPosts));
router.delete("/", asyncErrorHandler(PostControllers.deleteAllPosts));

module.exports = router;
