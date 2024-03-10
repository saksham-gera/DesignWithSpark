// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Route to save an image for a user
router.post('/users/:userId/images', UserController.saveImageForUser);

// Route to get all images for a user
router.get('/users/:userId/images', UserController.getAllImagesForUser);

module.exports = router;
