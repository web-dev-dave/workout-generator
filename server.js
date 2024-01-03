// server.js (or a dedicated server file)
const OpenAI = require('openai');
const express = require('express');
const cors = require('cors'); // Import the cors middleware
const config = require('./config');
const app = express();

app.use(express.json());

// Enable CORS for all routes
app.use(cors());

const OPENAI_API_KEY = config.openaiApiKey;

const openai = new OpenAI({ apiKey: OPENAI_API_KEY});

app.post('/generate-workout', async (req, res) => {
  const { movements, timeDomain, rounds } = req.body;

  // Construct prompt for GPT
  const prompt = `Generate a CrossFit workout with ${movements} for ${rounds} rounds.`;

  try {
    // Make a request to OpenAI GPT
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "system", "content": "You are a CrossFit enthusiast."},
        {"role": "user", "content": prompt}
      ],
    });
    console.log(chatCompletion);

    // Extract and send the generated workout from the GPT response
    const generatedWorkout = chatCompletion.choices[0].message.content;
    res.json({ workout: generatedWorkout });
  } catch (error) {
    console.error('Error generating workout:', error);
    res.status(500).json({ error: 'Error generating workout. Please try again.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
