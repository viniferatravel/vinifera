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
    <div className="flex flex-col gap-20 py-20">
      <div className="h-full  w-[95%] mx-auto flex justify-center items-center flex-col lg:flex-row gap-5 ">
        <div className="flex flex-col w-full lg:w-[50%] justify-center h-full items-center gap-10 ">
          <div className="flex justify-start w-full ">
            <h1 className="text-4xl font-semibold">Your Journey Awaits!</h1>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex  gap-5">
              <span className="size-12 flex justify-center items-center  rounded-lg bg-blue-100">
                <SendHorizontal className="text-blue-500 " />
              </span>
              <div className="flex flex-col gap-2 w-full">
                <h2 className="text-lg font-semibold">Explore Destinations</h2>
                <p className="text-gray-400">
                  Discover hidden gems and popular hotspots tailored to every
                  traveler’s taste.
                </p>
              </div>
            </div>

            <div className="flex  gap-5">
              <span className="size-12 flex justify-center items-center  rounded-lg bg-pink-100">
                <Milestone className="text-pink-500" />
              </span>
              <div className="flex flex-col gap-2 w-full">
                <h2 className="text-lg font-semibold">Plan Your Trip</h2>
                <p className="text-gray-400">
                  Access expert advice on visas, travel insurance, and safety
                  tips for worry-free travels
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
                src={IMAGES.scrolltwo}
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
                src={IMAGES.scrollone}
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
                src={IMAGES.scrollthree}
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
                src={IMAGES.scrollfour}
                alt=""
                className="w-full h-full object-contain shadow-xl"
              />
            </motion.div>
          </div>
        </div>
        <div className="flex flex-col w-full lg:w-[50%] justify-center h-full items-center gap-10 ">
          <div className="flex justify-start w-full">
            <h1 className="text-4xl font-semibold">
              Accessories for your Journey
            </h1>
          </div>
          <div className="flex flex-col gap-8 w-full">
            <p className="text-gray-500">
            Experience the joy of travelling with all new cool travel accessories, which are complementary with every travel package that you choose with us.
            </p>

            <div className="grid grid-cols-2 gap-10">
              <div className="flex justify-start items-center gap-5">
                <span className="size-12 flex justify-center items-center  rounded-lg bg-pink-100">
                  <Milestone className="text-pink-500" />
                </span>
                <h3 className="text-base lg:text-lg font-semibold">A T-shirt</h3>
              </div>

              <div className="flex justify-start items-center gap-5">
                <span className="size-12 flex justify-center items-center  rounded-lg bg-pink-100">
                  <Milestone className="text-pink-500" />
                </span>
                <h3 className="text-base lg:text-lg font-semibold">A Cap</h3>
              </div>

              <div className="flex justify-start items-center gap-5">
                <span className="size-12 flex justify-center items-center  rounded-lg bg-pink-100">
                  <Milestone className="text-pink-500" />
                </span>
                <h3 className="text-base lg:text-lg font-semibold">A Totte Bag</h3>
              </div>

              <div className="flex justify-start items-center gap-5">
                <span className="size-12 flex justify-center items-center  rounded-lg bg-pink-100">
                  <Milestone className="text-pink-500" />
                </span>
                <h3 className="text-base lg:text-lg font-semibold">A Cup </h3>
              </div>
            </div>

            {/* <div className="grid grid-cols-2 gap-10">
              <div className="flex flex-col justify-center items-center border p-3 shadow-xl rounded-xl">
                <h3 className="text-3xl font-semibold text-blue-500">+75%</h3>
                <p className="text-gray-500">More engaging</p>
              </div>

              <div className="flex flex-col justify-center items-center border p-3 shadow-xl rounded-xl">
                <h3 className="text-3xl font-semibold text-blue-500">+75%</h3>
                <p className="text-gray-500">More engaging</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
