//src/componenets/Post.jsx
import React from 'react';
import './PostView.css';

const PostView = ({ post, onDelete }) => {
  const userId = localStorage.getItem('userId');

  const handleDelete = () => {
    onDelete(post._id);
  };

  return (
    <div className="post-card">
      <div className="post-content">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-text">{post.content}</p>
        <p className="post-date">
          Posted on {new Date(post.createdAt).toLocaleString()}
        </p>
      </div>
      {userId === post.author && (
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      )}
    </div>
  );
};

export default PostView;
