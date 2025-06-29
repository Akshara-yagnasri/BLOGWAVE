//pages/ Write.js;


import React, { useState } from 'react';
import './Write.css'; // Optional: your styling file

const Write = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePublish = async (e) => {
    e.preventDefault();
    setStatus('');
    setLoading(true);

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      setStatus('❌ You must be logged in to publish');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          content,
          author: userId
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Post creation failed');

      setStatus('✅ Post published successfully!');
      setTitle('');
      setContent('');
    } catch (err) {
      setStatus(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="write-container">
      <form className="write-form" onSubmit={handlePublish}>
        <h2 className="write-heading">Create a New Blog Post</h2>

        {status && <p className="write-status">{status}</p>}

        <input
          type="text"
          placeholder="Title"
          value={title}
          className="write-input"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          className="write-textarea"
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          required
        ></textarea>
        <button type="submit" className="write-button" disabled={loading}>
          {loading ? 'Publishing...' : 'Publish'}
        </button>
      </form>
    </div>
  );
};

export default Write;

﻿
