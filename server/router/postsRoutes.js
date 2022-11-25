const express = require("express");
const { getAllPosts, createPost } = require("../controllers/PostsController");
const router = express.Router();

router.get("/", getAllPosts);
router.post("/", createPost);

module.exports = router;
