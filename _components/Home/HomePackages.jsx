import Image from "next/image";
import React from "react";
import IMAGES from "@/public/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const cardVariants = {
  fromLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  },

 
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeInOut" },
  },
};

const HomePackages = ({ allPackages }) => {
  const router = useRouter();
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
      className="flex flex-col gap-8 justify-center items-center mb-16"
    >
      <h2 className="text-2xl lg:text-3xl text-gray-600 font-bold border-b-4 border-themeColor">
        Beautiful Places around India
      </h2>
      <p className="text-base lg:text-lg lg:w-[80%] text-center">
        Explore amazing destinations, enjoy comfortable stays, and create
        lasting memories all with packages designed to fit your budget and
        delight every member.
      </p>

      <div className="flex flex-col lg:flex-row gap-5 h-full lg:h-[500px] w-full ">
        <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={cardVariants.fromLeft}

          className="relative border flex-1  rounded-xl overflow-hidden cursor-pointer"
          onClick={() => router.push(`filterpage/WEST`)}
        >
          <Image
            src={IMAGES.homepackage1}
            alt=""
            width={500}
            height={500}
            className="object-cover w-full h-[250px] lg:h-full"
          />
          <div className="absolute top-0 left-0 p-3 flex flex-col justify-between w-full h-full">
            <div className=" flex justify-end w-full">
              <span className="bg-white rounded-md px-2 py-1 font-medium text-gray-600">
                {
                  allPackages?.filter((item) =>
                    item.sub_category.includes("WEST")
                  ).length
                }{" "}
                packages
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-xl text-white font-semibold">Colors of West</span>
            </div>
          </div>
        </motion.div>
        <div className="flex-1 flex flex-col gap-5">
          <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants.fromLeft}
            className="relative flex-1 border rounded-xl overflow-hidden cursor-pointer"
            onClick={() => router.push(`filterpage/NORTH`)}
          >
            <Image
              src={IMAGES.homepackage2}
              alt=""
              width={500}
              height={500}
              className="object-cover w-full h-[250px] lg:h-full"
            />
            <div className="absolute top-0 left-0 p-3 flex flex-col justify-between w-full h-full">
              <div className=" flex justify-end w-full">
                <span className="bg-white rounded-md px-2 py-1 font-medium text-gray-600">
                  {
                    allPackages?.filter((item) =>
                      item.sub_category.includes("NORTH")
                    ).length
                  }{" "}
                  packages
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-xl text-white font-semibold ">Peace of North</span>
              </div>
            </div>
          </motion.div>
          <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           variants={cardVariants.fromLeft}
            className="relative flex-1 border rounded-xl overflow-hidden cursor-pointer"
            onClick={() => router.push(`filterpage/SOUTH`)}
          >
            <Image
              src={IMAGES.homepackage3}
              alt=""
              width={500}
              height={500}
              className="object-cover w-full h-[250px] lg:h-full"
            />
            <div className="absolute top-0 left-0 p-3 flex flex-col justify-between w-full h-full">
              <div className=" flex justify-end w-full">
                <span className="bg-white rounded-md px-2 py-1 font-medium text-gray-600">
                  {
                    allPackages?.filter((item) =>
                      item.sub_category.includes("SOUTH")
                    ).length
                  }{" "}
                  packages
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-xl text-white font-semibold">Beauty of South</span>
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={cardVariants.fromLeft}

          className="relative border flex-1 rounded-xl overflow-hidden cursor-pointer"
          onClick={() => router.push(`filterpage/EAST`)}
        >
          <Image
            src={IMAGES.homepackage4}
            alt=""
            width={500}
            height={500}
            className="object-cover w-full h-[250px] lg:h-full"
          />
          <div className="absolute top-0 left-0 p-3 flex flex-col justify-between w-full h-full">
            <div className=" flex justify-end w-full">
              <span className="bg-white rounded-md px-2 py-1 font-medium text-gray-600">
                {
                  allPackages?.filter((item) =>
                    item.sub_category.includes("EAST")
                  ).length
                }{" "}
                packages
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-xl text-white font-semibold">Nature of East</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomePackages;
