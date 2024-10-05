"use client"
import React from "react";
import { IoMdAirplane } from "react-icons/io";
import { FaTrainSubway, FaBusSimple } from "react-icons/fa6";
import { FaCar } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

const slides = [
    {
        icon: "1",
        heading: "Fast and Reliable Processing",
        desc: "Book your flights effortlessly and discover the best deals tailored just for you.",
    },
    {
        icon: "2",
        heading: "Expert guidance for all types of visas",
        desc: "Experience scenic journeys with our hassle-free train booking service across India.",
    },
    {
        icon: "3",
        heading: "Secure data handling",
        desc: "Travel comfortably and affordably—reserve your bus tickets for a smooth ride.",
    },
    {
        icon: "4",
        heading: "Dedicated customer support",
        desc: "Enjoy luxury and convenience with our private car rentals, ready for any destination.",
    },
];

const Passportcard = ({ scrollToContact }) => {
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
          lg:w-[calc(25%-15px)] h-72 flex items-center justify-center flex-col
          gap-5 snap-start mt-14 lg:mb-14 md:mb-0"
                >
                    <div className="relative border w-full h-full rounded-2xl flex justify-between items-center bg-red-100 flex-col p-5">
                        <div className=" flex flex-col gap-4 items-center justify-center">
                            <div className="absolute top-5 left-0 translate-x-[-20px] size-14 bg-white flex justify-center items-center rounded-full p-5 font-extrabold text-3xl text-themeColor">{slide.icon}</div>
                            <div className="absolute top-5 left-0  translate-x-[-20px] bg-white flex justify-center items-center w-5 h-14"></div>
                        </div>

                        <div className="flex flex-col justify-center items-center h-[69%] gap-6">
                            <h2 className="text-xl 2xl:text-2xl font-extrabold xl:font-bold text-themeColor text-center h-[30%]">
                                {slide.heading}
                            </h2>
                            <p className="text-center text-gray-700 h-[70%]">{slide.desc}</p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Passportcard;
