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
exports.addComment = asyncHandler(async (req, res) => {
  const { username, comment, userId, PostId } = req.body;
  const newComment = await Comments.create({
    author: username,
    comment,
    UserId: userId,
    PostId,
  });
  res.status(201).json(newComment);
});

// Update A Comment
exports.updateComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId, isAdmin, comment } = req.body;
  const foundComment = await Comments.findOne({ where: { id } });

  if (foundComment.UserId === userId || isAdmin) {
    return (
      await foundComment.update({ comment }, { where: { id } }),
      res.json({ message: "Comment successfuly updated" })
    );
  } else {
    return res.json({ message: "You can update only your comments" });
  }
});

// Delete A Comment
exports.deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId, isAdmin } = req.body;
  const foundComment = await Comments.findOne({ where: { id } });

  if (foundComment.UserId === userId || isAdmin) {
    return (
      await Comments.destroy({ where: { id } }),
      res.status(204).json({ message: "Post successfuly deletd" })
    );
  } else {
    return res.json({ message: "You can delete only your comments" });
  }
});
