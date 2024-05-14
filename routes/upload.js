const express = require("express");
const router = express.Router();
const uploadImageControllers = require("../controllers/uploadImage");
const asyncErrorHandler = require("../service/asyncErrorHandler");
const isAuth = require("../service/isAuth");
const uploadValidator = require("../service/image")

router.post("/", isAuth, uploadValidator, asyncErrorHandler(uploadImageControllers.upload));

module.exports = router;