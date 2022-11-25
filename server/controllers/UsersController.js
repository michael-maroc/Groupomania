const { Users } = require("../models");

exports.getAllUsers = async (req, res) => {
  // excluding password from the response
  const user = await Users.findAll({ attributes: { exclude: ["password"] } });
  res.json(user);
};
