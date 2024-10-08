"use client"
import React from "react";
import { motion } from "framer-motion";

const Work = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };
  return (
    <div className="flex flex-col gap-16 justify-center items-center ">
      <h2 className="text-2xl lg:text-2xl text-center text-gray-600 font-bold border-b-4 border-themeColor">
        How it works?
      </h2>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={sectionVariants}
        className="grid grid-cols-1 lg:grid-cols-4 w-full lg:border-x border-y-0
        "
      >
        <div className="border-y lg:border-y-0 lg:border-x relative px-5 py-10">
          <div className="flex flex-col gap-8">
            <h2 className="text-2xl text-center font-semibold text-gray-600">
              CONSULTATION <span className="text-7xl text-themeColor">1</span>
            </h2>
            <p className="px-5 text-gray-500 text-center lg:text-start">
              We start by understanding your travel needs and preferences
              through a detailed consultation.
            </p>
          </div>
          <div
            className={`absolute w-8 h-8 transform rotate-45 bg-themeColor 
                lg:top-[40%] left-[40%] md:left-[45%] lg:left-auto lg:right-0 translate-x-1/2  lg:translate-x-[55%] 
                bottom-0  translate-y-1/2 z-10 `}
          ></div>
          <div
            className={`absolute w-8 h-8 transform rotate-45 bg-white 
                lg:top-[40%] left-[40%] md:left-[45%] lg:left-auto lg:right-0 translate-x-1/2  lg:translate-x-[30%] 
                bottom-0  translate-y-[30%] lg:translate-y-1/2 z-10 `}
          ></div>
        </div>
        <div className="border-y lg:border-y-0 lg:border-x relative px-5 py-10">
          <div className="flex flex-col gap-8">
            <h2 className="text-2xl text-center font-semibold text-gray-600">
              PLANNING <span className="text-7xl text-themeColor">2</span>
            </h2>
            <p className="px-5 text-gray-500 text-center lg:text-start">
              We book tickets tailored to your requirements, ensuring cost
              efficiency and convenience.
            </p>
          </div>
          <div
            className={`absolute w-8 h-8 transform rotate-45 bg-themeColor 
                lg:top-[40%] left-[40%] md:left-[45%] lg:left-auto lg:right-0 translate-x-1/2  lg:translate-x-[55%] 
                bottom-0  translate-y-1/2 z-10`}
          ></div>
          <div
            className={`absolute w-8 h-8 transform rotate-45 bg-white 
                lg:top-[40%] left-[40%] md:left-[45%] lg:left-auto lg:right-0 translate-x-1/2  lg:translate-x-[30%] 
                bottom-0  translate-y-[30%] lg:translate-y-1/2 z-10`}
          ></div>
        </div>
        <div className="border-y lg:border-y-0 lg:border-x relative px-5 py-10">
          <div className="flex flex-col gap-8">
            <h2 className="text-2xl text-center font-semibold text-gray-600">
              BOOKING <span className="text-7xl text-themeColor">3</span>
            </h2>
            <p className="px-5 text-gray-500 text-center lg:text-start">
              We handle all aspects of booking and reservations, providing you
              with confirmations and detailed itineraries.
            </p>
          </div>
          <div
            className={`absolute w-8 h-8 transform rotate-45 bg-themeColor 
                lg:top-[40%] left-[40%] md:left-[45%] lg:left-auto lg:right-0 translate-x-1/2  lg:translate-x-[55%] 
                bottom-0  translate-y-1/2 z-10`}
          ></div>
          <div
            className={`absolute w-8 h-8 transform rotate-45 bg-white 
                lg:top-[40%] left-[40%] md:left-[45%] lg:left-auto lg:right-0 translate-x-1/2  lg:translate-x-[30%] 
                bottom-0  translate-y-[30%] lg:translate-y-1/2 z-10`}
          ></div>
        </div>
        <div className="border-y lg:border-y-0 lg:border-x relative px-5 py-10">
          <div className="flex flex-col gap-8">
            <h2 className="text-2xl text-center font-semibold text-gray-600">
              SUPPORT <span className="text-7xl text-themeColor">4</span>
            </h2>
            <p className="px-5 text-gray-500 text-center lg:text-start">
              Our team is available 24/7 to assist with any travel-related
              queries or changes.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Work;
