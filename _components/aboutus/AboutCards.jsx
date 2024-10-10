"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay"; // Import autoplay styles
import { Navigation, Autoplay } from "swiper/modules"; // Import Autoplay module
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion"; // Import Framer Motion
import "@/_components/Carousel.css"; // Assuming custom styles here

const AboutCards = () => {
 
  const cards = [
    {
      title: "Transparency",
      description:
        "We believe in open communication. From booking to your return, we provide clear information about fees, terms, and conditions—so you know exactly what to expect.",
      color: "to-red-500",
      textColor: "text-red-500",
    },
    {
      title: "Customer Service",
      description:
        "Our dedicated support team is here for you. Whether you have questions before you book or need assistance during your trip, we’re just a call, click, or message away.",
      color: "to-blue-500",
      textColor: "text-blue-500",
    },
    {
      title: "Respect for Your Privacy",
      description:
        "Your personal information is safe with us. We adhere to strict data protection practices and are transparent about how we collect and use your data.",
      color: "to-green-500",
      textColor: "text-green-500",
    },
    {
      title: "Fair Pricing",
      description:
        "At Vinifera, we ensure that our pricing is not only competitive but also free from hidden fees. Our price-match guarantee gives you peace of mind when planning your adventures.",
      color: "to-yellow-500",
      textColor: "text-yellow-500",
    },
    {
      title: "Sustainability",
      description:
        "We care about our planet. We promote eco-friendly travel options and work with partners who share our commitment to sustainable and responsible tourism.",
      color: "to-purple-500",
      textColor: "text-purple-500",
    },
    {
      title: "Cultural Sensitivity",
      description:
        "We celebrate diversity and encourage respectful travel. Our resources will help you understand local customs and traditions, ensuring a meaningful experience in every destination.",
      color: "to-pink-500",
      textColor: "text-pink-500",
    },
    {
      title: "Your Voice Matters",
      description:
        "We value your feedback. Share your experiences with us, and help us improve our services. Your satisfaction is our priority.",
      color: "to-teal-500",
      textColor: "text-teal-500",
    },
    {
      title: "Flexibility and Understanding",
      description:
        "Life can be unpredictable, and we get that. Our flexible booking and cancellation policies are designed to accommodate your changing plans, providing you with the support you need.",
      color: "to-orange-500",
      textColor: "text-orange-500",
    },
    {
      title: "Ethical Partnerships",
      description:
        "We collaborate with vendors and suppliers who adhere to ethical business practices, ensuring fair labor and safe working conditions for all involved in your journey.",
      color: "to-indigo-500",
      textColor: "text-indigo-500",
    },
    {
      title: "Continuous Improvement",
      description:
        "We are always evolving. By staying updated on industry trends and investing in new technologies, we strive to enhance your travel experience continuously.",
      color: "to-gray-500",
      textColor: "text-gray-500",
    },
  ];
  // State to track swiper position
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // Track the active slide index

  return (
    <div className="bg-gray-100 py-32 ">
      <div className="w-[95%] mx-auto flex flex-col lg:flex-row justify-center items-center gap-16 lg:gap-5 h-full">
        <div className="w-full lg:w-[50%] flex flex-col items-center h-full">
          {/* Custom Navigation Buttons */}
          <div className="flex flex-col gap-10 h-full">
            <h2 className="text-4xl lg:text-5xl font-semibold text-gray-600">
              10 Principles
            </h2>
            <p className="text-base lg:text-lg text-gray-600 w-full lg:w-[70%] mb-0 lg:mb-12 xl:mb-16">
              To live life to the fullest and to be productive and efficient at
              our workplace, as Veena World team members, we practice certain
              values that guide us in every action and at every step.
            </p>
            <div className="hidden md:flex gap-5 ">
              <button
                className={`swiper-prev p-2 rounded-full bg-gray-300 text-gray-500 ${
                  isBeginning ? "opacity-50 " : ""
                }`}
                disabled={isBeginning}
              >
                <ChevronLeft className="w-6 h-6 " />
              </button>
              <button
                className={`swiper-next p-2 rounded-full bg-gray-300 text-gray-500 ${
                  isEnd ? "opacity-50 " : ""
                }`}
                disabled={isEnd}
              >
                <ChevronRight className="w-6 h-6 " />
              </button>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[50%] h-auto relative">
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
              0: { slidesPerView: 1.5 },
              768: { slidesPerView: 1.5 },
              1024: { slidesPerView: 1.5 },
            }}
            className="mySwiper"
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.activeIndex); // Set active slide index
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
          >
            {cards.map((card, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  className={`w-full h-72 md:h-80 rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-white via-white ${card.color}`}
                  initial={{ scale: 0.9, opacity: 0.5 }}
                  animate={
                    index === activeIndex
                      ? { scale: 1, opacity: 1 } // Active card full size and opacity
                      : { scale: 0.9, opacity: 0.5 } // Inactive cards smaller and less opaque
                  }
                  transition={{ duration: 0.5 }} // Animation duration
                >
                  <div className="p-4 flex flex-col justify-center items-center w-full h-full gap-5 lg:gap-10">
                    <h3
                      className={`text-lg md:text-xl font-semibold ${card.textColor} lg:text-2xl text-start w-full`}
                    >
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-600">{card.description}</p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default AboutCards;
