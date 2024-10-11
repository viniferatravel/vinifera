"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay"; // Import autoplay styles
import { Navigation, Autoplay } from "swiper/modules"; // Import Autoplay module
import { ChevronLeft, ChevronRight } from "lucide-react";
import IMAGES from "@/public/image";
import Image from "next/image";

const AboutTest = () => {
  const cards = [
    {
      title: "An Unforgettable Family Vacation in Kerala ",
      description:
        "Enjoy an unforgettable family vacation in Kerala, where serene backwaters and lush landscapes await. Create lasting memories in this vibrant, peaceful paradise.",
      name: "Omkar Kachare",
      img: IMAGES.omkar,
    },
    {
      title: "A Journey Through High Passes and Rugged Beauty",
      description:
        "Explore the high passes and rugged beauty of Ladakh, where stunning landscapes await. Enjoy ancient monasteries on this unforgettable adventure.",
      name: "Ankit Singh",
      img: IMAGES.ankit,
    },
    {
      title: "Epic Solo Adventure Through Rajasthan",
      description:
        "Set off on an epic solo adventure through Rajasthan, where grand palaces and deserts await. Explore vibrant cities and rich history on your journey.",
      name: "Avinash Thorat",
      img: IMAGES.avinash,
    },
    {
        title: "An Unforgettable Family Vacation in Kerala ",
        description:
          "Enjoy an unforgettable family vacation in Kerala, where serene backwaters and lush landscapes await. Create lasting memories in this vibrant, peaceful paradise.",
        name: "Omkar Kachare",
        img: IMAGES.omkar,
      },
      {
        title: "A Journey Through High Passes and Rugged Beauty",
        description:
          "Explore the high passes and rugged beauty of Ladakh, where stunning landscapes await. Enjoy ancient monasteries on this unforgettable adventure.",
        name: "Ankit Singh",
        img: IMAGES.ankit,
      },
      {
        title: "Epic Solo Adventure Through Rajasthan",
        description:
          "Set off on an epic solo adventure through Rajasthan, where grand palaces and deserts await. Explore vibrant cities and rich history on your journey.",
        name: "Avinash Thorat",
        img: IMAGES.avinash,
      },
  ];

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // Track the active slide index

  return (
    <div className="mt-20 bg-gray-100">
      <div className="flex flex-col gap-8 lg:gap-10 justify-center items-center py-20 w-[95%] mx-auto">
        <h2 className="text-2xl lg:text-3xl text-gray-600 font-bold underline decoration-themeColor">
          Explore the heartfelt stories
        </h2>
        <p className="text-base lg:text-lg lg:w-[80%] text-center">
          Delve into the inspiring tales and glowing testimonials from those
          who’ve experienced the magic of travel with us!
        </p>

        <div className="relative w-full lg:w-[80%] mx-auto flex flex-col lg:flex-row justify-center items-center gap-16 lg:gap-5 h-full">
          <div className="w-full h-auto ">
            <Swiper
              spaceBetween={20}
              slidesPerGroup={1}
              navigation={{
                nextEl: ".swiper-next",
                prevEl: ".swiper-prev",
              }}
              autoplay={{
                delay: 4000, // Auto-scroll delay in milliseconds
                disableOnInteraction: false, // Continue autoplay after interaction
              }}
              style={{
                "--swiper-navigation-size": "20px",
              }}
              modules={[Navigation, Autoplay]} // Include Autoplay module
              breakpoints={{
                0: { slidesPerView: 1.2 }, // 1 card per view for mobile
                1024: { slidesPerView: 3 }, // 2 cards per view for larger screens
              }}
              className="mySwiper relative"
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.activeIndex); // Set active slide index
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
            >
              {cards.map((card, index) => (
                <SwiperSlide key={index}>
                  <div
                    className={`w-full h-72 md:h-80 rounded-lg bg-white border p-2 `}
                  >
                    <div className="p-4 flex flex-col justify-between items-center w-full h-full gap-5 lg:gap-10 ">
                      <div className="flex flex-col gap-5">
                        <p className={`font-semibold text-start w-full italic`}>
                          "{card.title}"
                        </p>
                        <p className="text-sm text-gray-600">
                          {card.description}
                        </p>
                      </div>

                      <div className="flex gap-5 items-center w-full">
                        <div className="w-16 h-16 rounded-full relative overflow-hidden">
                          <Image
                            src={card.img}
                            alt={card.name}
                            fill
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-themeColor font-semibold ">
                          {card.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="hidden lg:flex absolute top-0 bottom-0 m-auto z-30 justify-between gap-5 w-full">
            <div className="flex justify-center items-center -translate-x-5">
              <button
                className={`swiper-prev p-2 rounded-full bg-gray-300 text-gray-500 ${
                  isBeginning ? "opacity-50" : ""
                }`}
                disabled={isBeginning}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>
            <div className="flex justify-center items-center translate-x-5">
              <button
                className={`swiper-next p-2 rounded-full bg-gray-300 text-gray-500 ${
                  isEnd ? "opacity-50" : ""
                }`}
                disabled={isEnd}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTest;
