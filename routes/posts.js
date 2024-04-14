var express = require('express');
var router = express.Router();
const PostModel = require("../model/post");

router.get('/', async function(req, res ) {
    const allPosts = await PostModel.find();
    res.send({
      success: true,
      allPosts
    })
    res.end();
});

module.exports = router;
