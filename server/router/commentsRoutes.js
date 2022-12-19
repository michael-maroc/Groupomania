const express = require("express");
const {
  getAllComment,
  createComment,
  getPostComments,
  deleteComment,
} = require("../controllers/CommentController");
const router = express.Router();

router.get("/", getAllComment);
router.get("/:id", getPostComments);
router.post("/", createComment);
router.delete("/:id", deleteComment);

module.exports = router;
