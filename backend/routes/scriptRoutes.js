const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/generate-script', async (req, res) => {
  const { topic = 'personal finance' } = req.body;

  const prompt = `Generate a 60-second YouTube Shorts script about ${topic}.
Requirements:
- Strong hook in first sentence
- Simple language
- Short sentences
- Engaging and slightly provocative tone
- Clear ending takeaway`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
        temperature: 0.8,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const script = response.data.choices[0].message.content.trim();
    res.json({ script });
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.error?.message || 'Failed to generate script';
    res.status(status).json({ error: message });
  }
});

module.exports = router;
