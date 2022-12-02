const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Users } = require("../models");

function generateAccessToken(id, username) {
  return jwt.sign({ id, username }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
}

function generateRefreshToken(id, username) {
  return jwt.sign({ id, username }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
}

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res
        .status(400)
        .json({ message: "Username, email and password are required" });
    const duplicate = await Users.findOne({ where: { email } });
    if (duplicate) {
      return res.status(409).json({ message: "This email already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await Users.create({
        username,
        email,
        password: hashedPassword,
      });
      res.status(201).json({ message: "Registration success" });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "email and password are required" });
  const foundUser = await Users.findOne({ where: { email } });
  if (!foundUser || !(await bcrypt.compare(password, foundUser.password))) {
    return res.status(401).json({ message: "Bad credentials" });
  }
  const accessToken = generateAccessToken(foundUser.id, foundUser.username);
  const refreshToken = generateRefreshToken(foundUser.id, foundUser.username);

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
  res.json({ accessToken });
};

exports.logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.json({ message: "Cookies cleared" });
};
