var express = require("express");
var router = express.Router();
const PostControllers = require("../controllers/post")

router.get("/", PostControllers.getPosts);

module.exports = router;
