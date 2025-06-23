import React, { useEffect, useRef, useState } from "react";
import Controls from "./Controls";
import UserInfoModal from "./UserInfoModal";
import axios from "axios";
import NotificationToast from "./NotificationToast";
import { useNavigate } from "react-router-dom";

const InterviewPage = () => {
  const [sessionId, setSessionId] = useState(null);
  const audioURLRef = useRef(null);
  const [toastState, setToastState] = useState("loading");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  console.log("API_BASE_URL:", API_BASE_URL);
  const navigate = useNavigate();
  const startSession = async (name, jobDescription) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("jobDescription", jobDescription);

      const response = await axios.post(
        `${API_BASE_URL}/start_session`,
        formData
      );
      setSessionId(response.data.session_id);
      console.log("Session ID:", response.data.session_id);
    } catch (error) {
      console.error("Failed to fetch session ID:", error);
    }
  };

  function base64ToBlob(base64, mime) {
    const byteCharacters = atob(base64); // decode base64
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    return new Blob([byteArray], { type: mime });
  }

  const fetchNextQuestion = async (session_id) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/next_question`,
        { session_id },
        {
          headers: { "Content-Type": "application/json" },
          responseType: "json", // IMPORTANT: parse as JSON always
        }
      );

      if (response.data.type && response.data.type === "feedback") {
        navigate("/feedback", {
          state: {
            sessionId: session_id,
          },
        });
        return;
      }
      console.log("Next question:", response.data);
      // Here response.data.audio is base64 string (not blob)
      const audioBlob = base64ToBlob(response.data.audio, "audio/mp3");
      audioURLRef.current = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioURLRef.current);
      setToastState("interviewer");
      audio.onended = () => setToastState("readyToRepeat");
      

      audio.addEventListener("canplaythrough", () => {
        audio.play();
      });
      setToastState("interviewer");
    } catch (error) {
      console.error("Failed to fetch next question:", error);
    }
  };

  const replay = () => {
    if (audioURLRef.current) {
      const audio = new Audio(audioURLRef.current);
      setToastState("interviewer");
      audio.addEventListener("canplaythrough", () => {
        audio.play();
      });
      audio.onended = () => {
        setToastState("readyToRepeat");
      };
    }
  };
  useEffect(() => {
    if (sessionId) {
      fetchNextQuestion(sessionId);
    }
  }, [sessionId]);
  return (
    <section className="h-screen relative overflow-y-clip bg-gray-950 pb-24 pt-4">
      <UserInfoModal onSubmit={startSession} />
      <NotificationToast state={toastState} onButtonClick={replay} />
      <div className="container mx-auto px-4">
        <div className="mb-20 relative">
          <div className="absolute bottom-0 left-0 w-full bg-white/10 h-px"></div>
          <div className="overflow-x-auto">
            <div className="flex items-center justify-center gap-12">
              <a
                className="px-1 py-1 opacity-100 border-b-2 border-lime-400 tracking-wide bg-gradient-to-r from-lime-400 from-30% via-lime-50 to-95% to-lime-400  bg-clip-text text-lg font-bold text-transparent transition duration-200"
                href="#"
              >
                ReflectlyAI
              </a>
            </div>
          </div>
        </div>
        <Controls
          toastState={toastState}
          setToastState={setToastState}
          sessionId={sessionId}
          fetchNextQuestion={fetchNextQuestion}
        />
      </div>
    </section>
  );
};

export default InterviewPage;
