const { Posts } = require("../models");
const asyncHandler = require("express-async-handler");

exports.getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Posts.findAll();
  res.json(posts);
});

exports.createPost = asyncHandler(async (req, res) => {
  const { username, description, imageUrl, userId } = req.body;

  console.log("=====>req.body");
  console.log(req.body);
  console.log("=====>req.file");
  console.log(req.file);

  const post = await Posts.create({
    author: username,
    description,
    imageUrl,
    UserId: userId,
  });
  res.status(201).json(post);
});
