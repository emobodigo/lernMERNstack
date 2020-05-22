const express = require("express");
const router = express.Router();

const Post = require("../../Model/Post");

router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts));
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (e) {
    res.json({ message: e });
  }
});

router.post("/", (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  newPost.save().then((post) => res.json(post));
});

router.delete("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => post.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

router.patch("/:id", async (req, res) => {
  try {
    const upgradePost = await Post.updateOne(req.params.id, {
      set: { title: req.body.title, content: req.body.content },
    });
    res.json(upgradePost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
