const express = require("express");
const router = express.Router();
const UserControllers = require("../controllers/user");
const asyncErrorHandler = require("../service/asyncErrorHandler");
const isAuth = require("../service/isAuth")

router.post("/sign_up", asyncErrorHandler(UserControllers.signUp));
router.post("/sign_in", asyncErrorHandler(UserControllers.signIn));
router.get("/profile", isAuth, UserControllers.getProfile );

module.exports = router;
