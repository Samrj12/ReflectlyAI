import React from "react";
import { Dots } from "./animation/Dots";

const renderToastContent = (state, onButtonClick) => {
  switch (state) {
    case "loading":
      return <Dots />;
    case "interviewer":
      return <h1>Interviewer is speaking...</h1>;
    case "readyToRepeat":
      return (
        <img width="24" height="24" src="https://img.icons8.com/material-sharp/24/a3e635/rotate.png" alt="repeat" onClick={onButtonClick} className="cursor-pointer"/>
      );
    case "timeError":
      return <h1>Response time must be at least 10 seconds. Please try again.</h1>;
    default:
      return null;
  }
};
const NotificationToast = ({state, onButtonClick}) => {
  console.log("NotificationToast state: ", state);
  return (
    <div className={`absolute top-12 left-1/2 -translate-x-1/2 text-center mt-4 ${state === "user" ? "hidden" : ""} transition-all duration-500 ease-in-out`}>
      <div
        className="group relative inline-block p-0.5 font-semibold overflow-hidden rounded-full"
      >
        <div className="absolute inset-0 bg-lime-800 text-lime-400 group-focus:to-white opacity-40 group-focus:opacity-20 rounded-full"></div>
        <div className="bg-lime-800 text-lime-400 relative z-50 flex items-center py-2 px-4 group-hover:opacity-80 group-focus:opacity-80 rounded-full transition duration-200 text-base tracking-wide text-nowrap">
          {renderToastContent(state, onButtonClick)}
        </div>
      </div>
    </div>
  );
};

export default NotificationToast;
