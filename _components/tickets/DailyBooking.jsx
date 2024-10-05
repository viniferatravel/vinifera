"use client";
import React from "react";
import { IoMdAirplane } from "react-icons/io";
import { FaTrainSubway, FaBusSimple } from "react-icons/fa6";
import { FaCar } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { motion } from "framer-motion";

// {
//   icon: <MdArrowOutward className="size-6 text-themeColor" />,
//   heading: "Daily Bookings",
//   numbers: "1800+",
// },
const slides = [
  {
    icon: <IoMdAirplane className="size-6 lg:size-10 text-themeColor" />,
    heading: "Daily Flights",
    numbers: "100+",
  },
  {
    icon: <FaTrainSubway className="size-6 lg:size-10 text-themeColor" />,
    heading: "Daily Trains",
    numbers: "120+",
  },
  {
    icon: <FaBusSimple className="size-6 lg:size-10 text-themeColor" />,
    heading: "Daily Busses",
    numbers: "80+",
  },
  {
    icon: <FaCar className="size-6 lg:size-10 text-themeColor" />,
    heading: "Daily Private Cars",
    numbers: "90+",
  },
];
const DailyBooking = () => {
  
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full h-96 ">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={sectionVariants}
        className="flex flex-col justify-evenly w-full col-span-1 border rounded-2xl bg-red-200 p-5 lg:p-10 gap-3"
      >
        <div className="flex ">
          <span className="text-3xl lg:text-6xl text-themeColor font-semibold">
            1800+
          </span>
        </div>
        <div className="flex justify-between items-center">
          <h2 className="flex lg:flex-col text-xl lg:text-2xl text-themeColor font-semibold gap-2">
            Daily <span>Bookings</span>
          </h2>
          <div className="p-3 lg:p-5  bg-white rounded-full cursor-pointer ">
            <MdArrowOutward className="size-6 text-themeColor animate-bounce" />
          </div>
        </div>
      </motion.div>
      <div className="w-full cols-span-1 lg:col-span-2  grid grid-cols-2 h-full gap-5">
        {slides.map((slide, index) => (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={sectionVariants}
            key={index}
            className="border border-red-300 shadow shadow-gray-400 rounded-2xl flex justify-between p-5 lg:p-10"
          >
            <div className="flex flex-col justify-between h-full">
              <h2 className="text-2xl lg:text-3xl text-themeColor font-semibold">
                {slide.numbers}
              </h2>
              <span className="text-themeColor text-base lg:text-lg">
                {slide.heading}
              </span>
            </div>
            <div className="">{slide.icon}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DailyBooking;
