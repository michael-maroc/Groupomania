const express = require("express");
const {
  getAllAvatars,
  getOneAvatar,
  createAvatar,
  updateAvatar,
} = require("../controllers/AvatarsController");
const router = express.Router();

router.get("/", getAllAvatars);
router.get("/:id", getOneAvatar);
router.post("/", createAvatar);
router.patch("/", updateAvatar);

module.exports = router;
