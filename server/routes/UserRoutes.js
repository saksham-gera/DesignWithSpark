import express from 'express';
const router = express.Router();
import {loginUser,signupUser,saveImageForUser,getAllImagesForUser} from '../controllers/UserController.js';


// Route to handle user login
router.post('/login', (req, res) => {
    loginUser(req, res);
});

// Route to handle user signup
router.post('/signup', (req, res) => {
    signupUser(req, res);
});

// Route to save an image for a user
router.post('/:userId/images', saveImageForUser);

// Route to get all images for a user
router.get('/:userId/images', getAllImagesForUser);

export default router;
