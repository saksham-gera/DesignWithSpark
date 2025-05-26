import {User,Images} from '../models/User.js';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_CODE, { expiresIn: '3d' });
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const currentUser = await User.login(email, password)
        const token = createToken(currentUser._id);
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const signupUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const createdUser = await User.signup(email, password);
        await User.findByIdAndUpdate(createdUser._id, {name})

        const token = createToken(createdUser._id);
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Controller method to save image for a user
export const saveImageForUser = async (req, res) => {
    try {

        const user = await User.findById(req.params.userId); // Find the user by ID
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        const {photo}=req.body;
        // console.log(photo);
        const newImage= new Images(
            {
                Data : photo
            });
            
            const savedImage = await newImage.save();
        await User.findByIdAndUpdate(req.params.userId, {
             $push: { images: savedImage._id } 
            }); 
            res.status(201).send({ savedImage });
        
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};


// Controller method to get all images for a user
export const getAllImagesForUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId); // Find the user by ID
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
  
        res.send({
             images: user.images
            });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};


export const getImageData = async (req, res) => {

    try {
        // Fetch image data from the database
        const image = await Images.findById(req.params.imageId);
        const imageData = image.Data;
        if (!imageData) {
            return res.status(404).json({ error: error.message});
        }

        res.status(200).send({ image });
    } catch (error) {
        console.error('Error fetching image data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteAllImages = async (req, res) => {
    try {
        // Step 1: Delete all documents from the Images collection
        await Images.deleteMany({});

        // Step 2 (Optional): Clear the images array in all User documents
        // This step is necessary if you want to maintain referential integrity
        await User.updateMany({}, { $set: { images: [] } });

        res.send({ message: 'All images have been deleted successfully' });
    } catch (error) {
        console.error('Error deleting images:', error);
        res.status(500).send({ message: 'Error deleting images' });
    }
};

export default deleteAllImages;
