"use client";
import React, { useState, useEffect, useRef } from "react";
import CityCarousel from "@/_components/Home/CityCarousel";
import Landing from "@/_components/Home/Landing";
import PopularCarousel from "@/_components/Home/PopularCarousel";
import SpecialPackage from "@/_components/Home/SpecialPackage";
import SuperDeal from "@/_components/Home/SuperDeal";
import HomePackages from "@/_components/Home/HomePackages";
import ScrollCards from "@/_components/Home/ScrollCards";
import Destination from "@/_components/Home/Destination"



export default function Home() {
  const [allPackages, setAllPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const specialPackageRef = useRef(null);

  useEffect(() => {
    const abc = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/packageApi", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        // console.log("Data:", result.result);
        setAllPackages(result.result);
      } catch (error) {
        // console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    abc();
  }, []);

  return (
    <div className="flex flex-col w-full gap-0">
      <Landing />
      
      <div className="w-[95%] mx-auto flex flex-col gap-16">
        <ScrollCards />
        <Destination/>
        <div ref={specialPackageRef}>
          <PopularCarousel
            popularPackages={allPackages.filter((item) =>
              item.category.includes("EXCLUSIVE")
            )}
            isLoading={loading}
          />
        </div>

        <SpecialPackage />
        <CityCarousel allPackages={allPackages} />
        <SuperDeal allPackages={allPackages} />
        <HomePackages allPackages={allPackages} />
        
      </div>
    </div>
  );
}


// import React from 'react'
// import Destination from "@/_components/Home/Destination"

// const page = () => {
//   return (
//     <div> <Destination/></div>
//   )
// }

// export default page