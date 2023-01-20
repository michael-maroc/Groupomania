const jwt = require("jsonwebtoken");
const { tryCatch } = require("../utils/tryCatch");

const authMiddleware = tryCatch((req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.body.userId = decoded.id;
    req.body.username = decoded.username;
    req.body.isAdmin = decoded.isAdmin;
    // console.log(decoded);
    next();
  });
});

module.exports = authMiddleware;
