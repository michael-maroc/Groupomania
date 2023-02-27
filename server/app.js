// Imports
require("dotenv").config();
const authMiddleware = require("./middleware/authMiddleware");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const db = require("./models");
const express = require("express");
const helmet = require("helmet");
const app = express();

// Routes
const authRoutes = require("./router/authRoutes");
const avatarsRoutes = require("./router/avatarsRoutes");
const commentsRoutes = require("./router/commentsRoutes");
const { errorHandler } = require("./middleware/errorHandler");
const likesRoutes = require("./router/likesRoutes");
const postsRoutes = require("./router/postsRoutes");
const refreshRoute = require("./router/refreshRoute");
const usersRoutes = require("./router/usersRoutes");
const apiLimiter = require("./middleware/apiLimiter");

// Middlewares
app.use(helmet());
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(apiLimiter);
app.use("/api/auth", authRoutes);
app.use("/api/refresh", refreshRoute);
app.use(authMiddleware);
app.use("/api/avatars", avatarsRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/likes", likesRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);
app.use(errorHandler);

// Server Connection
db.sequelize.sync().then(() => {
  console.log("Connection to MySQL successful");
});

module.exports = app;
