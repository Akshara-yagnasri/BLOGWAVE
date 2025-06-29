//src/components/Navbar.js
import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-links">
        <a href="#">Home</a>
        <a href="#">Blog Posts</a>
        <a href="#">Write</a>
        <a href="#">Login</a>
        <a href="#">Register</a>
      </div>

      <div className="brand-section">
        <h1 className="brand-title">BLOGWAVE</h1>
        <p className="tagline">Expression of  ❤️ heart 💙</p>

        {/* Wave SVG */}
        <div className="wave-container">
          <svg viewBox="0 0 500 150" preserveAspectRatio="none">
            <path d="M-7.05,84.13 C149.99,150.00 271.35,20.00 507.95,85.22 L500.00,150.00 L0.00,150.00 Z"
              style={{ stroke: 'none', fill: '#00aaff' }}></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
