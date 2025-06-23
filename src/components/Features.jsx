import React from "react";
import { Card } from "./CardsWithBorders";
import FallingStar from "./FallingStar";

const Features = () => {
  /*
1. Personalized Coaching
ReflectlyAI begins with what matters most—you. From your goals to your dream role, every session is intelligently crafted to align with your unique journey.

2. Realistic Interview Sessions
Train with targeted questions tailored to the position you're aiming for, making every practice session purposeful and industry-relevant.

3. Smart Assessment
Your responses are evaluated in real time across key dimensions like clarity, structure, tone, and depth—mirroring what real interviewers care about.

4. Actionable Insights
Receive clear, focused feedback designed to sharpen your strengths and close gaps—so you're always improving, session after session.
  */
  const featuresList = [
    {
      title: "Personalized Coaching",
      description:
        "ReflectlyAI begins with what matters most—you. From your goals to your dream role, every session is intelligently crafted to align with your unique journey.",
    },
    {
      title: "Realistic Interview Sessions",
      description:
        "Train with targeted questions tailored to the position you're aiming for, making every practice session purposeful and industry-relevant.",
    },
    {
      title: "Smart Assessment",
      description:
        "Your responses are evaluated in real time across key visual and vocal dimensions—like eye contact, facial expressions, clarity, pace, and content structure—mirroring what real interviewers care about.",
    },
    {
      title: "Actionable Insights",
      description:
        "Receive clear, focused feedback designed to sharpen your strengths and close gaps—so you're always improving, session after session.",
    },
  ];
  return (
    <section className="relative overflow-hidden bg-gray-950">
      <div className="mx-auto px-4 py-4 z-10  mb-5">
        <div className="px-14 py-6 z-50 relative">
          <div className="absolute text-lime-400 text-8xl top-1/3 left-0">
            <FallingStar
              className="rotate-180 h-80 via-lime-700 from-lime-900 to-lime-500"
              height="h-80"
            />
          </div>
          <div className="absolute text-lime-400 text-8xl bottom-0 right-0">
            <FallingStar
              className="h-80 via-lime-700 from-lime-900 to-lime-500"
              height="h-80"
            />
          </div>
          <div className="flex items-center w-full">
            <div
              className={
                "rounded-full w-full h-[1px] bg-gradient-to-r via-lime-700 from-lime-900 to-lime-500"
              }
            ></div>
            <div className="px-3 text-white text-center font-semibold tracking-tight text-4xl sm:text-5xl md:text-6xl md:leading-[4rem] mx-auto mb-6 text-nowrap text-shadow-[0_0_30px_#a3e635]">
              Features
            </div>
            <div
              className={
                "rounded-full w-full h-[1px] bg-gradient-to-l via-lime-700 from-lime-900 to-lime-500"
              }
            ></div>
          </div>
          <div className="px-10 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuresList.map((feature, index) => (
              <Card
                key={index}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
