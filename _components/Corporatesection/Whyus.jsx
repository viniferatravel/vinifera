import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const Whyus = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  const whyusdata = [
    {
      id: "1",
      icon: (
        <Icon
          icon="fluent:stream-20-filled"
          className="w-[30px] h-[30px] text-[#FF0000]"
        />
      ),
      whyusheading: "Streamlined Travel Management",
      whyuspara:
        "Our travel management services handle every detail of your corporate trips, from bookings to itineraries, making travel planning hassle-free.",
    },
    {
      id: "2",
      icon: (
        <Icon
          icon="healthicons:rupee"
          className="w-[30px] h-[30px] text-[#FF0000]"
        />
      ),
      whyusheading: "Cost Efficiency",
      whyuspara:
        "Our travel management services handle every detail of your corporate travel, from bookings to itineraries, taking the hassle out of planning.",
    },
    {
      id: "3",
      icon: (
        <Icon
          icon="icon-park-outline:personal-collection"
          className="w-[30px] h-[30px] text-[#FF0000]"
        />
      ),
      whyusheading: "Personalized Service",
      whyuspara:
        "Our expert team delivers tailored solutions for your business, handling special requests and last-minute changes with dedicated support.",
    },
    {
      id: "4",
      icon: (
        <Icon
          icon="fluent:person-support-20-regular"
          className="w-[30px] h-[30px] text-[#FF0000]"
        />
      ),
      whyusheading: "24/7 Support",
      whyuspara:
        "We offer round-the-clock support to assist with any travel issues or changes, ensuring your team always has reliable help when they need it.",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
    >
      <div className=" w-[95%] m-auto px-4 py-10">
        <div className="flex justify-center items-center">
          <div className=" inline-block text-center">
            <h2 className="text-center font-semibold text-2xl lg:text-3xl">
              Why us?
            </h2>
            <div className="border-2 w-full rounded-full mt-1 border-themeColor"></div>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={sectionVariants}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-8"
        >
          {whyusdata &&
            whyusdata.map((e, i) => (
              <div
                key={i}
                className="flex justify-center items-center flex-col gap-4 p-4"
              >
                <div className=" w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#FFE3E3]">
                  {e.icon}
                </div>
                <div className="text-themeColor font-semibold text-lg text-center">
                  <p>{e.whyusheading}</p>
                </div>
                <div className="text-base text-center">
                  <p>{e.whyuspara}</p>
                </div>
              </div>
            ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Whyus;
