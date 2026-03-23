const express = require('express');
const axios = require('axios');

const router = express.Router();

const DEFAULT_VOICE_ID = '21m00Tcm4TlvDq8ikWAM'; // Rachel (female)

router.post('/generate-voice', async (req, res) => {
  const { text, voiceId = DEFAULT_VOICE_ID } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      },
      {
        headers: {
          'xi-api-key': process.env.ELEVENLABS_API_KEY,
          'Content-Type': 'application/json',
          Accept: 'audio/mpeg',
        },
        responseType: 'arraybuffer',
      }
    );

    res.set('Content-Type', 'audio/mpeg');
    res.send(Buffer.from(response.data));
  } catch (error) {
    const status = error.response?.status || 500;
    let message = 'Failed to generate voice';
    if (error.response?.data) {
      try {
        const errData = JSON.parse(Buffer.from(error.response.data).toString('utf8'));
        message = errData?.detail?.message || errData?.message || message;
      } catch {
        // ignore parse errors
      }
    }
    res.status(status).json({ error: message });
  }
});

module.exports = router;
