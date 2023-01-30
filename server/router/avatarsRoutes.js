const express = require("express");
const {
  getAllAvatars,
  getOneAvatar,
  createAvatar,
} = require("../controllers/AvatarsController");
const router = express.Router();

// router.get("/", getAllAvatars);
router.post("/", createAvatar);
router.get("/:id", getOneAvatar);

module.exports = router;
