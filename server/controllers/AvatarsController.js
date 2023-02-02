const { tryCatch } = require("../utils/tryCatch");
const { Avatars } = require("../models");

exports.getAllAvatars = tryCatch(async (req, res) => {
  const avatars = await Avatars.findAll();
  res.status(200).json(avatars);
});

exports.getOneAvatar = tryCatch(async (req, res) => {
  const { id } = req.params;
  const avatar = await Avatars.findOne({ where: { UserId: id } });
  if (!avatar)
    return res.status(404).json({ message: "No avatar found with that ID" });
  res.status(200).json(avatar);
});

exports.createAvatar = tryCatch(async (req, res) => {
  const { userId, avatarName, avatarUrl } = req.body;
  const avatar = await Avatars.create({
    avatarName,
    avatarUrl,
    UserId: userId,
  });
  res.status(201).json(avatar);
});

exports.updateAvatar = tryCatch(async (req, res) => {
  const { userId, avatarName, avatarUrl } = req.body;
  const avatar = await Avatars.update(
    {
      avatarName,
      avatarUrl,
      UserId: userId,
    },
    { where: { UserId: userId } }
  );
  res.status(201).json(avatar);
});
