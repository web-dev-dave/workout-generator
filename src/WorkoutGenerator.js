// WorkoutGenerator.js
import { observer } from "mobx-react";
import React, { useState } from "react";
import workoutStore from "./WorkoutStore.ts";
import { Button, Card, CardBody, CardTitle, ButtonGroup } from "reactstrap";

const WorkoutGenerator = () => {
  const [generatedWorkout, setGeneratedWorkout] = useState({});
  const [isGenerateButtonClicked, setIsGenerateButtonClicked] = useState(false);
  const [selectedWorkoutType, setSelectedWorkoutType] = useState("amrap");

  const generateWorkout = async () => {
    // Extract input values from the store
    const movements = workoutStore.movements;

    try {
      // Make a request to your server-side function
      const response = await fetch("http://localhost:3002/generate-workout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movements }),
      });

      if (response.ok) {
        const apiResponse = await response.json();

        // Parse the JSON-formatted strings for each workout type
        const parsedData = {
          amrap: JSON.parse(apiResponse.amrap),
          emom: JSON.parse(apiResponse.emom),
          forTime: JSON.parse(apiResponse.forTime),
        };

        setGeneratedWorkout(parsedData);
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

  const clearGeneratedWorkout = () => {
    setGeneratedWorkout("");
    workoutStore.setMovements("");
    setIsGenerateButtonClicked(false);
  };

  const handleWorkoutTypeChange = (type) => {
    setSelectedWorkoutType(type);
  };

  return (
    <div>
      <ButtonGroup className="flex">
        <Button
          color="success"
          outline
          onClick={() => handleWorkoutTypeChange("amrap")}
          active={selectedWorkoutType === "amrap"}
        >
          AMRAP
        </Button>
        <Button
          color="success"
          outline
          onClick={() => handleWorkoutTypeChange("emom")}
          active={selectedWorkoutType === "emom"}
        >
          EMOM
        </Button>
        <Button
          color="success"
          outline
          onClick={() => handleWorkoutTypeChange("forTime")}
          active={selectedWorkoutType === "forTime"}
        >
          For Time
        </Button>
      </ButtonGroup>

      {generatedWorkout.error && (
        <div className="text-danger">{generatedWorkout.error}</div>
      )}

      {Object.keys(generatedWorkout).length > 0 && (
        <div className="flex space-x-4">
          <Card className="w-72 m-4">
            <CardBody>
              <CardTitle tag="h5">
                {generatedWorkout[selectedWorkoutType].description}
              </CardTitle>
              <p className="font-bold mb-2">
                Duration: {generatedWorkout[selectedWorkoutType].duration}
              </p>
              {generatedWorkout[selectedWorkoutType] && (
                <>
                  <p>Rep Scheme:</p>
                  {typeof generatedWorkout[selectedWorkoutType].repScheme ===
                  "object" ? (
                    <ul>
                      {Object.entries(
                        generatedWorkout[selectedWorkoutType].repScheme,
                      ).map(([exercise, reps], index) => (
                        <li key={index}>
                          {exercise}: {reps}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>
                      Rep Scheme:{" "}
                      {generatedWorkout[selectedWorkoutType].repScheme}
                    </p>
                  )}
                </>
              )}

              <p className="font-bold mt-2">
                Instructions:{" "}
                {generatedWorkout[selectedWorkoutType].instructions}
              </p>
            </CardBody>
          </Card>
        </div>
      )}

      {!isGenerateButtonClicked && (
        <div className="flex align-middle justify-center">
          <Button
            outline
            color="primary"
            onClick={generateWorkout}
            disabled={isGenerateButtonClicked}
            size="lg"
          >
            Generate Workout
          </Button>
        </div>
      )}
      {isGenerateButtonClicked && (
        <div className="flex align-middle justify-center">
          <Button
            outline
            color="danger"
            onClick={clearGeneratedWorkout}
            disabled={!isGenerateButtonClicked}
            size="lg"
          >
            Clear Workout
          </Button>
        </div>
      )}
    </div>
  );
};

export default observer(WorkoutGenerator);
