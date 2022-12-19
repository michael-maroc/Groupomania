const { Likes } = require("../models");
const asyncHandler = require("express-async-handler");

// Get All Likes
exports.getAllLikes = asyncHandler(async (req, res) => {
  const likes = await Likes.findAll();
  if (!likes.length) return res.json("No Likes found");
  res.status(200).json(likes);
});

// Like A Post
exports.addLike = asyncHandler(async (req, res) => {
  const { username, userId, PostId } = req.body;
  const foundLike = await Likes.findOne({ where: { PostId } });

  if (foundLike?.UserId === userId) {
    foundLike.destroy();
    res.status(200).json({ message: "Like deleted" });
  } else {
    await Likes.create({
      username,
      PostId,
      UserId: userId,
    });
    res.status(201).json({ message: "Like added" });
  }
});

// Get All Likes From A Single Post
exports.getLikesFromPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const likes = await Likes.findAll({ where: { id } });

  res.status(200).json(likes);
});
