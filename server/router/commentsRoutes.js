const express = require("express");
const {
  getAllComment,
  getPostComments,
  deleteComment,
  addComment,
  updateComment,
} = require("../controllers/CommentController");
const router = express.Router();

router.get("/", getAllComment);
router.get("/:id", getPostComments);
router.post("/", addComment);
router.patch("/:id", updateComment);
router.delete("/:id", deleteComment);

module.exports = router;
