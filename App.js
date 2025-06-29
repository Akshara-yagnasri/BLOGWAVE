
//App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Write from './pages/Write';
import BlogPosts from './pages/BlogPosts';
import PostViewWrapper from './pages/PostViewWrapper'; // 👈 add this

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/write" element={<Write />} />
        <Route path="/blogposts" element={<BlogPosts />} />
        <Route path="/posts/:id" element={<PostViewWrapper />} /> {/* 👈 new route */}
      </Routes>
    </Router>
  );
}

export default App;
 
