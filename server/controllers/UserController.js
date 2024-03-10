import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
    return jwt.sign({ id }, "jldsjlgjslgjl", { expiresIn: '3d' });
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const currentUser = await User.login(email, password)
        const token = createToken(currentUser._id);
        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const signupUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const createdUser = await User.signup(email, password);
        const token = createToken(createdUser._id);
        res.status(200).json({ email, token });
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

        // Assume req.body.b_64_images contains an array of base64 encoded image strings
        const newImages = req.body.photo;
        console.log(newImages);

        
            // Concatenate the new images with the existing ones
            // user.b_64_image.push(newImages);
            await User.findByIdAndUpdate(req.params.userId, { $push: {b_64_image: newImages} }) // Save the updated user

            res.status(201).send({ message: 'Images saved successfully' });
        
    } catch (error) {
        console.log(error);
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
        
        res.send({ images: user.b_64_image });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
