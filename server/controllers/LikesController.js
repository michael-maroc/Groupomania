const { Likes } = require("../models");
const { tryCatch } = require("../utils/tryCatch");

// Get All Likes
exports.getAllLikes = tryCatch(async (req, res) => {
  const likes = await Likes.findAll();
  likes.length ? res.status(200).json(likes) : res.sendStatus(204);
});

// Like A Post
exports.addLike = tryCatch(async (req, res) => {
  const { username, userId, PostId } = req.body;
  const foundLike = await Likes.findOne({ where: { PostId, UserId: userId } });

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
exports.getLikesFromPost = tryCatch(async (req, res) => {
  const { id } = req.params;
  const likes = await Likes.findAll({ where: { PostId: id } });
  likes.length ? res.status(200).json(likes) : res.sendStatus(204);
});
