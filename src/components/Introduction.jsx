import React from "react";
import { TypingEffect } from "./TypingEffect";
import { Card1 } from "./CardWithPulses";
const Introduction = () => {
  return (
    <section className="relative overflow-hidden bg-gray-950">
      <div className="absolute left-0 w-1/3 top-1/2 aspect-[1/1] -translate-y-1/2 -translate-x-1/2 rounded-full bg-gradient-to-l from-lime-400 to-40% to-transparent"></div>
      <div className="absolute right-0 w-1/3 top-1/2 aspect-[1/1] -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-r from-lime-400 to-40% to-transparent"></div>
      <div className="max-w-3xl mx-auto px-4 py-4">
        
            <div
              className={
                "mt-14 bg-clip-text text-center text-transparent bg-shine bg-[length:400%_100%] shadow duration-[1500ms] dark:bg-[linear-gradient(110deg,#ffffff,45%,#1a2e05,55%,#ffffff)] border-white font-semibold tracking-tight text-4xl sm:text-5xl md:text-6xl md:leading-[4rem]"
              }
            >
                What is ReflectlyAI?
                </div>
        <Card1>
          <div className="px-14 py-8 z-50 relative">
            <p className="text-justify text-zinc-300 leading-6 mb-4">
              Reflectly AI is your personal AI interview coach, designed to
              transform the way you prepare for job interviews. With intelligent
              question generation, real-time voice analysis, and tailored
              feedback, Reflectly AI doesn’t just simulate interviews — it
              sharpens your responses, boosts your confidence, and helps you
              master the art of storytelling under pressure. Whether you're
              aiming for your dream role or just building professional presence,
              Reflectly AI empowers you to speak with clarity, purpose, and
              authenticity. It's more than practice — it's preparation
              reimagined.
            </p>
          </div>
        </Card1>
      </div>
    </section>
  );
};

export default Introduction;
