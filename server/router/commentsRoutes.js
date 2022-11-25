const express = require("express");
const {
  getAllComment,
  createComment,
  getPostComments,
  deleteComment,
} = require("../controllers/CommentController");
const router = express.Router();

router.get("/", getAllComment);
router.get("/:PostId", getPostComments);
router.post("/", createComment);
router.delete("/", deleteComment);

module.exports = router;
