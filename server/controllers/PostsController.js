const { Posts } = require("../models");
const asyncHandler = require("express-async-handler");

exports.getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Posts.findAll();
  res.json(posts);
});

exports.createPost = asyncHandler(async (req, res) => {
  const { username, description, image, userId } = req.body;
  if (req.files) {
    const { image } = req.files;
  }
  const post = await Posts.create({
    author: username,
    description,
    image,
    UserId: userId,
  });
  res.status(201).json(post);
});
