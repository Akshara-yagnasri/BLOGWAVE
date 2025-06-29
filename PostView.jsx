// PostView


import React, { useState } from 'react';
import './PostView.css';

const AI_SUGGESTIONS = [
  "Great post!",
  "Very informative.",
  "Thanks for sharing!",
  "I learned something new.",
  "Clear and concise explanation.",
  
];

const PostView = ({ post, onDelete }) => {
  const [comment, setComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [comments, setComments] = useState(post.comments || []);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/post/${post._id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Failed to delete post');
      }

      onDelete(post._id);
    } catch (err) {
      alert('Error deleting post: ' + err.message);
    }
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim() || !authorName.trim()) {
      return alert('Please enter both your name and a comment');
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/post/${post._id}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: comment, authorName }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to post comment');
      }

      setComments(data);
      setComment('');
      setShowSuggestions(false);
    } catch (err) {
      alert('Error posting comment: ' + err.message);
    }
  };

  const handleSuggestionClick = (text) => {
    setComment(text);
    setShowSuggestions(false);
  };

  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.content}</p>

      <button onClick={handleDelete}>Delete</button>

      <div className="comments-section">
        <h3>Comments</h3>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((c, index) => (
            <div key={index}>
              <strong>{c.authorName}:</strong> {c.text}
            </div>
          ))
        )}

        <div className="comment-form">
          <input
            type="text"
            placeholder="Your name"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />

          <input
            type="text"
            value={comment}
            onFocus={() => setShowSuggestions(true)}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
          />

          <button onClick={handleCommentSubmit}>Post</button>

          {showSuggestions && (
            <div className="suggestions-dropdown">
              {AI_SUGGESTIONS.map((s, idx) => (
                <div key={idx} onClick={() => handleSuggestionClick(s)}>
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostView;