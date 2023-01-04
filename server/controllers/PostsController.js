const { Posts } = require("../models");
const asyncHandler = require("express-async-handler");

// Get All Posts
exports.getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Posts.findAll();
  res.json(posts);
});

// Create A Post
exports.createPost = asyncHandler(async (req, res) => {
  const { username, description, imageName, imageUrl, userId } = req.body;
  const post = await Posts.create({
    author: username,
    description,
    imageName,
    imageUrl,
    UserId: userId,
  });
  res.status(201).json(post);
});

// Update A Post
exports.updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId, description, imageUrl, isAdmin } = req.body;
  const foundPost = await Posts.findOne({ where: { id } });

  if (foundPost.UserId === userId || isAdmin) {
    await Posts.update({ description, imageUrl }, { where: { id } });
    res.status(200).json({ message: "Post successfuly updated" });
  } else {
    return res.json({ message: "You can update only your own posts" });
  }
});

// Delete A Post
exports.deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId, isAdmin } = req.body;
  const foundPost = await Posts.findOne({ where: { id } });

  if (foundPost.UserId === userId || isAdmin) {
    return (
      await Posts.destroy({ where: { id } }),
      res.status(200).json({ message: "Post successfuly deleted" })
    );
  } else {
    return res.json({ message: "You can delete only your own posts" });
  }
});
