import express from 'express';
const router = express.Router({mergeParams: true});
import deleteAllImages,{loginUser,signupUser,saveImageForUser,getAllImagesForUser, getImageData} from '../controllers/UserController.js';
import { verifyToken } from '../Middleware.js';
import { User } from '../models/User.js';

router.post('/login', (req, res) => {
    loginUser(req, res);
});

router.get('/login', verifyToken , async (req, res) => {
    const currUser = await User.findById(req.user.id);

    res.json({name: currUser.name, email: currUser.email});
});

router.post('/signup', (req, res) => {
    signupUser(req, res);
});

router.put('/:userId/images', saveImageForUser);

router.get('/:userId/images', getAllImagesForUser);
router.get('/:imageId', getImageData);
router.delete('/deleteImage',deleteAllImages);

export default router;
