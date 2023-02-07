const { Users } = require("../models");
const { tryCatch } = require("../utils/tryCatch");

exports.getAllUsers = tryCatch(async (req, res) => {
  const { isAdmin } = req.body;
  if (isAdmin) {
    // excluding password from the response
    const user = await Users.findAll({ attributes: { exclude: ["password"] } });
    res.json(user);
  } else {
    res.json("Only admins can reach that request");
  }
});

exports.getOneUser = tryCatch(async (req, res) => {
  const { id } = req.params;
  const foundUser = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  if (!foundUser)
    res.status(404).json({ message: "Not user foud with that ID" });
  res.status(200).json(foundUser);
});
