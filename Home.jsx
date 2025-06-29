//pages/home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Make sure Home.css is in the same folder or fix the path if not


const Home = () => {
  return (
    <div className="home-container">
      <div className="header">
        <h1 className="heading">BLOGWAVE</h1>
        <div className="waves" />
        <p className="tagline">expression of heart ❤️ 💙</p>
      </div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/blogposts">Blog Posts</Link>
        <Link to="/write">Write</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>

      <div className="home-middle">
        <h2>WELCOME TO BLOGWAVE</h2>
        <p>Write from the heart and share with the world 🩵📖🖊️</p>
      </div>
    </div>
  );
};

export default Home;

