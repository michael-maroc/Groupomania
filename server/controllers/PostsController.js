const { Posts } = require("../models");
const { tryCatch } = require("../utils/tryCatch");

// Get All Posts
exports.getAllPosts = tryCatch(async (req, res) => {
  const posts = await Posts.findAll({ order: [["createdAt", "desc"]] });
  posts.length ? res.json(posts) : res.sendStatus(204);
});

// Create A Post
exports.createPost = tryCatch(async (req, res) => {
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
exports.updatePost = tryCatch(async (req, res) => {
  const { id } = req.params;
  const { userId, description, imageName, imageUrl, isAdmin } = req.body;
  const foundPost = await Posts.findOne({ where: { id } });

  if (foundPost?.UserId === userId || isAdmin) {
    await Posts.update({ description, imageName, imageUrl }, { where: { id } });
    res.status(200).json({ message: "Post successfuly updated" });
  } else {
    return res.json({ message: "You can update only your own posts" });
  }
});

// Delete A Post
exports.deletePost = tryCatch(async (req, res) => {
  const { id } = req.params;
  const { userId, isAdmin } = req.body;
  const foundPost = await Posts.findOne({ where: { id } });

  if (foundPost?.UserId === userId || isAdmin) {
    return (
      await Posts.destroy({ where: { id } }),
      res.status(200).json({ message: "Post successfuly deleted" })
    );
  } else {
    return res
      .status(401)
      .json({ message: "You can delete only your own posts" });
  }
});
