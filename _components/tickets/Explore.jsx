"use client";
import IMAGES from "@/public/image";
import React from "react";
import Image from "next/image";
import {motion} from "framer-motion"
import { FaPlane } from "react-icons/fa";
import { FaBus, FaCar, FaTrain } from "react-icons/fa6";

const travelRoutes = [
  {
    image: IMAGES.corporateGoa,
    from: "Delhi",
    to: "Agra",
    flights: 20,
    buses: 100,
    trains: 50,
    cars: 200,
  },
  {
    image: IMAGES.corporateGoa,
    from: "Goa",
    to: "Mumbai",
    flights: 100,
    buses: 300,
    trains: 30,
    cars: 120,
  },
  {
    image: IMAGES.corporateRajesthan,
    from: "Delhi",
    to: "Jaipur",
    flights: 10,
    buses: 150,
    trains: 30,
    cars: 300,
  },
  {
    image: IMAGES.corporateRajesthan,
    from: "Kolkata",
    to: "Delhi",
    flights: 40,
    buses: 50,
    trains: 20,
    cars: 100,
  },
  {
    image: IMAGES.corporateRajesthan,
    from: "Bangalore",
    to: "Chennai",
    flights: 20,
    buses: 100,
    trains: 30,
    cars: 200,
  },
  {
    image: IMAGES.corporateRajesthan,
    from: "Hyderabad",
    to: "Bangalore",
    flights: 15,
    buses: 80,
    trains: 20,
    cars: 150,
  },
];

const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

const Explore = () => {
  return (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={sectionVariants} className="w-[95%] m-auto lg:mt-5 mb-5 xl:mt-10">
      <div>
        <div className="flex justify-center items-center mb-5">
          <div className=" inline-block text-center">
            <h2 className="text-center font-bold text-xl lg:text-3xl text-gray-600">
              Explore India’s Top Travel Routes
            </h2>
            <div className="border-2 w-full rounded-full mt-1 border-themeColor"></div>
          </div>
        </div>

        <p className="w-full lg:w-[60%] m-auto text-center mt-8 mb-16 text-gray-500">
          Choose from popular destinations across India and discover the best
          travel modes. Enjoy a seamless journey while exploring the country&apos;s
          rich culture and breathtaking landscapes.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {travelRoutes?.map((route, index) => (
          <div
            key={index}
            className="flex items-center bg-white border shadow p-2 rounded-lg gap-5 group"
          >
            <Image
              src={route.image}
              alt={`${route.from} to ${route.to}`}
              width={400}
              height={250}
              className="rounded-lg w-[30%]"
              objectFit="cover"
            />
            <div className="w-[70%] flex flex-col justify-start items-start gap-5 h-full">
              <h2 className="text-lg lg:text-xl font-semibold w-full text-gray-600">
                {route.from} To {route.to}
              </h2>

              <div className="grid grid-cols-2 w-full gap-2">
                <div className="flex items-center ">
                  <p className="flex gap-3 justify-center items-center text-sm lg:text-base font-medium text-gray-500">
                    <span className="p-1 rounded-full bg-[#f3f4f6] group-hover:shadow group-hover:bg-gray-200 ">
                      <FaPlane className="text-themeColor" />
                    </span>
                    {route.flights} Flights
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="flex gap-3 justify-center items-center text-sm lg:text-base font-medium text-gray-500">
                    <span className="p-1 rounded-full bg-[#f3f4f6] group-hover:shadow group-hover:bg-gray-200 ">
                      <FaBus className="text-themeColor" />
                    </span>
                    {route.buses} Buses
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="flex gap-3 justify-center items-center text-sm lg:text-base font-medium text-gray-500">
                    <span className="p-1 rounded-full bg-[#f3f4f6] group-hover:shadow group-hover:bg-gray-200 ">
                      <FaTrain className="text-themeColor" />
                    </span>
                    {route.trains} Trains
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="flex gap-3 justify-center items-center text-sm lg:text-base font-medium text-gray-500">
                    <span className="p-1 rounded-full bg-[#f3f4f6] group-hover:shadow group-hover:bg-gray-200 ">
                      <FaCar className="text-themeColor" />
                    </span>
                    {route.cars} Cars
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Explore;
