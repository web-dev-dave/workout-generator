import { observer } from 'mobx-react';
import SpeechToText from "./SpeechToTextGenerator";
import workoutStore from "./WorkoutStore.ts";
import './index.css';
import { useState } from 'react';
import WorkoutGenerator from './WorkoutGenerator.js';

const App = () => {
  const [showConfirmation, setShowConfirmation] = useState(true);

  const handleSpeechResult = (transcription) => {
    // Update your workout store or perform any action with the recognized speech result
    workoutStore.setMovements(transcription.text);
    setShowConfirmation(true); // Show the confirmation after each speech result
  };

  const onGenerateWorkout = () => {
    // Trigger the workout generation logic
    // For now, let's just log a message
    console.log('Generating workout...');
    setShowConfirmation(false); // Hide the confirmation after "Yes" is clicked
  };

  const handleClearChatClick = () => {
    workoutStore.clearMovements(); // Clear the chat
    setShowConfirmation(false); // Hide the confirmation after "Clear Chat" is clicked
  };

  return (
    <>
    <div className="flex items-center justify-center mt-4">
      <div className="flex flex-col items-center">
            <div className="text-center">
              <div className="text-sm">Click the button and say something</div>
              <div className="text-sm text-gray-500">
                (e.g. "10 push-ups, 20 squats, 30 sit-ups")
              </div>
            </div>
            <div className="mt-2 flex items-center justify-center">
              <SpeechToText onSpeechResult={handleSpeechResult} />
            </div>
            {workoutStore.movements.length > 0 && (
                <div className="mt-2">
                  {showConfirmation && (
                    <>
                    <div className="text-2xl">I heard you say</div>
                    <div className="text-2xl">{workoutStore.movements}</div>
                    <div className="text-2xl">Is this correct?</div>
                    </>
                  )}
                  {showConfirmation && (
                    <div className="flex mt-4">
                      <button
                        className="mr-2 bg-green-500 text-white px-4 py-2 rounded"
                        onClick={onGenerateWorkout}
                      >
                        Yes
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={handleClearChatClick}
                      >
                        Clear Chat
                      </button>
                    </div>
                  )}
              </div>
            )}
        <div className="mt-2">
        {/* <WorkoutGenerator /> */}
        </div>
      </div>
    </div>
    </>
  );
}

export default observer(App);
