const express = require("express");
const router = express.Router();
const asyncErrorHandler = require("../service/asyncErrorHandler");
const PostControllers = require("../controllers/post");

router.get("/:id", asyncErrorHandler(PostControllers.getPost));
router.delete("/:id", asyncErrorHandler(PostControllers.deletePost));
router.post("/", asyncErrorHandler(PostControllers.addPost));
router.patch("/:id", asyncErrorHandler(PostControllers.editPost));

module.exports = router;
