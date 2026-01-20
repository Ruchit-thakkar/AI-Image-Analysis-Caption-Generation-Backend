const express = require("express");
const app = express();
const connectTodb = require("./db/db");
const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
connectTodb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);

module.exports = app;
