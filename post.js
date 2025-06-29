
//routes/post.js
const express = require("express");
const Post = require("../models/Post");
//const verifyToken = require("../middleware/verifyToken");
const verifyToken = require("../routes/middleware/verifyToken");


const router = express.Router();

// ───────────────────────────────────────────────────────
// ✅ CREATE POST (protected)
// ───────────────────────────────────────────────────────
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const newPost = new Post({
      title,
      content,
      author: req.userId,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error("🔥 Post creation error:", err);
    res.status(500).json({ message: "Error creating post" });
  }
});

// ───────────────────────────────────────────────────────
// ✅ GET ALL POSTS (public)
// ───────────────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username") // shows only username
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (err) {
    console.error("🔥 Fetch posts error:", err);
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// ───────────────────────────────────────────────────────
// ✅ DELETE POST (only by the author)
// ───────────────────────────────────────────────────────
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error("🔥 Delete post error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ───────────────────────────────────────────────────────
// ✅ ADD COMMENT TO POST
// ───────────────────────────────────────────────────────
router.post("/:id/comment", async (req, res) => {
  const { text, authorName, authorId } = req.body;

  if (!text || !authorName || !authorId) {
    return res.status(400).json({ message: "Incomplete comment data" });
  }

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const newComment = { text, authorName, authorId };
    post.comments.push(newComment);
    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (err) {
    console.error("🔥 Add comment error:", err);
    res.status(500).json({ message: "Error commenting on post" });
  }
});

// ───────────────────────────────────────────────────────
// ✅ DELETE COMMENT FROM POST
// ───────────────────────────────────────────────────────
router.delete("/:postId/comment/:commentId", async (req, res) => {
  const { postId, commentId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments = post.comments.filter(
      (c) => c._id.toString() !== commentId
    );

    await post.save();
    res.status(200).json(post);
  } catch (err) {
    console.error("🔥 Delete comment error:", err);
    res.status(500).json({ message: "Failed to delete comment" });
  }
});

module.exports = router;
