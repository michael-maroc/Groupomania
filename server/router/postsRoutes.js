const express = require("express");
const { getAllPosts, createPost } = require("../controllers/PostsController");
const router = express.Router();
// const multer = require("../middleware/multer-config");

router.get("/", getAllPosts);
router.post("/", createPost);

module.exports = router;
