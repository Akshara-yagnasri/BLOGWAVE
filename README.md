Blogwave
Blogwave is a full-stack MERN (MongoDB, Express, React, Node.js) blogging platform where users can register, log in, write blog posts, comment, and manage content securely.

Features

User registration and login (JWT-based authentication)
Create and delete blog posts
Add and delete comments
AI-suggested comments on focus
User-specific post control
Dark-themed frontend

Tech Stack
Frontend: React.js, 
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JSON Web Tokens (JWT)

Folder Structure
blogwave/
├── blogwave-backend/
│   ├── server.js
│   ├── routes/
│   ├── models/
│   └── middleware/
├── blogwave-frontend/
│   ├── src/
│   ├── public/
│   └── .env
└── README.md

Setup Instructions
 Setup Backend
   cd blogwave-backend
   npm install

Create a .env file inside blogwave-backend with the following:
MONGODB\_URI=your\_mongodb\_connection\_string
JWT\_SECRET=your\_jwt\_secret

Run backend:
node server.js
OR
npx nodemon server.js
Setup Frontend
   cd ../blogwave-frontend
   npm install

Create a .env file inside blogwave-frontend with the following:
REACT\_APP\_API\_URL=[http://localhost:5000/api](http://localhost:5000/api)

Run frontend:
npm start



Author
Created by Akshara using MERN Stack
Student Developer | Loves Tech + Creativity



