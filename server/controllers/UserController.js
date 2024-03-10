// controllers/userController.js

const User = require('../models/User'); // Import the User model

// Controller method to save image for a user
exports.saveImageForUser = async (req, res) => {
  try {
    if(req.params.userId){
        res.send("user_id");
    }
    const user = await User.findById(req.params.userId); // Find the user by ID
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    
    // Add the new image to the array
    user.b_64_image.push(req.body.b_64_image);
    await user.save(); // Save the updated user
    
    res.status(201).send({ message: 'Image saved successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Controller method to get all images for a user
exports.getAllImagesForUser = async (req, res) => {
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
