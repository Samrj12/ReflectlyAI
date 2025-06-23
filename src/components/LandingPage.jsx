import React, { useState } from "react";
import star1 from "../assets/stars-pattern1.svg";
import star2 from "../assets/stars-pattern2.svg";
import { motion, useInView } from "motion/react";
import { Link } from "react-router-dom";
import Introduction from "./Introduction";
import FallingStar from "./FallingStar";
import Features from "./Features";
const LandingPage = () => {
  const divRef = React.useRef(null);
  const isInView = useInView(divRef, { once: false, amount: 0.5 });
  return (
    <div className="bg-white text-gray-900">
      <section className="bg-gradient-to-t from-gray-950 to-lime-500 from-50% via-lime-700 via-90% relative overflow-hidden">
        <div className="container mx-auto px-4">
          <nav className="py-5 border-b border-white/10">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-center">
                <div className="lg:flex gap-2 p-1 rounded-full bg-gray-950">
                  <a
                    className="px-1 py-1 opacity-100 rounded-full tracking-wide bg-gradient-to-r from-lime-400 via-40% via-lime-50 to-95% to-lime-400  bg-clip-text text-lg font-extrabold text-transparent transition duration-200"
                    href="#"
                  >
                    ReflectlyAI
                  </a>
                </div>
              </div>
            </div>
          </nav>
          <div class="relative pt-24 pb-14">
            <img
              class="hidden lg:block absolute left-16 xl:left-36 2xl:left-56 3xl:left-96 top-56"
              src={star1}
            />
            <img
              class="hidden lg:block absolute right-4 xl:right-36 2xl:right-56 3xl:right-96 top-56"
              src={star2}
              alt=""
            />
            <div class="relative z-50" ref={divRef}>
              <h1 class="font-heading text-white text-center text-5xl md:text-7xl font-bold max-w-4xl mx-auto mb-6">
                Interview{" "}
                <motion.div
                  initial={{ y: -200, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="inline-block"
                >
                  Smarter,
                </motion.div>{" "}

                <motion.div
                  initial={{ y: -200, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}
                  className="inline-block"
                >
                  Sharper,
                </motion.div>{" "}
                <motion.div
                  initial={{ x: 200, opacity: 0, color: "#ffffff" }}
                  animate={isInView ? { x: 0, opacity: 1, color: "#a3e635" } : {}}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.9 }}
                  className="inline-block text-shadow-[0_10px_35px] text-shadow-lime-400/50"
                >
                  Better
                </motion.div>
              </h1>
              <p class="text-center text-white max-w-xl mx-auto text-lg mt-12">
                Your personal AI coach for confident, compelling interviews —
                helping you practice, improve, and succeed.
              </p>
              <div class="mb-40 text-center mt-4">
                <a
                  class="group relative inline-block p-0.5 font-semibold overflow-hidden rounded-full"
                  href="#"
                >
                  <div class="absolute inset-0 bg-gradient-to-b from-white to-gray-500 group-focus:to-white opacity-40 group-focus:opacity-20 rounded-full"></div>
                  <div class="relative z-50 flex items-center py-2 px-4 bg-white group-hover:opacity-80 group-focus:opacity-80 rounded-full transition duration-200">
                    <Link to={"/interview"} class="text-pinkSecondary-900">Get started</Link>
                  </div>
                </a>
              </div>
              {/* <img
                class="w-full object-cover"
                src={star1}
                alt=""
              /> */}
            </div>
          </div>
        </div>
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-20">
          <FallingStar className="text-zinc-300 pulse-animation delay-200 via-zinc-700 from-zinc-900 to-zinc-500"/>  
          <FallingStar className="pt-8 text-zinc-500 via-zinc-700 from-zinc-900 to-zinc-500" />  
          <FallingStar className="mt-12 text-lime-500 pulse-animation delay-400 via-lime-700 from-lime-900 to-lime-500" />  
          <FallingStar className="mt-8 text-zinc-500 via-zinc-700 from-zinc-900 to-zinc-500" />  
          <FallingStar className="text-zinc-300 pulse-animation delay-600 via-zinc-700 from-zinc-900 to-zinc-500" />  
        </div>
      </section>
      <Introduction />
      <Features />
    </div>
  );
};

export default LandingPage;
