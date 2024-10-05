"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Steps = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Variants for card entrance animation
  const cardVariants = {
    hidden: { opacity: 0, y: 20 }, // Initial state: hidden
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.5, // Delays based on the index
        duration: 0.8,
        ease: "easeInOut",
      },
    }),
  };

  // Example data for the steps
  const stepsData = [
    {
      title: "Sharing of Details",
      description:
        "Begin by sharing your personal details and requirements through our secure online form, ensuring a tailored experience from the start.",
    },
    {
      title: "Documentation Review",
      description:
        "Our team will carefully review your submitted documents to ensure everything is complete and meets the necessary requirements for your application.",
    },
    {
      title: "Processing",
      description:
        "Once your documents are verified, we swiftly process your application, keeping you updated at every stage to ensure a smooth experience.",
    },
    {
      title: "Delivery",
      description:
        "Receive your passport or visa directly at your doorstep, with tracking options available for your peace of mind throughout the delivery process.",
    },
  ];

  return (
    <div className="w-[95%] mx-auto my-10 flex flex-col gap-10">
      <h2 className="text-2xl lg:text-3xl text-gray-600 font-bold underline decoration-themeColor text-center underline-offset-4 ">
        Simple Steps to Get Your Passport and Visa
      </h2>
      <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-5">
        <motion.div
          className={`absolute left-7 lg:left-0 lg:top-7 bg-red-500 ${
            isLargeScreen ? "w-full lg:h-1" : "w-1 lg:h-full"
          }`}
          initial={{ width: 0, height: 0 }} // Set initial size to 0
          whileInView={{
            width: isLargeScreen ? "100%" : "2px",
            height: isLargeScreen ? "2px" : "100%",
            transition: { duration: 2, ease: "easeInOut" },
          }}
          viewport={{ once: false }} // Allow multiple triggers
        ></motion.div>

        {stepsData.map((step, index) => (
          <motion.div
            key={index}
            className="relative h-full flex flex-col justify-between"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }} // Allow multiple triggers
            custom={index} // Pass the index to control the delay
          >
            <div className="size-5 bg-themeColor absolute left-5 top-0 bottom-0 my-auto lg:my-0 lg:top-5 lg:left-0 lg:right-0 lg:mx-auto rounded-full"></div>
            <div className="mx-10 lg:my-10 lg:mx-2 p-5 flex flex-col gap-5">
              <h3 className="text-xl  text-themeColor font-bold text-center">
                {step.title}
              </h3>
              <p className="text-center text-gray-500">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Steps;

