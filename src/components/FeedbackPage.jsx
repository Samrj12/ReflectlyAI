import React, { use, useEffect } from "react";
import FallingStar from "./FallingStar";
import { ProgressCircle } from "./ProgressCircle";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
const FeedbackPage = () => {
  const location = useLocation();

  const sessionId = location.state?.sessionId || null;
  const [feedback, setFeedback] = React.useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Session ID from state:", sessionId);
    const fetchFeedback = async () => {
      if (sessionId && feedback === null) {
        try {
          const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

          const formData = new FormData();
          formData.append("session_id", sessionId);

          const response = await axios.post(
            `${API_BASE_URL}/get_feedback`,
            { session_id: sessionId },
            {
              headers: { "Content-Type": "application/json" },
              responseType: "json",
            }
          );
          console.log("Response status:", response.status);
          console.log("Response data:", response.data);
          const { feedback, final_score } = response.data;
          setFeedback({ final_score, ...feedback });
          console.log("Feedback response:", response.data);
        } catch (error) {
          console.error("Failed to fetch feedback:", error);
        }
      } else {
        console.error("Session ID is not available in state.");
        navigate("/interview");
      }
    };

    fetchFeedback();
  }, [sessionId]);

  return (
    <div className="bg-white text-gray-900">
      <section className="bg-gray-950  relative overflow-hidden">
        <div className="py-5 ">
          <div className="mx-auto px-4">
            <div className="px-3 mb-1 text-lime-400 text-center font-light tracking-tight text-4xl sm:text-5xl md:text-6xl md:leading-[4rem] mx-auto text-shadow-[0_0_30px_#a3e635]">
              Feedback
            </div>
            <div className="flex items-center justify-center">
              <div
                className={
                  "rounded-full w-full h-[1px] bg-gradient-to-r via-lime-700 from-lime-900 to-lime-500"
                }
              ></div>

              <div className="lg:flex rounded-full  bg-gray-950/50 z-50">
                <div className="p-1 px-2 opacity-100 border border-lime-400/50 rounded-full tracking-wide bg-gradient-to-r from-lime-400 via-40% via-lime-50 to-95% to-lime-400 bg-clip-text text-md font-extrabold text-transparent transition duration-200">
                  ReflectlyAI
                </div>
              </div>

              <div
                className={
                  "rounded-full w-full h-[1px] bg-gradient-to-l via-lime-700 from-lime-900 to-lime-500"
                }
              ></div>
            </div>
          </div>
        </div>

        <div className="container max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto px-4 py-4 flex flex-col items-center justify-center">
          <ProgressCircle
            value={feedback ? feedback.final_score : 0}
            max={100}
            radius={100}
            strokeWidth={10}
          ></ProgressCircle>
        </div>
        <div className="container  max-w-2xl lg:max-w-4xl mx-auto px-4 py-4">
          <div className="text-lime-400 text-start font-light tracking-tight text-3xl sm:text-4xl md:text-5xl md:leading-[4rem] mx-auto ">
            Strengths
          </div>
          <p className="text-white mx-auto text-lg mt-4 text-justify">
            {feedback ? feedback.strengths : "Loading strengths..."}
          </p>
          <div className={"rounded-full w-full h-[1px] my-6 bg-zinc-700"} />
          <div className="text-lime-400 text-start font-light tracking-tight text-3xl sm:text-4xl md:text-5xl md:leading-[4rem] mx-auto">
            Areas for Improvement
          </div>
          <p className="text-white mx-auto text-lg mt-4 text-justify">
            {feedback
              ? feedback.areas_to_improve
              : "Loading areas for improvement..."}
          </p>
          <div className={"rounded-full w-full h-[1px] my-6 bg-zinc-700"} />
          <div className="text-lime-400 text-start font-light tracking-tight text-3xl sm:text-4xl md:text-5xl md:leading-[4rem] mx-auto">
            Final Tips
          </div>
          <p className="text-white mx-auto text-lg mt-4 text-justify">
            {feedback ? feedback.tips : "Loading final tips..."}
          </p>
        </div>
        <div className="flex flex-col mx-auto md:max-w-2xl lg:max-w-4xl relative items-center justify-center mt-8 mb-2">
          <div className="flex items-center w-full mb-4 justify-center">
            <div
              className={
                "rounded-full w-full h-[1px] bg-gradient-to-r via-lime-700 from-lime-900 to-lime-500"
              }
            ></div>
            <span className="text-lime-400 text-2xl font-bold">&#10022;</span>
            <div
              className={
                "rounded-full w-full h-[1px] bg-gradient-to-l via-lime-700 from-lime-900 to-lime-500"
              }
            ></div>
          </div>
          <p className="text-center text-white max-w-xl mx-auto text-lg font-bold">
            <span className="font-extrabold text-3xl text-lime-400">
              &ldquo;{" "}
            </span>
            Great job! Congratulations on completing the interview. Keep pushing
            forward and never stop believing in yourself!
            <span className="font-extrabold text-3xl text-lime-400">
              {" "}
              &rdquo;
            </span>
          </p>
          <div className="flex items-center w-full mb-4 justify-center mt-4">
            <div
              className={
                "rounded-full w-full h-[1px] bg-gradient-to-r via-lime-700 from-lime-900 to-lime-500"
              }
            ></div>
            <span className="text-lime-400 text-2xl font-bold">&#10022;</span>
            <div
              className={
                "rounded-full w-full h-[1px] bg-gradient-to-l via-lime-700 from-lime-900 to-lime-500"
              }
            ></div>
          </div>
        </div>
        <div class="mb-8 text-center mt-4">
          <div
            class="group relative inline-block p-0.5 font-semibold overflow-hidden rounded-full"
            href="#"
          >
            <div class="absolute inset-0 bg-gradient-to-b from-white to-gray-500 group-focus:to-white opacity-40 group-focus:opacity-20 rounded-full"></div>
            <div class="relative z-50 flex items-center py-2 px-4 bg-white group-hover:opacity-80 group-focus:opacity-80 rounded-full transition duration-200">
              <Link to={"/interview"} class="text-pinkSecondary-900">
                Interview Again
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeedbackPage;
