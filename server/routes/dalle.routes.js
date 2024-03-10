import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi} from 'openai';

dotenv.config();

const router = express.Router();

const config = new Configuration({
  apiKey: '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',
});

const openai = new OpenAIApi(config);

router.route('/').get((req, res) => {
  res.status(200).json({ message: "Hello from SPAM " })
})
.post(async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log(prompt);
    const response = await openai.createImage({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json'
    });
    console.log(response)
    const image = response.data.data[0].b64_json;
    console.log(image);

    // res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error })
  }
})

export default router;