const express = require("express");
const {
  getAllAvatars,
  getOneAvatar,
  createAvatar,
} = require("../controllers/AvatarsController");
const router = express.Router();

router.get("/", getAllAvatars);
router.get("/:id", getOneAvatar);
router.post("/", createAvatar);

module.exports = router;
