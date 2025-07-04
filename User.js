

// backend/models/User.js


const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // To avoid duplicates
  },
  email: {
    type: String,
    required: true,
    unique: true, // To avoid duplicates
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);


