const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define User Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  b_64_image: {
    type: [String], 
    required: true
  }
});

// Create User model
const User = mongoose.model('User', UserSchema);

module.exports = User;
