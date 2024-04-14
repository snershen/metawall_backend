const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name 屬性不得為空"],
  },
  content: {
    type: String,
    required: [true, "content 屬性不得為空"],
  },
  tags: {
    type: [String],
    required: [true, "tags 屬性不得為空"],
  },
  image: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Number,
    default: 0,
  },
},  { versionKey: false });

const Post = mongoose.model("posts", postSchema);

module.exports = Post;
