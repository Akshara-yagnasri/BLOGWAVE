//pages/BlogPost.js
import React, { useEffect, useState } from "react";

const BlogPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [commentText, setCommentText] = useState({});
  const [commentUsername, setCommentUsername] = useState({});
  const [suggestions, setSuggestions] = useState({});
  const [showSuggestions, setShowSuggestions] = useState({});

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const aiSuggestions = [
    "Great post!",
    "Thanks for sharing!",
    "Very informative.",
    "I learned something new.",
    "Interesting perspective!",
     "Such an insightful post! Really enjoyed reading this." , 
 "Your perspective on this topic is refreshing—great work!",  
 "This was a fantastic read. Looking forward to more!"  ,
 "You’ve articulated this so well. Thought-provoking!"  ,
 "Absolutely loved this! Keep sharing your wisdom." , 
 "This resonated with me deeply. Thank you for writing!" , 
 "Brilliant breakdown! Made me see the topic in a new light." , 
 "Your analysis here is spot on—really appreciate the clarity.",  
 "Engaging and informative—exactly what I needed today!"  ,
 "Loved how you presented this. Keep up the great content!" , 

  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/post`);
        if (!res.ok) throw new Error("Failed to load posts");
        const data = await res.json();
        setPosts(data);
      } catch {
        setError("⚠️ Failed to load blog posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDeletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/post/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Delete failed");
      setPosts((prev) => prev.filter((p) => p._id !== postId));
    } catch {
      alert("❌ Could not delete post");
    }
  };
  


  const handleDeleteComment = async (postId, commentId) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/post/${postId}/comment/${commentId}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Failed to delete comment");
      const updatedPost = await res.json();
      setPosts((prev) =>
        prev.map((post) => (post._id === postId ? updatedPost : post))
      );
    } catch {
      alert("❌ Failed to delete comment");
    }
  };

  const handleComment = async (postId) => {
    const text = commentText[postId];
    const username = commentUsername[postId];
    if (!text || !username) {
      alert("Please enter your name and comment.");
      return;
    }
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/post/${postId}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          authorName: username,
          authorId: userId,
        }),
      });
      if (!res.ok) throw new Error("Comment failed");
      const updatedPost = await res.json();
      setPosts((prev) =>
        prev.map((post) => (post._id === postId ? updatedPost : post))
      );
      setCommentText((prev) => ({ ...prev, [postId]: "" }));
      setSuggestions((prev) => ({ ...prev, [postId]: [] }));
    } catch {
      alert("❌ Failed to post comment");
    }
  };

  const handleSuggestionClick = (postId, suggestion) => {
    setCommentText((prev) => ({ ...prev, [postId]: suggestion }));
    setShowSuggestions((prev) => ({ ...prev, [postId]: false }));
  };

  const handleFocus = (postId) => {
    setSuggestions((prev) => ({ ...prev, [postId]: aiSuggestions }));
    setShowSuggestions((prev) => ({ ...prev, [postId]: true }));
  };

  if (loading) return <p>Loading blog posts...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "1rem" }}>
      <h2>All Blog Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet. Be the first to write one!</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "1rem",
              marginBottom: "1.5rem",
              background: "#f9f9f9",
              position: "relative",
            }}
          >
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <small>
              By <strong>{post.author?.username || "Unknown"}</strong> on{" "}
              {new Date(post.createdAt).toLocaleString()}
            </small>

            {/* DELETE POST BUTTON */}
            {post.author?._id?.toString() === userId && (
              <button
                onClick={() => handleDeletePost(post._id)}
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  background: "#ff4d4f",
                  color: "white",
                  border: "none",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            )}

            {/* COMMENTS */}
            {post.comments?.length > 0 && (
              <div style={{ marginTop: "1rem" }}>
                <h4>Comments:</h4>
                <ul>
                  {post.comments.map((c) => (
                    <li key={c._id}>
                      <strong>{c.authorName}:</strong> {c.text}
                      {c.authorId === userId && (
                        <button
                          onClick={() => handleDeleteComment(post._id, c._id)}
                          style={{
                            marginLeft: "1rem",
                            background: "#f44336",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            padding: "0.2rem 0.5rem",
                            cursor: "pointer",
                          }}
                        >
                          Delete
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ADD COMMENT */}
            <div style={{ marginTop: "1rem" }}>
              <input
                type="text"
                placeholder="Your name"
                value={commentUsername[post._id] || ""}
                onChange={(e) =>
                  setCommentUsername((prev) => ({
                    ...prev,
                    [post._id]: e.target.value,
                  }))
                }
                style={{
                  width: "100%",
                  padding: "0.4rem",
                  marginBottom: "0.5rem",
                }}
              />
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentText[post._id] || ""}
                onChange={(e) =>
                  setCommentText((prev) => ({
                    ...prev,
                    [post._id]: e.target.value,
                  }))
                }
                onFocus={() => handleFocus(post._id)}
                style={{ width: "100%", padding: "0.5rem" }}
              />
              <button
                onClick={() => handleComment(post._id)}
                style={{
                  marginTop: "0.5rem",
                  padding: "0.4rem 1rem",
                  borderRadius: "5px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Comment
              </button>

              {showSuggestions[post._id] && suggestions[post._id] && (
                <div
                  style={{
                    marginTop: "0.5rem",
                    display: "flex",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                  }}
                >
                  {suggestions[post._id].map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() =>
                        handleSuggestionClick(post._id, suggestion)
                      }
                      style={{
                        background: "#eee",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        padding: "0.3rem 0.6rem",
                        cursor: "pointer",
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogPost;
