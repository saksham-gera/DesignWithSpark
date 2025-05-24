import express from 'express';
import dotenv from 'dotenv';
import { InferenceClient } from '@huggingface/inference';

dotenv.config();

// Get Hugging Face token from .env
const hfToken = process.env.HUGGINGFACE_API_KEY;

// Initialize Hugging Face Inference Client
const client = new InferenceClient(hfToken);

// Create router
const router = express.Router();

// Middleware to parse JSON
router.use(express.json());

// POST route for image generation
router.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  try {
    const imageBlob = await client.textToImage({
      model: 'black-forest-labs/FLUX.1-dev',
      inputs: prompt,
      parameters: { num_inference_steps: 5 },
    });

    const arrayBuffer = await imageBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString('base64');

    res.status(200).json({ photo: base64Image });
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ message: 'Failed to generate image' });
  }
});

export default router;