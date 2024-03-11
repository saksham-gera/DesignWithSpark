// Import necessary modules
import express from 'express';
import { OpenAI } from 'openai';
import dotenv from 'dotenv'; // Use ES module import for dotenv

dotenv.config(); // Initialize dotenv

// Access the API key from environment variables
const apiKey = process.env.Open_AI_Api_KEY;

// Initialize the OpenAI object with the API key from environment variables
const openai = new OpenAI( {apiKey} );

// Create a router
const router = express.Router();

// Middleware to parse JSON bodies
router.use(express.json());

// POST route for image generation
router.post('/generate', async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.images.generate({
      // model: 'dall-e-2', 
      prompt: prompt,    
      size: '1024x1024',   
      response_format: 'b64_json'
    });

    const image = response.data[0].b64_json;
    res.status(200).json({ photo: image });

    // res.status(200).json({ photo: image});

  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ message: 'Failed to generate image' });
  }
});

// Export the router
export default router;
