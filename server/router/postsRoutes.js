const express = require("express");
const {
  getAllPosts,
  createPost,
  deletePost,
  updatePost,
} = require("../controllers/PostsController");
const router = express.Router();
// const multer = require("../middleware/multer-config");

router.get("/", getAllPosts);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;
