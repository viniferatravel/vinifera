import IMAGES from "@/public/image";
import {  ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const Experience = () => {
  return (
    <div className="flex justify-center items-center  flex-col lg:flex-row w-[95%] mx-auto my-10 py-10 gap-5">
      <div className="w-full lg:w-[50%]  h-full flex justify-center items-center">
        <Image
          src={IMAGES.corparateExperience}
          alt="corparate-experience"
          width={500}
          height={500}
        />
      </div>
      <div className="w-full lg:w-[50%] h-full flex flex-col gap-10">
        <div className="flex flex-col gap-5"> 

        <h2 className=" flex flex-col  text-2xl lg:text-3xl text-center lg:text-start font-bold text-gray-600 gap-1">
          <span>We Curate</span>
          <span>Exceptional Travel </span>
          <span>Experiences Just for You.</span>
        </h2>
        <div className="flex flex-col gap-10">
          <p className="flex text-gray-500 px-5 lg:p-0">
            Vinifera MICE is a newly established division of Vinifera Tours Pvt.
            Ltd., making its mark in the Indian tourism sector with innovative
            ideas and exceptional service. Founded in 2024 with the commitment
            to “honor your promises to guests,” Vinifera is dedicated to
            providing transparent dealings with no hidden costs, exceptional
            value holidays, and a focus on 100% guest satisfaction.
          </p>

          <div className="flex gap-10 justify-center lg:justify-start items-center">
            <span className="px-5 py-2 bg-gray-200 font-semibold">Team Building </span>
            <span className="px-5 py-2 bg-gray-200 font-semibold">Networking</span>
          </div>
        </div>
        </div>

        
      </div>
    </div>
  );
};

export default Experience;
