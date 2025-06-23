import React, { useRef, useState } from "react";
import axios from "axios";

function AudioRecorder() {
  const [audioBlob, setAudioBlob] = useState(null);
  const [transcript, setTranscript] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioRef = useRef(null);


  const getMicrophone = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const microphones = devices.filter(
        (device) => device.kind === "audioinput" && device.deviceId !== "default" && device.deviceId !== "communications"
      );
      if (microphones.length > 0) {
        const microphone = microphones[1];
        console.log("Selected microphone:", microphone);
        return microphone.deviceId;
      } else {
        console.error("No microphones found");
        return null;
      }
    } catch (err) {
      console.error("Error accessing microphone:", err);
      return null;
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { deviceId: await getMicrophone() } });
      const mediaRecorder = new MediaRecorder(stream);

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        setAudioBlob(audioBlob);
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const uploadAudio = async () => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append("file", audioBlob, "audio.wav");

    try {
      const response = await axios.post(
        "http://localhost:5000/transcribe",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Transcription response:", response.data);
      setTranscript(response.data.text);
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={startRecording}
        className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Start Recording
      </button>

      <button
        type="button"
        onClick={stopRecording}
        className="text-gray-900 bg-gradient-to-r from-red-200 via-red-400 to-red-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Stop Recording
      </button>
      <button
        type="button"
        onClick={uploadAudio}
        className="text-gray-900 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Upload & Transcribe
      </button>
      <br />
      {audioBlob && (
        <div>
          <audio ref={audioRef} controls src={URL.createObjectURL(audioBlob)} />
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => audioRef.current?.play()}
          >
            ▶️ Play Recorded Audio
          </button>
        </div>
      )}
      <p>Transcript: {transcript}</p>
    </div>
  );
}

export default AudioRecorder;
