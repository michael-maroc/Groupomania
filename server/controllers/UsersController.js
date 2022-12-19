const { Users } = require("../models");

exports.getAllUsers = async (req, res) => {
  const { isAdmin } = req.body;
  if (isAdmin) {
    // excluding password from the response
    const user = await Users.findAll({ attributes: { exclude: ["password"] } });
    res.json(user);
  } else {
    res.json("Only admins can reach that request");
  }
};
