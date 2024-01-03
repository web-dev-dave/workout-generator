// WorkoutGenerator.js
import { observer } from "mobx-react";
import React, { useState } from "react";
import workoutStore from "./WorkoutStore";

const WorkoutGenerator = () => {
  const [generatedWorkout, setGeneratedWorkout] = useState("");
  const [isGenerateButtonClicked, setIsGenerateButtonClicked] = useState(false);

  const generateWorkout = async () => {
    // Extract input values from the store
    const movements = workoutStore.movements
    //   .split(",")
    //   .map((movement) => movement.trim());
    const timeDomain = workoutStore.timeDomain;
    const rounds = parseInt(workoutStore.rounds, 10);

    try {
      // Make a request to your server-side function
      const response = await fetch("http://localhost:3001/generate-workout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movements, timeDomain, rounds }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedWorkout(data.workout);
      } else {
        console.error("Error generating workout:", response.statusText);
        setGeneratedWorkout("Error generating workout. Please try again.");
      }
    } catch (error) {
      console.error("Error generating workout:", error);
      setGeneratedWorkout("Error generating workout. Please try again.");
    }

    // Set button clicked state to true
    setIsGenerateButtonClicked(true);
  };

  return (
    <div>
      <h2>Generated Workout:</h2>
      <div>{generatedWorkout}</div>
      <button onClick={generateWorkout} disabled={isGenerateButtonClicked}>
        Generate Workout
      </button>
    </div>
  );
};

export default observer(WorkoutGenerator);