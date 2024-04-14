const express = require("express");
const router = express.Router();
const PostControllers = require("../controllers/post");

router.get("/:id", PostControllers.getPost);
router.delete("/:id", PostControllers.deletePost);

module.exports = router