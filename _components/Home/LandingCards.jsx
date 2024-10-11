import IMAGES from "@/public/image";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const LandingCards = ({ allPackages }) => {

  const router = useRouter();

  const destinations = [
    { image: IMAGES.landingCatOne, name: "BEACHES", label: "Beach" },
    { image: IMAGES.landingCatTwo, name: "MOUNTAINS", label: "Mountains" },
    { image: IMAGES.landingCatThree, name: "JUNGLE SAFARI", label: "Jungle Safari" },
    { image: IMAGES.landingCatFour, name: "DESERT", label: "Desert" },
    { image: IMAGES.landingCatFive, name: "SPIRITUAL", label: "Spiritual" },
    { image: IMAGES.landingCatSix, name: "CULTURAL", label: "Cultural" },
    { image: IMAGES.landingCatSeven, name: "CULINARY", label: "Culinary" },
    { image: IMAGES.landingCatEight, name: "HIKING & TREKKING", label: "Hiking & Trekking" },
  ];

  const handleExperienceClick = (name) => {
    router.push(`/filterpage/${name.toUpperCase()}`)
  }

  return (
    <div className="w-full">

      <div className="flex overflow-x-auto snap-x snap-mandatory p-5 gap-4 w-[95%] lg:w-full mx-auto hide-scrollbar-x">

        {destinations.map((item, index) => (

          <div
            key={index}
            className="relative flex-none w-[calc(50%-16px)] md:w-[calc(30%-16px)] lg:w-[calc(100%/8-16px)] md:h-full flex items-center justify-center flex-col snap-start cursor-pointer overflow-hidden h-full bg-white border shadow-lg"
            onClick={() => handleExperienceClick(item.name)}
          >
            <div className="relative w-full aspect-square">

              {/* <Image src={item.image} alt={`category-${item.label}`} fill className=" object-cover p-2"/> */}

              <Image
                src={item.image}
                alt={`category-${item.label}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover p-2"
              />

            </div>
            <span className="pb-2 font-semibold">{item.label}</span>
          </div>

        ))}
      </div>
    </div>
  );
};

export default LandingCards;



