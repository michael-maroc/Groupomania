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

// Middlewares
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
const authRoutes = require("./router/authRoutes");
const usersRoutes = require("./router/usersRoutes");
const postsRoutes = require("./router/postsRoutes");
const commentsRoutes = require("./router/commentsRoutes");
const refreshRoute = require("./router/refreshRoute");

app.use("/api/auth", authRoutes);
app.use("/api/refresh", refreshRoute);
app.use(authMiddleware);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comments", commentsRoutes);

// Server Connection
db.sequelize.sync({ alter: true }).then(() => {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
});