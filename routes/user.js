const express = require("express");
const router = express.Router();
const UserControllers = require("../controllers/user");
const asyncErrorHandler = require("../service/asyncErrorHandler");

router.post("/sign_up", asyncErrorHandler(UserControllers.signUp));
// router.post("/sign_in", asyncErrorHandler(UserControllers.signIn));

module.exports = router;
