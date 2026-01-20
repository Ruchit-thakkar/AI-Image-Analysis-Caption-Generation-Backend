const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const multer = require("multer");
const { createPost } = require("../controllers/post.controller");
const uplode = multer({ storage: multer.memoryStorage() });
router.post("/", authMiddleware, uplode.single("image"), createPost);

module.exports = router;
