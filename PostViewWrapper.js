//Postwrapper.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostView from '../components/PostView';

const PostViewWrapper = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user info from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);

    // Fetch post by ID
    axios.get(`${process.env.REACT_APP_API_URL}/posts`)
      .then(res => {
        const found = res.data.find(p => p._id === id);
        if (!found) {
          alert('Post not found');
          navigate('/');
        } else {
          setPost(found);
        }
      })
      .catch(() => {
        alert('Failed to load post');
        navigate('/');
      });
  }, [id, navigate]);

  if (!post) return <div>Loading post...</div>;

  return <PostView post={post} user={user} />;
};

export default PostViewWrapper;
