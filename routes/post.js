const express = require("express");
const router = express.Router();
const asyncErrorHandler = require("../service/asyncErrorHandler");
const PostControllers = require("../controllers/post");
const isAuth = require("../service/isAuth");

router.get("/:id", asyncErrorHandler(PostControllers.getPost));
router.delete("/:id", asyncErrorHandler(PostControllers.deletePost));
router.post("/", isAuth, asyncErrorHandler(PostControllers.addPost));
router.patch("/:id", asyncErrorHandler(PostControllers.editPost));

module.exports = router;
