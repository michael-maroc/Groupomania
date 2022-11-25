const { Users } = require("../models");
const jwt = require("jsonwebtoken");

function generateAccessToken(id, username) {
  return jwt.sign({ id, username }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
}

exports.refreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.json({ err });
      console.log(decoded);
      const foundUser = await Users.findOne({ where: { id: decoded.id } });
      if (!foundUser) return res.sendStatus(403);
      console.log("Sending refresh token");
      const accessToken = generateAccessToken(foundUser.id, foundUser.username);
      res.json(accessToken);
    }
  );
};
