"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay"; // Import autoplay styles
import { Navigation, Autoplay } from "swiper/modules"; // Import Autoplay module
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getImageProps } from "next/image";
import IMAGES from "@/public/image";
import { useRouter } from "next/navigation";

const cardData = [
  {
    alt: "diwali-festival",
    name: "diwali-with-vinifera",
    desktop: { src: IMAGES.festDiwali, width: 1600, height: 601, quality: 100 },
    mobile: {
      src: IMAGES.festDiwaliMob,
      width: 750,
      height: 1334,
      quality: 100,
    },
  },
  {
    alt: "kedarnath-yatra",
    name: "kedarnath yatra",
    desktop: {
      src: IMAGES.festKedarnath,
      width: 1600,
      height: 601,
      quality: 100,
    },
    mobile: {
      src: IMAGES.festKedarnathMob,
      width: 750,
      height: 1334,
      quality: 100,
    },
  },

  {
    alt: "christmas-festival",
    name: "christmas",
    desktop: {
      src: IMAGES.festChristmas,
      width: 1600,
      height: 601,
      quality: 100,
    },
    mobile: {
      src: IMAGES.festChristmasiMob,
      width: 750,
      height: 1334,
      quality: 100,
    },
  },
  {
    alt: "holi-festival",
    name: "colorful",
    desktop: { src: IMAGES.festHoli, width: 1600, height: 601, quality: 100 },
    mobile: { src: IMAGES.festHoliMob, width: 750, height: 1334, quality: 100 },
  },
  {
    alt: "havenly-sky",
    name: "havenly sky",
    desktop: {
      src: IMAGES.havenlysky,
      width: 1600,
      height: 601,
      quality: 100,
    },
    mobile: {
      src: IMAGES.havenlyskyMob,
      width: 750,
      height: 1334,
      quality: 100,
    },
  },
  {
    alt: "desert-safari",
    name: "DESERT",
    desktop: {
      src: IMAGES.desertsafari,
      width: 1600,
      height: 601,
      quality: 100,
    },
    mobile: {
      src: IMAGES.desertsafariMob,
      width: 750,
      height: 1334,
      quality: 100,
    },
  },
  {
    alt: "eid",
    name: "eid",
    desktop: {
      src: IMAGES.jamamasjid,
      width: 1600,
      height: 601,
      quality: 100,
    },
    mobile: {
      src: IMAGES.jamamasjidMob,
      width: 750,
      height: 1334,
      quality: 100,
    },
  },
  {
    alt: "munnartour",
    name: "munnar",
    desktop: {
      src: IMAGES.munnartour,
      width: 1600,
      height: 601,
      quality: 100,
    },
    mobile: {
      src: IMAGES.munnartourMob,
      width: 750,
      height: 1334,
      quality: 100,
    },
  },
];

const AboutCards = () => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const router = useRouter()

  const handleFestiveTour = (festival) => {
    router.push(`/filterpage/${festival}`)
  }

  return (
    <div className="flex flex-col gap-8 justify-center items-center">
      <h2 className="text-2xl lg:text-3xl text-gray-600 font-bold underline decoration-themeColor">
        Book The Best Tours
      </h2>
      <p className="text-base lg:text-lg lg:w-[80%] text-center">
        Find amazing deals for your travel plans, select your holiday now!
      </p>

      <div className="hidden md:flex gap-5 justify-end w-full ">
        <button
          className={`swiper-prev p-2 rounded-full bg-gray-300 text-gray-500 ${
            isBeginning ? "opacity-50" : ""
          }`}
          disabled={isBeginning}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          className={`swiper-next p-2 rounded-full bg-gray-300 text-gray-500 ${
            isEnd ? "opacity-50" : ""
          }`}
          disabled={isEnd}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-16 lg:gap-5 h-full">
        <div className="w-full h-auto relative">
          <Swiper
            spaceBetween={20}
            navigation={{
              nextEl: ".swiper-next",
              prevEl: ".swiper-prev",
            }}
            autoplay={{
              delay: 4000, // Auto-scroll delay in milliseconds
              disableOnInteraction: false, // Continue autoplay after interaction
            }}
            modules={[Navigation, Autoplay]}
            breakpoints={{
              0: {
                slidesPerView: 1, // 1 card per view for mobile
                slidesPerGroup: 1, // Move 1 card per swipe for mobile
              },
              640: {
                slidesPerView: 1.5, // 1.5 cards per view for tablets
                slidesPerGroup: 1, // Move 1 card per swipe for tablets
              },
              1024: {
                slidesPerView: 2, // 2 cards per view for larger screens
                slidesPerGroup: 2, // Move 2 cards per swipe for larger screens
              },
            }}
            className="mySwiper w-full"
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
          >
            {cardData.map((card, index) => {
              // Get the image props for both desktop and mobile
              const {
                props: { srcSet: desktop },
              } = getImageProps({
                alt: card.alt,
                width: card.desktop.width,
                height: card.desktop.height,
                quality: card.desktop.quality,
                src: card.desktop.src,
              });

              const {
                props: { srcSet: mobile, ...rest },
              } = getImageProps({
                alt: card.alt,
                width: card.mobile.width,
                height: card.mobile.height,
                quality: card.mobile.quality,
                src: card.mobile.src,
              });

              return (
                <SwiperSlide key={index}>
                  <div className="w-full h-full rounded-xl overflow-hidden shadow-lg bg-white border " onClick={() => handleFestiveTour(card.name)}>
                    <picture>
                      <source media="(min-width: 1024px)" srcSet={desktop} />
                      <source media="(max-width: 1023px)" srcSet={mobile} />
                      <img
                        {...rest}
                        className="h-full w-full object-fill aspect-square lg:aspect-[16/6]"
                        alt={card.alt}
                      />
                    </picture>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default AboutCards;
