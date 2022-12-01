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

exports.deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Posts.destroy({ where: { id } });
  res.status(200).json("Post successfuly deleted");
});
