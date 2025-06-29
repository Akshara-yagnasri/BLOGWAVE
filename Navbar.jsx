// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">
      <div className="text-right">
        <h1 className="text-4xl font-bold text-blue-500">BLOGWAVE</h1>
        <div className="wave"></div>
        <p className="italic mt-2 text-white">expression of ❤️heart 💙 </p>
      </div>
      <ul className="flex space-x-6 font-semibold text-white text-lg">
        <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
        <li><Link to="/posts" className="hover:text-blue-400">Blog Posts</Link></li>
        <li><Link to="/write" className="hover:text-blue-400">Write</Link></li>
        <li><Link to="/login" className="hover:text-blue-400">Login</Link></li>
        <li><Link to="/register" className="hover:text-blue-400">Register</Link></li>
      </ul>
    </nav>
  );
}
