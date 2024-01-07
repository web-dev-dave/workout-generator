// server.js (or a dedicated server file)
const OpenAI = require("openai");
const express = require("express");
const cors = require("cors"); // Import the cors middleware
const config = require("./config");
const app = express();

app.use(express.json());

// Enable CORS for all routes
app.use(cors());

const OPENAI_API_KEY = config.openaiApiKey;

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

app.post("/generate-workout", async (req, res) => {
  const { movements } = req.body;

  try {
    // AMRAP (As Many Rounds As Possible) Style
    const amrapCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [
        { role: "system", content: "You are a CrossFit enthusiast." },
        {
          role: "user",
          content: `Create an AMRAP-style CrossFit workout with movements: ${movements.join(
            ", ",
          )}. I want it in json format with description:, movements:, duration:, instructions:, repScheme:.`,
        },
      ],
      response_format: { type: "json_object" },
    });

    // Extract and send the generated AMRAP workout
    const amrapWorkout = amrapCompletion.choices[0].message.content;
    console.log("AMRAP Workout:", amrapWorkout);

    // EMOM (Every Minute On the Minute) Style
    const emomCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [
        { role: "system", content: "You are a CrossFit enthusiast." },
        {
          role: "user",
          content: `Generate an EMOM-style CrossFit workout with movements: ${movements.join(
            ", ",
          )}. I want it in json format with description:, movements:, duration:, instructions:, repScheme:.`,
        },
      ],
      response_format: { type: "json_object" },
    });

    // Extract and send the generated EMOM workout
    const emomWorkout = emomCompletion.choices[0].message.content;
    console.log("EMOM Workout:", emomWorkout);

    // For Time Style
    const forTimeCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [
        { role: "system", content: "You are a CrossFit enthusiast." },
        {
          role: "user",
          content: `Build a For Time CrossFit workout with movements: ${movements.join(
            ", ",
          )}. I want it in json format with description:, movements:, duration:, instructions:, repScheme:.`,
        },
      ],
      response_format: { type: "json_object" },
    });

    // Extract and send the generated For Time workout
    const forTimeWorkout = forTimeCompletion.choices[0].message.content;
    console.log("For Time Workout:", forTimeWorkout);

    // You can use or send the generated workouts as needed.
    res.json({ amrap: amrapWorkout, emom: emomWorkout, forTime: forTimeWorkout });
  } catch (error) {
    console.error("Error generating workouts:", error);
    res
      .status(500)
      .json({ error: "Error generating workouts. Please try again." });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
