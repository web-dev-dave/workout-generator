import React, { useState } from "react";

const SpeechToText = ({ onSpeechResult }) => {
  const [listening, setListening] = useState(false);

  const handleRecording = async () => {
    setListening(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        setListening(false);

        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });

        try {
          const audioData = new FormData();
          audioData.set("file", audioBlob, "audio.wav");
          const response = await fetch(
            "http://localhost:3001/convert-speech-to-text",
            {
              method: "POST",
              body: audioData,
              headers: {},
            },
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const result = await response.json();
          const transcription = result.transcription;
          onSpeechResult(transcription);
        } catch (error) {
          console.error("Error converting speech to text:", error);
        }
      };

      mediaRecorder.start();
      setTimeout(() => mediaRecorder.stop(), 5000); // Stop recording after 5 seconds
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setListening(false);
    }
  };

  return (
    <div>
      <div
        onClick={handleRecording}
        disabled={listening}
        className="hover:text-red-700 font-bold flex items-center justify-center cursor-pointer transition-colors duration-300 ease-in-out text-gray-700 text-2xl"
      >
        {listening ? "I am listening..." : "I am a button"}
      </div>
    </div>
  );
};

export default SpeechToText;
