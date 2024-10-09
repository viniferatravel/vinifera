"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Milestone, SendHorizontal } from "lucide-react";
import IMAGES from "@/public/image";

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Set a maximum value for the Y axis movement (e.g., 100 pixels)
  const maxY = 100;

  // Add maxY to restrict how far the card can move
  const limitY = (animateY) => Math.min(Math.max(animateY, -maxY), maxY);

  return (
    <div className="flex flex-col gap-20 py-10 lg:py-20">
      <div className="h-full  w-[95%] mx-auto flex justify-center items-center flex-col lg:flex-row gap-5 ">
        <div className="flex flex-col w-full lg:w-[50%] justify-center h-full items-center gap-10 ">
          <div className="flex justify-start w-full ">
            <h1 className="text-2xl lg:text-4xl font-semibold text-gray-600">Best Packages across India!</h1>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex  gap-5">
              <span className="size-12 flex justify-center items-center  rounded-lg bg-blue-100">
                <SendHorizontal className="text-blue-500 " />
              </span>
              <div className="flex flex-col gap-2 w-full">
                <h2 className="text-lg font-semibold">Explore the Holy Chardham</h2>
                <p className="text-gray-400">
                Discover hidden gems of our Holy Himalayas, Experience the Spiritual peace admist ancient temples of our divinity.  
                </p>
              </div>
            </div>

            <div className="flex  gap-5">
              <span className="size-12 flex justify-center items-center  rounded-lg bg-pink-100">
                <SendHorizontal className="text-pink-500" />
              </span>
              <div className="flex flex-col gap-2 w-full">
                <h2 className="text-lg font-semibold">Enjoy the Bliss</h2>
                <p className="text-gray-400">
                Explore the peaceful and the hustle bustle at the lassi capital of India, With tours all ranging from Wagah border to the Divine shrine  .
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full lg:w-[50%] h-full  justify-center items-center relative mt-24 lg:my-0">
          <div className="flex justify-center items-center h-full w-full translate-x-2 lg:translate-x-16 z-10 mx-auto">
            <motion.div
              className="w-full h-full  text-white flex items-center justify-center "
              initial={{ y: 0 }}
              animate={{ y: limitY(-scrollY / 20) }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <img
                src={IMAGES.herocardone}
                alt=""
                className="w-full h-full object-contain shadow-xl"
              />
            </motion.div>
          </div>
          <div className="flex justify-center items-center h-full w-full -translate-x-2 lg:-translate-x-16 z-20 mx-auto">
            <motion.div
              className="w-full h-full  text-white flex items-center justify-center "
              initial={{ y: 0 }}
              animate={{ y: limitY(scrollY / 30) }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <img
                src={IMAGES.herocardtwo}
                alt=""
                className="w-full h-full object-contain shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="h-full w-[95%] mx-auto flex justify-center items-center flex-col-reverse lg:flex-row gap-5">
        <div className="flex w-full lg:w-[50%] h-full  justify-center items-center relative mt-24 lg:my-0">
          <div className="flex justify-center items-center h-full w-full translate-x-2 lg:translate-x-16 z-10 mx-auto">
            <motion.div
              className="w-full h-full  text-white flex items-center justify-center "
              initial={{ y: 0 }}
              animate={{ y: limitY(-scrollY / 20) }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <img
                src={IMAGES.herocardfour}
                alt=""
                className="w-full h-full object-contain shadow-xl"
              />
            </motion.div>
          </div>
          <div className="flex justify-center items-center h-full w-full -translate-x-2 lg:-translate-x-16 z-20 mx-auto">
            <motion.div
              className="w-full h-full  text-white flex items-center justify-center "
              initial={{ y: 0 }}
              animate={{ y: limitY(scrollY / 30) }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <img
                src={IMAGES.herocardthree}
                alt=""
                className="w-full h-full object-contain shadow-xl"
              />
            </motion.div>
          </div>
        </div>
        <div className="flex flex-col w-full lg:w-[50%] justify-center h-full items-center gap-10 ">
          <div className="flex justify-start w-full ">
            <h1 className="text-2xl lg:text-4xl font-semibold text-gray-600">Adventure Awaits</h1>
          </div>
          <div className="flex flex-col gap-8 w-full">
            <div className="flex gap-5">
              <span className="size-12 flex justify-center items-center  rounded-lg bg-blue-100">
                <SendHorizontal className="text-blue-500 " />
              </span>
              <div className="flex flex-col gap-2 w-full">
                <h2 className="text-lg font-semibold">Bond in the Mountains</h2>
                <p className="text-gray-400">
                Join us for hikes, laughter, and unforgettable memories with your closest friends in nature.
                </p>
              </div>
            </div>

            <div className="flex  gap-5">
              <span className="size-12 flex justify-center items-center  rounded-lg bg-pink-100">
                <SendHorizontal className="text-pink-500" />
              </span>
              <div className="flex flex-col gap-2 w-full">
                <h2 className="text-lg font-semibold">Team Building in Nature!</h2>
                <p className="text-gray-400">
                Escape the office, connect with nature, and reignite your team’s passion and creativity together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
