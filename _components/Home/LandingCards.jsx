import IMAGES from "@/public/image";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const LandingCards = ({ allPackages }) => {

  const router = useRouter();

  const destinations = [
    { image: IMAGES.landingCatOne, name: "Beach",},
    { image: IMAGES.landingCatTwo, name: "Mountains",},
    { image: IMAGES.landingCatThree, name: "Trekking",},
    { image: IMAGES.landingCatFour, name: "Desert Safari",},
    { image: IMAGES.landingCatFive, name: "Spiritual",},
    { image: IMAGES.landingCatSix, name: "Cultural",},
    { image: IMAGES.landingCatSeven, name: "Culinary",},
    { image: IMAGES.landingCatEight, name: "Hiking",},
  ];

  const handleExperienceClick = (name) => {
    router.push(`/filterpage/${name.toLowerCase()}`)
  }

  return (
    <div className="w-full">
     
      <div className="flex overflow-x-auto snap-x snap-mandatory p-5 gap-4 w-[95%] lg:w-full mx-auto hide-scrollbar-x">
        {destinations.map((item,index) => (
        
          <div
            key={index}
            className="relative flex-none w-[calc(50%-16px)] md:w-[calc(30%-16px)] lg:w-[calc(100%/8-16px)] md:h-full flex items-center justify-center flex-col snap-start cursor-pointer overflow-hidden h-full bg-white border shadow-lg"
            onClick={() => handleExperienceClick(item.name)}
          >
            <div className="relative w-full aspect-square">

            <Image src={item.image} alt={`category-${item.name}`} fill className=" object-cover p-2"/>
            </div>
            <span className="pb-2 font-semibold">{item.name}</span>
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default LandingCards;



