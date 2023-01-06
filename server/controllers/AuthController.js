const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const asyncHandler = require("express-async-handler");

function generateAccessToken(id, username, isAdmin) {
  return jwt.sign({ id, username, isAdmin }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
}

function generateRefreshToken(id, username, isAdmin) {
  return jwt.sign({ id, username, isAdmin }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
}

exports.register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.sendStatus(400);
  const duplicate = await Users.findOne({ where: { email } });
  if (duplicate) {
    return res.sendStatus(409);
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    await Users.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "Registration success" });
  }
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.sendStatus(400);

  const foundUser = await Users.findOne({ where: { email } });
  // console.log(foundUser.role);
  if (!foundUser || !(await bcrypt.compare(password, foundUser.password)))
    return res.sendStatus(401);

  const accessToken = generateAccessToken(
    foundUser.id,
    foundUser.username,
    foundUser.isAdmin
  );
  const refreshToken = generateRefreshToken(
    foundUser.id,
    foundUser.username,
    foundUser.isAdmin
  );

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
  res.json({ accessToken });
});

exports.logout = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.json({ message: "Cookies cleared" });
});
