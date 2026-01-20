const mongoose = require("mongoose");
const { generateContent } = require("../services/ai.service");
const { uploadImage } = require("../services/storage.service");
const { v4: uuid4 } = require("uuid");
const postModel = require("../models/post.model");
async function createPost(req, res) {
  const file = req.file;
  const base64ImageFile = new Buffer.from(file.buffer).toString("base64");
  const caption = await generateContent(base64ImageFile);

  const result = await uploadImage(file.buffer, `${uuid4()}.jpg`);
  const post = await postModel.create({
    image: result.url,
    caption: caption,
    user: req.user._id,
  });
  res.status(201).json({
    message: "post created successfully",
    post: post,
  });
}
module.exports = { createPost };
