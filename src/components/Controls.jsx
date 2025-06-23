import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Controls = ({ toastState, setToastState, sessionId, fetchNextQuestion }) => {
  const navigate = useNavigate();
  const [audioDevices, setAudioDevices] = useState([]);
  const [videoDevices, setVideoDevices] = useState([]);
  const [selectedAudioDeviceId, setSelectedAudioDeviceId] = useState("");
  const [selectedVideoDeviceId, setSelectedVideoDeviceId] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const startTimeRef = useRef(null);
  const mediaStreamRef = useRef(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const capturedImagesRef = useRef([]);

  const captureFrames = () => {
    const video = document.getElementById("video-preview");
    if (!video) {
      console.warn("Video element not found.");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Frame 1 at 5s
    setTimeout(() => {
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0);
      capturedImagesRef.current[0] = canvas.toDataURL("image/jpeg");
    }, 5000);

    // Frame 2 at 10s
    setTimeout(() => {
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0);
      capturedImagesRef.current[1] = canvas.toDataURL("image/jpeg");
    }, 10000);
  };

  const recordAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: { exact: selectedAudioDeviceId },
        },
      });

      mediaStreamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        if(startTimeRef.current) {
          const duration = (Date.now() - startTimeRef.current) / 1000;
          if(duration < 10) {
            setToastState("timeError");
            console.error("Recording duration is less than 10 seconds.");
            return;
          }
        }
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        const formData = new FormData();
        formData.append("session_id", sessionId);
        formData.append("file", audioBlob, "recording.webm");
        if (capturedImagesRef.current[0]) {
          const blob1 = dataURLtoBlob(capturedImagesRef.current[0]);
          formData.append("image1", blob1, "frame1.jpg");
        }
        if (capturedImagesRef.current[1]) {
          const blob2 = dataURLtoBlob(capturedImagesRef.current[1]);
          formData.append("image2", blob2, "frame2.jpg");
        }

        setToastState("loading");
        try {
          const response = await axios.post(
            `${API_BASE_URL}/submit_response`,
            formData
          );
          console.log("Response status:", response.status);
          console.log("Response data:", response.data);
          if (response.data.type && response.data.type === "feedback") {
            console.log("Feedback received");
          }
          fetchNextQuestion(sessionId);
        } catch (err) {
          console.error("Error uploading audio:", err);
        }

        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.onstart = () => {
        setToastState("user");
        captureFrames();
        startTimeRef.current = Date.now();
        console.log("MediaRecorder started and capturing frames");
      };

      mediaRecorder.start();
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to get audio stream:", err);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      console.log("Recording stopped");
    }
  };

  const handleButtonClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      recordAudio();
    }
    setIsRecording((prev) => !prev);
  };

  const dataURLtoBlob = (dataurl) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const audioInputs = devices.filter(
          (d) =>
            d.kind === "audioinput" &&
            !d.label.toLowerCase().includes("communications") &&
            !d.label.toLowerCase().includes("default")
        );
        console.log(audioInputs);
        const videoInputs = devices.filter((d) => d.kind === "videoinput");

        setAudioDevices(audioInputs);
        setVideoDevices(videoInputs);
        console.log("Video Devices: ", videoInputs);
        if (videoInputs.length > 0) {
          setSelectedVideoDeviceId(videoInputs[0].deviceId);
        }

        if (audioInputs.length > 0) {
          setSelectedAudioDeviceId(audioInputs[0].deviceId);
        }
        console.log("selectedVideoDeviceId: ", selectedVideoDeviceId);
      })
      .catch((err) => {
        console.error("Error accessing media devices:", err);
      });
  }, []);

  useEffect(() => {
    if (!selectedVideoDeviceId) return;
    const startVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: { exact: selectedVideoDeviceId },
          },
        });

        const videoElement = document.getElementById("video-preview");
        console.log("Video Element:", videoElement);
        if (videoElement) {
          videoElement.srcObject = stream;
        }
      } catch (err) {
        console.error("Failed to get video stream:", err);
      }
    };
    startVideoStream();
  }, [selectedVideoDeviceId]);

  return (
    <div className="bg-lime-900 rounded-3xl mb-20 mx-auto max-w-fit shadow-lime-400 shadow-[0_0_35px]">
      <video
        id="video-preview"
        className="rounded-2xl max-w-3xl mx-auto"
        autoPlay
        playsInline
      />

      <div className="parent  absolute -bottom-2 left-1/2 -translate-x-1/2 z-10 ">
        <div className="w-full border border-lime-50/50 bg-lime-950   px-12 pt-2 pb-4 flex justify-center items-center gap-4 max-w-3xl [clip-path:polygon(5%_0%,95%_0%,100%_100%,0%_100%)]">
          <div className="relative">
            <div className="absolute left-1 top-0 translate-y-1/2 rounded-full mt-0.5">
              <img
                width="20"
                height="20"
                src="https://img.icons8.com/material-rounded/24/a3e635/microphone.png"
              />
            </div>
            <select
              id="underline_select"
              onChange={(e) => setSelectedAudioDeviceId(e.target.value)}
              value={selectedAudioDeviceId}
              className="w-3xs py-2.5 px-2 ps-7 rounded-lg text-base border-0 border-b-2 appearance-none bg-lime-800 text-lime-400 border-lime-700 focus:outline-none focus:ring-0 focus:border-lime-700 peer"
            >
              {audioDevices.map((device, i) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Microphone ${i + 1}`}
                </option>
              ))}
            </select>
          </div>
          <button
          disabled={toastState === "interviewer" || toastState === "loading" ? true: ""}
          type="button"
            className={`p-3 rounded-full  border text-white border-lime-300/40 transition-colors duration-200 ${
              isRecording ? "bg-white" : "bg-lime-400/60"
            } ${toastState === "interviewer" || toastState === "loading" ? "cursor-not-allowed" : "cursor-pointer"} disabled:bg-gray-950`}
            onClick={handleButtonClick}
          >
            {isRecording ? (
              <div className="h-4 w-4 m-1 bg-lime-900"></div>
            ) : (
              <svg viewBox="0 0 18 18" className="w-8 h-8" fill="currentColor">
                <path
                  d="M5.66699 14.4165V3.5835C5.66699 2.89314 6.22664 2.3335 6.91699 2.3335C7.6072 2.33367 8.16699 2.89325 8.16699 3.5835V14.4165C8.16699 15.1068 7.6072 15.6663 6.91699 15.6665C6.22664 15.6665 5.66699 15.1069 5.66699 14.4165ZM9.83301 11.9165V6.0835C9.83301 5.39325 10.3928 4.83367 11.083 4.8335C11.7734 4.8335 12.333 5.39314 12.333 6.0835V11.9165C12.333 12.6069 11.7734 13.1665 11.083 13.1665C10.3928 13.1663 9.83301 12.6068 9.83301 11.9165ZM1.5 10.2505V7.75049C1.5 7.06013 2.05964 6.50049 2.75 6.50049C3.44036 6.50049 4 7.06013 4 7.75049V10.2505C3.99982 10.9407 3.44025 11.5005 2.75 11.5005C2.05975 11.5005 1.50018 10.9407 1.5 10.2505ZM14 10.2505V7.75049C14 7.06013 14.5596 6.50049 15.25 6.50049C15.9404 6.50049 16.5 7.06013 16.5 7.75049V10.2505C16.4998 10.9407 15.9402 11.5005 15.25 11.5005C14.5598 11.5005 14.0002 10.9407 14 10.2505Z"
                  fill="currentColor"
                ></path>
              </svg>
            )}
          </button>
          <div className="relative">
            <div className="absolute left-1.5 top-0 translate-y-1/2 rounded-full mt-0.5">
              <img
                width="20"
                height="20"
                src="https://img.icons8.com/material-rounded/24/a3e635/camera--v2.png"
              />
            </div>
            <select
              id="underline_select"
              onChange={(e) => setSelectedVideoDeviceId(e.target.value)}
              value={selectedVideoDeviceId}
              className="w-3xs py-2.5 px-2 ps-8 rounded-lg text-base border-0 border-b-2 appearance-none bg-lime-800 text-lime-400 border-lime-700 focus:outline-none focus:ring-0 focus:border-lime-700 peer"
            >
              {videoDevices.map((device, i) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Camera ${i + 1}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        <svg className="flt_svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="flt_tag">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="8"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                result="flt_tag"
              />
              <feComposite in="SourceGraphic" in2="flt_tag" operator="atop" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Controls;
