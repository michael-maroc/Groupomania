const { Comments } = require("../models");
const asyncHandler = require("express-async-handler");

// Get All Comments
exports.getAllComment = asyncHandler(async (req, res) => {
  const commentsList = await Comments.findAll();
  res.status(200).json(commentsList);
});

// Get Comments From A Post
exports.getPostComments = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const commentsList = await Comments.findAll({ where: { PostId: id } });
  res.status(200).json(commentsList);
});

// Create A Comment
exports.createComment = asyncHandler(async (req, res) => {
  const { username, comment, PostId, userId } = req.body;
  const newComment = await Comments.create({
    author: username,
    comment,
    PostId,
    UserId: userId,
  });
  res.status(201).json(newComment);
});

// Delete A Comment
exports.deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedComment = await Comments.destroy({ where: { id } });
  res.status(204).json(deletedComment);
});
