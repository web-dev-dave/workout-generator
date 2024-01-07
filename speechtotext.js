// const OpenAI = require("openai");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const config = require("./config");
const axios = require('axios'); // Import axios
const FormData = require('form-data'); // Import form-data
const app = express();

app.use(express.json());
app.use(cors());

const OPENAI_API_KEY = config.openaiApiKey;

// Set up Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/convert-speech-to-text", upload.single('file'), async (req, res) => {
  try {
    const audioBlob = req.file;

    // Create a new FormData instance
    const formData = new FormData();

    // Append the file to the form data
    formData.append('file', audioBlob.buffer, {
      filename: audioBlob.originalname,
      contentType: audioBlob.mimetype,
    });

    // Append the model parameter to the form data
    formData.append('model', 'whisper-1');

    // Send a POST request with the form data
    const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
      headers: {
        'Content-Type': `multipart/form-data`,
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
    });

    console.log(response.data); // Log the entire API response

    const transcription = response.data;

    res.json({ transcription });
  } catch (error) {
    console.error("Error converting speech to text:", error);
    console.error(error.response);
    res.status(500).json({ error: error.toString() });
  }
});

app.listen(3001, () => console.log("Server started on port 3001"));