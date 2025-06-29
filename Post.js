//models/Post.js

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: String,
  authorName: String,
  authorId: String, // ✅ Needed to identify the comment's owner
}, { timestamps: true });

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [commentSchema],
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
