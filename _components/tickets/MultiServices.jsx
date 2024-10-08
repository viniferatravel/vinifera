"use client"
import React from "react";
import { IoMdAirplane } from "react-icons/io";
import { FaTrainSubway, FaBusSimple } from "react-icons/fa6";
import { FaCar } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";


const slides = [
  {
    icon: (
      <IoMdAirplane className="size-6 text-themeColor animate-appearance-in" />
    ),
    heading: "Flights",
    desc: "Book your flights effortlessly and discover the best deals tailored just for you.",
  },
  {
    icon: (
      <FaTrainSubway className="size-6 text-themeColor animate-appearance-in" />
    ),
    heading: "Trains",
    desc: "Experience scenic journeys with our hassle-free train booking service across India.",
  },
  {
    icon: (
      <FaBusSimple className="size-6 text-themeColor animate-appearance-in" />
    ),
    heading: "Bus",
    desc: "Travel comfortably and affordably—reserve your bus tickets for a smooth ride.",
  },
  {
    icon: <FaCar className="size-6 text-themeColor animate-appearance-in" />,
    heading: "Private Cars",
    desc: "Enjoy luxury and convenience with our private car rentals, ready for any destination.",
  },
];

const MultiServices = ({ scrollToContact }) => {
  return (
    <div className="flex flex-col">
      <div className="hidden md:flex md:flex-wrap md:justify-between gap-5">
        <SlideCards scrollToContact={scrollToContact} />
      </div>
      <div className="md:hidden flex overflow-x-scroll relative w-full hide-scrollbar-x snap-x snap-mandatory scroll-smooth">
        <div className="flex w-full transition-transform duration-500 ease-in-out gap-x-5">
          <SlideCards scrollToContact={scrollToContact} />
        </div>
      </div>
    </div>
  );
};

const SlideCards = ({ scrollToContact }) => {

  return (
    <>
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex-none w-[calc(80%-15px)] md:w-[calc(50%-15px)]
          lg:w-[calc(25%-15px)] h-80 flex items-center justify-center flex-col
          gap-5 snap-start "
          >
            <div className="border w-full h-full rounded-2xl flex justify-between items-center bg-red-100 flex-col p-5">
              <div className="flex flex-col gap-4 items-center justify-center">
                <div className="bg-white p-5 rounded-full">{slide.icon}</div>
                <h2 className="text-xl font-semibold text-themeColor">
                  {slide.heading}
                </h2>
              </div>
              <p className="text-center text-gray-700">{slide.desc}</p>
              <div className="">
                <button onClick={scrollToContact} className="flex justify-center items-center gap-3 text-white px-4 py-3 rounded-full font-semibold bg-themeColor">
                  Enquire Now
                  <span>
                    <FaArrowRight />
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default MultiServices;
