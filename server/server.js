// Imports
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./models");
const app = express();
const authMiddleware = require("./middleware/authMiddleware");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const path = require("path");

// Routes
const authRoutes = require("./router/authRoutes");
const usersRoutes = require("./router/usersRoutes");
const postsRoutes = require("./router/postsRoutes");
const commentsRoutes = require("./router/commentsRoutes");
const refreshRoute = require("./router/refreshRoute");
const likesRoutes = require("./router/likesRoutes");
const { errorHandler } = require("./middleware/errorHandler");

// Middlewares
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use("images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", authRoutes);
app.use("/api/refresh", refreshRoute);
app.use(authMiddleware);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/likes", likesRoutes);
app.use(errorHandler);

// Server Connection
db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
});
