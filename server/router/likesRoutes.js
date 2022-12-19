const express = require("express");
const {
  getAllLikes,
  addLike,
  getLikesFromPost,
} = require("../controllers/LikesController");
const router = express.Router();

router.get("/", getAllLikes);
router.get("/:id", getLikesFromPost);
router.post("/", addLike);

module.exports = router;
