"use client";
import Image from "next/image";
import React, { useState } from "react";
import IMAGES from "@/public/image";
import { motion } from "framer-motion";
import GuestModal from "@/_components/packages/Modal";

const Landing = () => {

  const [enquiryClickModal, setEnquiryClickModal] = useState(false);

  const handleCloseEnquiryModal = (val) => {
    setEnquiryClickModal(val);
  };

  return (
    <div className="relative h-[70vh] w-full">
      <Image
        src={IMAGES.ticketslanding}
        alt=""
        fill
        className="object-cover w-full h-full"
      />
      <div className="absolute top-0 left-0  w-full h-full flex justify-center items-center">
        <div className="m-5 lg:m-12 w-full h-full flex flex-col justify-center items-start gap-10">
          {/* <h1 className="text-white text-3xl lg:text-5xl flex flex-col gap-2">
          Discover the
            <span className="bg-themeColor px-1 py-3">Joy of Travel</span>
          </h1> */}
          <h1 className="text-white text-3xl lg:text-5xl flex flex-col gap-2">
            <motion.span
              initial={{ opacity: 0, y: 20 }} // Initial state for the first part
              animate={{ opacity: 1, y: 0 }} // Final state for the first part
              transition={{ duration: 0.5, delay: 0 }} // No delay for the first part
            >
              Discover the
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 20 }} // Initial state for the highlighted part
              animate={{ opacity: 1, y: 0 }} // Final state for the highlighted part
              transition={{ duration: 0.5, delay: 0.2 }} // Delay for wave effect
              className="bg-themeColor px-1 py-3" // Background for the highlighted part
            >
              Joy of Travel
            </motion.span>
          </h1>
          <div className="w-[70%] lg:w-1/3">
            <motion.p
              initial={{ opacity: 0, y: 20 }} // Initial state for the highlighted part
              animate={{ opacity: 1, y: 0 }} // Final state for the highlighted part
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-white"
            >
              At Vinifera, we make travel effortless. Enjoy personalized booking
              for flights, trains, buses, and private cars, ensuring your
              journey is smooth, safe, and memorable.
            </motion.p>
          </div>
          <div>
            <button 
              className="bg-themeColor px-10 py-3 rounded-xl text-white font-medium" onClick={() => {
                setEnquiryClickModal(true);
              }}>
              Connect Now
            </button>
          </div>
          <div>
                <GuestModal
                  enquiryClickModal={enquiryClickModal}
                  onCloseEnquiryModal={handleCloseEnquiryModal}
                  action={"enquiry"}
                />
              </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
