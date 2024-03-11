import express from 'express';
const router = express.Router({mergeParams: true});
import deleteAllImages, {loginUser,signupUser,saveImageForUser,getAllImagesForUser, getImageData} from '../controllers/UserController.js';


// Route to handle user login
router.post('/login', (req, res) => {
    loginUser(req, res);
});

// Route to handle user signup
router.post('/signup', (req, res) => {
    signupUser(req, res);
});

// Route to save an image for a user
router.put('/:userId/images', saveImageForUser);

// Route to get all images for a user
router.get('/:userId/images', getAllImagesForUser);
router.get('/:imageId', getImageData);
router.delete('/deleteImage',deleteAllImages);

export default router;
