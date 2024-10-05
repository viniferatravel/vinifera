"use client";
import React, { useState, useEffect, useRef } from "react";
import Highlight from "./Highlight";
import Tour from "./Tour";
import HotelTable from "./HotelTable";
import Policy from "./Policy";
import Reviews from "./Reviews";

const TravelGuide = ({ selectedPackage, selectedPackageReviews }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Initialize refs for each section, make sure it doesn't change between renders
  const sectionRefs = useRef([React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef()]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sectionRefs.current.forEach((ref, index) => {
        if (
          ref.current &&
          ref.current.getBoundingClientRect().top + window.scrollY < scrollPosition
        ) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (index) => {
    window.scrollTo({
      top: sectionRefs.current[index].current.offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {/* Navigation Menu */}
      <div className="sticky top-[75px] lg:top-20 left-0 w-full  text-black py-5 z-10 bg-white border-y overflow-x-auto ">
        <ul className="flex justify-between w-full px-2 ">
          {["Highlights", "Tour Itinerary", "Hotel", "Policy", "Review"].map(
            (title, index) => (
              <li
                key={index}
                className="relative text-sm lg:text-base flex gap-1"
              >
                <button
                  onClick={() => handleNavClick(index)}
                  className={`flex items-center rounded mb-3 ${activeIndex === index ? "underline-red-500" : ""
                    }`}
                >
                  {title}
                </button>
                {activeIndex === index && (
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-red-500"></span>
                )}
              </li>
            )
          )}
        </ul>
      </div>

      <div className="flex flex-col gap-5">
        {/* Highlights div */}
        <div
          ref={sectionRefs.current[0]}
          className="w-full h-full flex flex-col items-left justify-start"
        >
          <Highlight selectedPackage={selectedPackage} />
        </div>

        {/* Itinerary section */}
        <div
          ref={sectionRefs.current[1]}
          className="w-full h-full flex flex-col items-center justify-center "
        >
          <Tour selectedPackage={selectedPackage} />
        </div>

        <div
          ref={sectionRefs.current[2]}
          className="w-full h-full flex flex-col items-center justify-center "
        >
          <HotelTable selectedPackage={selectedPackage} />
        </div>

        <div
          ref={sectionRefs.current[3]}
          className="w-full h-full flex flex-col items-center justify-center "
        >
          <Policy selectedPackage={selectedPackage} />
        </div>

        <div ref={sectionRefs.current[4]} className="w-full h-full flex ">
          {selectedPackageReviews?.length === 0
            ? ""
            : <Reviews selectedPackage={selectedPackage} selectedPackageReviews={selectedPackageReviews} />
          }
        </div>

      </div>
    </div>
  );
};

export default TravelGuide;
