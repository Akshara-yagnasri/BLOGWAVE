//sever.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // frontend runs on 3000
  credentials: true,
}));
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/blogwave', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes); // GET and POST routes for blogs

// Default root
app.get('/', (req, res) => {
  res.send("🚀 BlogWave Backend is Running!");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🌐 Server running at http://localhost:${PORT}`);
});


